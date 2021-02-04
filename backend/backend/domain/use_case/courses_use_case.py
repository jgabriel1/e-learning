from typing import List

from backend.domain.dto import CreateCourseDTO, UpdateCourseDTO
from backend.domain.exception import CourseNameAlreadyExistsError
from backend.domain.model.base import ID
from backend.domain.model.course import Course
from backend.domain.model.lesson import Lesson
from backend.domain.repository.courses_repository import ICoursesRepository
from backend.domain.repository.lessons_repository import ILessonsRepository


class CoursesUseCase:
    def __init__(
        self,
        lessons_repository: ILessonsRepository,
        courses_repository: ICoursesRepository,
    ) -> None:
        self._lessons_repository = lessons_repository
        self._courses_repository = courses_repository

    async def list_all_courses(self) -> List[Course]:
        """
        TODO:
        Decide between query and memory optimization or respecting architecture:
        1 - Utilize the lessons prop provided by the orm to get the lessons count
        2 - Utilize the lessons repository methods to get the counts directly.
        """
        courses = await self._courses_repository.find_all()

        lesson_counts = await self._lessons_repository.count_lessons_all()

        for course in courses:
            course.lessons_count = lesson_counts.get(course.id) or 0

        return courses

    async def list_courses_by_name_search(self, name: str) -> List[Course]:
        courses = await self._courses_repository.find_many_by_name_like(name)

        lesson_counts = await self._lessons_repository.count_lessons_per_course_id(
            [course.id for course in courses],
        )

        for course in courses:
            course.lessons_count = lesson_counts.get(course.id) or 0

        return courses

    async def list_lessons_for_course(self, course_id: ID) -> List[Lesson]:
        lessons = await self._lessons_repository.list_by_course_id(course_id)

        return lessons

    async def create_new_course(self, data: CreateCourseDTO) -> Course:
        course_name_already_exists = await self._courses_repository.exists_by_name(
            data.name,
        )

        if course_name_already_exists:
            raise CourseNameAlreadyExistsError(
                "Unable to create a course because this name is already taken."
            )

        course = await self._courses_repository.create(data)

        return course

    async def update_course(self, course_id: ID, update_data: UpdateCourseDTO) -> None:
        await self._courses_repository.update_by_id(
            course_id=course_id,
            update_data=update_data,
        )
