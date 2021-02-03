from backend.shared.domain.model.base import Base
from backend.shared.domain.model.types import ID
from pydantic import AnyHttpUrl


class Lesson(Base):
    name: str
    duration: int
    description: str
    lesson_index: int
    thumbnail_url: AnyHttpUrl = None
    video_id: str
    course_id: ID
