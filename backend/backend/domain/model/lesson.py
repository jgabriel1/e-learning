from pydantic import AnyHttpUrl, validator

from backend.domain.exception import DomainValidationError
from backend.domain.model.base import Base
from backend.domain.model.types import ID


class Lesson(Base):
    name: str
    duration: int
    description: str
    lesson_index: int
    video_id: str
    course_id: ID = None
    thumbnail_url: AnyHttpUrl = None

    @validator("course_id")
    def check_missing_course_id_after_persisted(cls, value, values):
        if values["id"] is not None and value is None:
            raise DomainValidationError

        return value
