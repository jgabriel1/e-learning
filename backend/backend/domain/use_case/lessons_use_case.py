from typing import Optional

from backend.domain.dto import CreateLessonDTO, UpdateLessonDTO
from backend.domain.exception import NonexistentCourseError, NonexistentLessonError
from backend.domain.model.base import ID
from backend.domain.model.lesson import Lesson
from backend.domain.repository.courses_repository import ICoursesRepository
from backend.domain.repository.lessons_repository import ILessonsRepository


class LessonsUseCase:
    def __init__(
        self,
        lessons_repository: ILessonsRepository,
        courses_repository: ICoursesRepository,
    ) -> None:
        self._lessons_repository = lessons_repository
        self._courses_repository = courses_repository

    async def show_lesson_details(self, lesson_id: ID) -> Optional[Lesson]:
        lesson = await self._lessons_repository.find_one_by_id(lesson_id)

        if lesson is None:
            raise NonexistentLessonError(
                f"A lesson with id '{lesson_id}' does not exist.",
            )

        return lesson

    async def create_new_lesson(self, lesson_data: CreateLessonDTO) -> Lesson:
        course_exists = await self._courses_repository.exists_by_id(
            lesson_data.course_id,
        )

        if not course_exists:
            raise NonexistentCourseError(
                "Cannot create a lesson for a course that does not exist",
            )

        lesson = await self._lessons_repository.create(
            data=lesson_data,
        )

        return lesson

    async def update_lesson(self, lesson_id: ID, update_data: UpdateLessonDTO) -> None:
        await self._lessons_repository.update_by_id(
            lesson_id=lesson_id,
            update_data=update_data,
        )
