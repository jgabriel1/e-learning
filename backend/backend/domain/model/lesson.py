from pydantic import AnyHttpUrl

from backend.domain.model.base import Base, ID


class Lesson(Base):
    name: str
    duration: int
    description: str
    lesson_index: int
    video_id: str
    course_id: ID
    thumbnail_url: AnyHttpUrl = None
