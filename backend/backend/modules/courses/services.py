from typing import Optional

from backend.modules.lessons.repository import LessonsRepository
from fastapi import Depends, Header, Path, Response

from .repository import CoursesRepository
from .schemas import CreateNewCourseData, UpdateCourseData


async def list_all_courses(courses_repository: CoursesRepository = Depends()):
    courses = await courses_repository.findAll()

    return courses


async def list_lessons_for_course(
    course_id: int = Path(...),
    mac_id: Optional[str] = Header(None),
    lessons_repository: LessonsRepository = Depends(),
):
    lessons = await lessons_repository.list_by_course_id(course_id)

    return lessons


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
