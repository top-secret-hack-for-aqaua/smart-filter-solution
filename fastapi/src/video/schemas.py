from typing import Optional
from datetime import datetime
from pydantic import BaseModel, UUID4
from src.auth.schemas import User

class SuccessResponse(BaseModel):
    msg: str = "success"
    status_code: int = 200
class Video(BaseModel):
    name: str
    url : str

class VideoCategory(BaseModel):
    name: str
    description: str | None
    is_child_resolved: bool | None


class CustomVideoCategory(VideoCategory):
    is_allow: Optional[bool]


class VideoWithTags(BaseModel):
    id: int
    name: str
    tags: list[VideoCategory] | None

    class Config:
        from_attributes = True


class IndexVideoTag(BaseModel):
    video_id: int
    category_id: int


class ChildrenRejections(BaseModel):
    children_name: str
    category_name: str

class HistoryWatch(BaseModel):
    video_id: int
    children_name: str
    created_at: datetime