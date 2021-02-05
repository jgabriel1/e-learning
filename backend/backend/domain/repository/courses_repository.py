from abc import ABCMeta, abstractmethod
from typing import List

from backend.domain.model.base import ID
from backend.domain.model.course import Course


class ICoursesRepository(metaclass=ABCMeta):
    @abstractmethod
    async def exists_by_id(self, course_id: ID) -> bool:
        ...

    @abstractmethod
    async def exists_by_name(self, name: str) -> bool:
        ...

    @abstractmethod
    async def find_all(self) -> List[Course]:
        ...

    @abstractmethod
    async def find_many_by_ids(self, course_ids: List[ID]) -> List[Course]:
        ...

    @abstractmethod
    async def find_many_with_name_like(self, name: str) -> List[Course]:
        ...

    @abstractmethod
    async def save(self, course: Course) -> None:
        ...
