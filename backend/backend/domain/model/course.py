from typing import List

from pydantic import AnyHttpUrl, validator

from backend.domain.model.base import Base
from backend.domain.model.lesson import Lesson


class Course(Base):
    name: str
    image: AnyHttpUrl
    lessons_count: int = None
    lessons: List[Lesson] = None

    @validator("lessons_count", pre=True)
    def get_lessons_array_length(cls, _, values):
        lessons = values["lessons"]
        if lessons is not None:
            return len(lessons)
