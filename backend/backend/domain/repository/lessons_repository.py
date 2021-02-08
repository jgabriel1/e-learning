from abc import ABCMeta, abstractmethod
from typing import List, Mapping, Optional

from backend.domain.model.lesson import Lesson
from backend.domain.model.types import ID


class ILessonsRepository(metaclass=ABCMeta):
    @abstractmethod
    async def find_all_for_course(self, course_id: ID) -> List[Lesson]:
        ...

    @abstractmethod
    async def find_one_by_id(self, lesson_id: ID) -> Optional[Lesson]:
        ...

    @abstractmethod
    async def save(self, lesson: Lesson) -> None:
        ...

    @abstractmethod
    async def save_many(self, lessons: List[Lesson]) -> None:
        ...

    @abstractmethod
    async def count_for_all_courses(self) -> Mapping[ID, int]:
        ...

    @abstractmethod
    async def count_for_courses(self, course_ids: List[ID]) -> Mapping[ID, int]:
        ...
