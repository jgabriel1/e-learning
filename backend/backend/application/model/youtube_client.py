from typing import List

from pydantic import BaseModel, AnyHttpUrl

from backend.domain.model.types import ID


class _Course(BaseModel):
    id: ID
    name: str
    image: AnyHttpUrl
    lessons_count: int = None


class _Lesson(BaseModel):
    id: ID
    name: str
    duration: int
    description: str
    lesson_index: int
    video_id: str
    course_id: ID = None
    thumbnail_url: AnyHttpUrl = None


class CreateCourseFromYoutubePlaylistResponseData(BaseModel):
    course: _Course
    lessons: List[_Lesson]
