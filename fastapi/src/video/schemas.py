from pydantic import BaseModel, UUID4
from src.auth.schemas import User

class Video(BaseModel):
    name: str


class VideoCategory(BaseModel):
    name: str
    description: str | None
    is_child_resolved: bool | None


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