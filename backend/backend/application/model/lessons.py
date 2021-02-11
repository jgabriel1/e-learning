from pydantic import BaseModel, AnyHttpUrl

from backend.domain.dto import CreateLessonDTO
from backend.domain.model.types import ID


class CreateNewLessonRequestData(CreateLessonDTO, BaseModel):
    ...


class CreateNewLessonResponseData(BaseModel):
    id: ID
    name: str
    duration: int
    description: str
    lesson_index: int
    video_id: str
    course_id: ID = None
    thumbnail_url: AnyHttpUrl = None


class ShowLessonDetailsResponseData(BaseModel):
    id: ID
    name: str
    duration: int
    description: str
    lesson_index: int
    video_id: str
    course_id: ID = None
    thumbnail_url: AnyHttpUrl = None
