from typing import List, Optional

from backend.modules.lessons.repository import LessonsRepository
from fastapi import Depends, Header, Path, Response
from pydantic.tools import parse_obj_as

from .repository import CoursesRepository
from .schemas import (
    CreateNewCourseData,
    IndexCoursesFromListData,
    ListCoursesCourseData,
    ListLessonsForCourseData,
    UpdateCourseData,
)


async def list_all_courses(
    courses_repository: CoursesRepository = Depends(),
    lessons_repository: LessonsRepository = Depends(),
):
    courses = await courses_repository.findAll()

    lessons_counts = await lessons_repository.count_lessons_per_course()

    return [
        ListCoursesCourseData(
            **course.dict(),
            lessons_count=lessons_counts.get(course.id) or 0,
        )
        for course in courses
    ]


async def index_courses_from_list(
    data: IndexCoursesFromListData,
    courses_repository: CoursesRepository = Depends(),
    lessons_repository: LessonsRepository = Depends(),
):
    courses_ids = data.courses

    courses = await courses_repository.find_many_by_id(courses_ids)

    lessons_counts = await lessons_repository.count_lessons_per_course_id(courses_ids)

    return [
        ListCoursesCourseData(
            **course.dict(),
            lessons_count=lessons_counts.get(course.id) or 0,
        )
        for course in courses
    ]


async def search_courses_by_name(
    query: str,
    courses_repository: CoursesRepository = Depends(),
    lessons_repository: LessonsRepository = Depends(),
):
    courses = await courses_repository.search_many(query)

    lesson_counts = await lessons_repository.count_lessons_per_course_id(
        [course.id for course in courses],
    )

    return [
        ListCoursesCourseData(
            **course.dict(),
            lessons_count=lesson_counts.get(course.id) or 0,
        )
        for course in courses
    ]


async def list_lessons_for_course(
    course_id: int = Path(...),
    mac_id: Optional[str] = Header(None),
    lessons_repository: LessonsRepository = Depends(),
):
    lessons = await lessons_repository.list_by_course_id(course_id)

    return parse_obj_as(List[ListLessonsForCourseData], lessons)


async def create_course(
    new_course: CreateNewCourseData,
    courses_repository: CoursesRepository = Depends(),
):
    created_course = await courses_repository.create(
        name=new_course.name,
        image_url=new_course.image,
    )

    return created_course


async def update_course(
    update_course_data: UpdateCourseData,
    course_id: int = Path(...),
    courses_repository: CoursesRepository = Depends(),
):
    await courses_repository.update_by_id(
        course_id,
        name=update_course_data.name,
        image=update_course_data.image,
    )

    return Response(status_code=204)
