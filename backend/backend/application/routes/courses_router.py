from fastapi import APIRouter, Depends

from backend.application.container import container
from backend.application.model.courses import (
    CreateNewCourseRequestData,
    CreateNewCourseResponseData,
    ListAllCoursesResponseData,
    ListCoursesBySearchNameResponseData,
    ListLessonsForCourseResponseData,
)
from backend.domain.model.types import ID
from backend.domain.use_case.courses_use_case import CoursesUseCase

courses_router = APIRouter(prefix="/courses")


@courses_router.post("/", status_code=201)
async def create_new_course(
    course_data: CreateNewCourseRequestData,
    use_case: CoursesUseCase = Depends(container.get_courses_use_case),
):
    response = await use_case.create_new_course(data=course_data)

    return CreateNewCourseResponseData.parse_obj(response)


@courses_router.get("/")
async def list_all_courses(
    use_case: CoursesUseCase = Depends(container.get_courses_use_case),
):
    response = await use_case.list_all_courses()

    return ListAllCoursesResponseData.parse_array(response)


@courses_router.get("/search/{name}")
async def list_courses_by_search_name(
    name: str,
    use_case: CoursesUseCase = Depends(container.get_courses_use_case),
):
    response = await use_case.list_courses_by_name_search(name=name)

    return ListCoursesBySearchNameResponseData.parse_array(response)


@courses_router.get("/{course_id}/lessons")
async def list_lessons_for_course(
    course_id: ID,
    use_case: CoursesUseCase = Depends(container.get_courses_use_case),
):
    response = await use_case.list_lessons_for_course(course_id=course_id)

    return ListLessonsForCourseResponseData.parse_array(response)
