from typing import List

from pydantic import AnyHttpUrl

from backend.domain.model.base import Base
from backend.domain.model.lesson import Lesson


class Course(Base):
    name: str
    image: AnyHttpUrl
    lessons: List[Lesson] = None
