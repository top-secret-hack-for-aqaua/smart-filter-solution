import uuid

from sqlalchemy.types import DateTime
from datetime import datetime
from typing import Annotated
from src.database import Base
from sqlalchemy.sql import expression
from sqlalchemy.ext.compiler import compiles
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped

class utcnow(expression.FunctionElement):
    type = DateTime()
    inherit_cache = True


@compiles(utcnow, "postgresql")
def pg_utcnow(element, compiler, **kw):
    return "TIMEZONE('utc', CURRENT_TIMESTAMP)"


pk_id = Annotated[int, mapped_column(primary_key=True, autoincrement=True)]
created_at = Annotated[datetime, mapped_column(server_default=utcnow(), default=utcnow()) ]
updated_at = Annotated[datetime, mapped_column(default=utcnow(), server_default=utcnow(), server_onupdate=utcnow(), onupdate=utcnow())]


class VideoMixin:
    id: Mapped[pk_id]
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

class VideoCategory(Base, VideoMixin):
    __tablename__ = "videocategory"
    name: Mapped[str] = mapped_column(unique=True)
    description: Mapped[str] = mapped_column(nullable=True)
    is_child_resolved: Mapped[bool] = mapped_column(default=True)

class VideoVideoCategory(Base):
    __tablename__ = "video_videocategory"
    video_id: Mapped[int] = mapped_column(ForeignKey("video.id"),primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("videocategory.id"),primary_key=True)

class Video(Base, VideoMixin):
    __tablename__ = "video"
    name: Mapped[str]
    url: Mapped[str] = mapped_column(nullable=True)

class ChildrenRejections(Base):
    __tablename__ = "childrenrejections"
    children_name: Mapped[str] = mapped_column(ForeignKey("childrens.name"),primary_key=True, nullable=False)
    category_name: Mapped[str] = mapped_column(ForeignKey("videocategory.name"),primary_key=True, nullable=False)

class HistoryWatch(Base):
    __tablename__ = "historywatch"
    video_id: Mapped[int] = mapped_column(ForeignKey("video.id"),primary_key=True, nullable=False)
    children_name: Mapped[str] = mapped_column(ForeignKey("childrens.name"),primary_key=True, nullable=False)
    created_at: Mapped[created_at]

# class StatsForChildren(Base):
#     __tablename__ = "statsforchildren"
#     children_name: Mapped[str] = mapped_column(ForeignKey("childrens.name"),primary_key=True, nullable=False)
#     video_id: Mapped[int] = mapped_column(ForeignKey("video.id"),primary_key=True, nullable=False)
#     created_at: Mapped[created_at]