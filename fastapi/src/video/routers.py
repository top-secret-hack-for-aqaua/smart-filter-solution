from datetime import datetime

from asyncpg.pgproto.pgproto import utc
from sqlalchemy.types import DateTime
from typing import Annotated

from fastapi.routing import APIRouter
from src.dependencies import get_db
from src.video import schemas, models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, join
from fastapi import Depends
from sqlalchemy import func, or_
from sqlalchemy.orm import joinedload
from src.dependencies import get_current_user
import requests_async as requests
router = APIRouter(
    prefix="/video",
    tags=["video"],
)
#9092





@router.post(path="/insert_video", response_model=schemas.Video)
async def insert_video(
        data: schemas.Video,
        db: AsyncSession = Depends(get_db)
):
    """Вставляет видео"""
    data = data.dict()
    video = models.Video(**data)
    await video.save(db=db)
    video_schema = schemas.Video(**data)
    return video_schema


@router.post(path="/insert_category_video", response_model=schemas.VideoCategory)
async def insert_category_video(
        data: schemas.VideoCategory,
        db: AsyncSession = Depends(get_db)
):
    """Вставляет категорию видео"""
    data = data.dict()
    category = models.VideoCategory(**data)
    await category.save(db=db)
    category_schema = schemas.VideoCategory(**data)
    return category_schema


@router.post(path="/bind_video_category", response_model=schemas.IndexVideoTag)
async def bind_video_category(
        data: schemas.IndexVideoTag,
        db: AsyncSession = Depends(get_db)
):
    """
    Привязывает видео к категории
    """
    data = data.dict()
    bind = models.VideoVideoCategory(**data)
    await bind.save(db=db)
    bind_schema = schemas.IndexVideoTag(**data)
    return bind_schema


@router.get(path="/get_video", response_model=list[schemas.VideoWithTags])
async def get_video(
        q: str = None,
        db: AsyncSession = Depends(get_db)
):
    """
    Возвращает список видео вместе с тегами.
    Если есть q - то ищет по названию.
    """
    if q:

        videos = await db.execute(
            select(models.Video, func.array_agg(models.VideoCategory.name).label("categories"))
            .select_from(models.Video)
            .join(models.VideoVideoCategory, isouter=True)
            .join(models.VideoCategory, isouter=True)
            .where(models.Video.name.contains(q))
            .group_by(models.Video.id)
        )
    else:
        videos = await db.execute(
            select(models.Video, func.array_agg(models.VideoCategory.name).label("categories"))
            .select_from(models.Video)
            .join(models.VideoVideoCategory, isouter=True)
            .join(models.VideoCategory, isouter=True)
            .group_by(models.Video.id)
        )
    videos_list = videos.all()
    videos_schema = []
    for video, tags in videos_list:
        print(video, tags)

        tags_scheme = []
        for tag in tags:
            if tag:
                tags_scheme.append(schemas.VideoCategory(name=tag, description=None, is_child_resolved=None))
        videos_schema.append(schemas.VideoWithTags(id=video.id, name=video.name, tags=tags_scheme))
        print(videos_schema)
    return videos_schema


@router.get(path="/get_tags/", response_model=list[schemas.VideoCategory])
async def get_tags(
        db: AsyncSession = Depends(get_db),
        q: str = None
) -> list[schemas.VideoCategory]:
    """
    Возвращает список тегов.
    Если есть q - то ищет по названию.
    """

    if q:
        tags = await db.execute(
            select(models.VideoCategory)
            .where(models.VideoCategory.name.contains(q))
        )
    else:
        tags = await db.execute(
            select(models.VideoCategory)
        )

    tags_list = tags.scalars().all()
    tags_schema = []
    for tag in tags_list:
        tags_schema.append(
            schemas.VideoCategory(name=tag.name, description=tag.description, is_child_resolved=tag.is_child_resolved))
    return tags_schema


@router.post(path="/insert_rejections", response_model=schemas.ChildrenRejections)
async def insert_rejections(
        data: schemas.ChildrenRejections,
        db: AsyncSession = Depends(get_db)
):
    """Вставляет отвергнутые теги"""
    data = data.dict()
    rejections = models.ChildrenRejections(**data)
    await rejections.save(db=db)
    video_schema = schemas.ChildrenRejections(**data)
    return video_schema


@router.get(path="/get_personal_tags/{children_name}", response_model=list[schemas.CustomVideoCategory])
async def get_rejections(
        children_name: str,
        db: AsyncSession = Depends(get_db),
        # q: str = None
) -> list[schemas.CustomVideoCategory]:
    """
    Возвращает список тегов с метадатой для пользователя.
    """
    tags_user = await db.execute(
        select(models.VideoCategory, )
        .join(models.ChildrenRejections)
        .where(models.ChildrenRejections.children_name == children_name)
    )
    tags = await db.execute(
        select(models.VideoCategory)
    )

    tags_list = tags.scalars().all()

    personal_tags_list = tags_user.scalars().all()
    print(tags_list)
    print(personal_tags_list)
    tags_schema = []
    for tag in tags_list:
        if tag not in personal_tags_list:
            tags_schema.append(
                schemas.CustomVideoCategory(name=tag.name, description=tag.description,
                                            is_child_resolved=tag.is_child_resolved, is_allow=False))
    for tag in personal_tags_list:
        tags_schema.append(
            schemas.CustomVideoCategory(name=tag.name, description=tag.description,
                                        is_child_resolved=tag.is_child_resolved, is_allow=True))
    return tags_schema


@router.get(path="/get_stats/count/{child}")
async def get_stats_count(
        child: str,
        db: AsyncSession = Depends(get_db),
        from_date: datetime = None,
        to_date: datetime = None
):
    if from_date and to_date:
        from_date = from_date.astimezone(utc)
        to_date = to_date.astimezone(utc)
        from_date = from_date.replace(tzinfo=None)
        to_date = to_date.replace(tzinfo=None)

        query = (
            select(models.HistoryWatch)
            .select_from(models.Video).join(models.HistoryWatch)
            .where(models.HistoryWatch.children_name == child)
            .where(models.Video.created_at.between(from_date, to_date))

        )
    else:
        query = (select(models.HistoryWatch)
                 .select_from(models.Video).join(models.HistoryWatch)
                 .where(models.HistoryWatch.children_name == child))

    count = await db.execute(query)
    count = count.scalars().all()
    return count


@router.get(path="/get_stats/sum/{child}")
async def get_stats_sum(
        child: str,
        db: AsyncSession = Depends(get_db),
        from_date: datetime = None,
        to_date: datetime = None
):
    if from_date and to_date:
        from_date = from_date.astimezone(utc)
        to_date = to_date.astimezone(utc)
        from_date = from_date.replace(tzinfo=None)
        to_date = to_date.replace(tzinfo=None)

        query = (
            select(models.HistoryWatch)
            .select_from(models.Video)
            .where(models.Video.created_at.between(from_date, to_date))
            .where(models.HistoryWatch.children_name == child)
        )
    else:
        query = (select(models.HistoryWatch)
                 .select_from(models.Video).join(models.HistoryWatch)
                 .where(models.HistoryWatch.children_name == child))

    sum = await db.execute(query)
    sum = sum.scalars().all()
    return {"sum": sum}


@router.get(path="/detail_video/{video_id}", response_model=schemas.SuccessResponse)
async def detail_video(video_id: int, children_name: str, db: AsyncSession = Depends(get_db)):
    query = (
        select(models.Video)
        .where(models.Video.id == video_id)
    )
    video = await db.execute(query)
    video = video.scalars().first()

    db.add(models.HistoryWatch(
        video_id=video.id,
        children_name=children_name)
    )

    await db.commit()
    return schemas.SuccessResponse()
