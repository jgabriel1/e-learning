from typing import Optional

from backend.shared.domain.model.types import ID

from .dtos import CreateLessonDTO, UpdateLessonDTO
from .model import Lesson
from .repository import ILessonsRepository


class LessonsUseCase:
    def __init__(self, lessons_repository: ILessonsRepository) -> None:
        self._lessons_repository = lessons_repository

    async def show_lesson_details(self, lesson_id: ID) -> Optional[Lesson]:
        lesson = await self._lessons_repository.find_one_by_id(lesson_id)

        return lesson

    async def create_new_lesson(self, lesson_data: CreateLessonDTO) -> Lesson:
        lesson = await self._lessons_repository.create(
            data=lesson_data,
        )

        return lesson

    async def update_lesson(self, lesson_id: ID, update_data: UpdateLessonDTO) -> None:
        await self._lessons_repository.update_by_id(
            lesson_id=lesson_id,
            update_data=update_data,
        )
