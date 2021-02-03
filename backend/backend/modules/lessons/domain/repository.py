from abc import ABCMeta, abstractmethod
from typing import Iterable, List, Mapping, Optional

from backend.shared.domain.model.types import ID

from .dtos import CreateLessonDTO, UpdateLessonDTO
from .model import Lesson


class ILessonsRepository(metaclass=ABCMeta):
    @abstractmethod
    async def list_by_course_id(self, course_id: ID) -> List[Lesson]:
        ...

    @abstractmethod
    async def find_one_by_id(self, lesson_id: ID) -> Optional[Lesson]:
        ...

    @abstractmethod
    async def create(self, data: CreateLessonDTO) -> Lesson:
        ...

    @abstractmethod
    async def create_all_for_course(
        self,
        course_id: ID,
        lessons: Iterable[CreateLessonDTO],
    ) -> List[Lesson]:
        ...

    @abstractmethod
    async def update_by_id(self, lesson_id: ID, update_data: UpdateLessonDTO) -> None:
        ...

    @abstractmethod
    async def count_lessons_all(self) -> Mapping[ID, int]:
        ...

    @abstractmethod
    async def count_lessons_per_course_id(
        self,
        course_ids: List[ID],
    ) -> Mapping[ID, int]:
        ...
