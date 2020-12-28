from fastapi import APIRouter

from .services import (
    create_course,
    list_all_courses,
    list_lessons_for_course,
    update_course,
)

courses_router = APIRouter(prefix="/courses")

courses_router.add_api_route("/", create_course, methods=["POST"], status_code=201)

courses_router.add_api_route("/", list_all_courses, methods=["GET"])

courses_router.add_api_route(
    "/{course_id}/lessons", list_lessons_for_course, methods=["GET"]
)

courses_router.add_api_route(
    "/{course_id}", update_course, methods=["PUT"], status_code=204
)
