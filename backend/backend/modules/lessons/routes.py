from fastapi import APIRouter

from .services import create_new_lesson, update_lesson

lessons_router = APIRouter(prefix="/lessons")

lessons_router.add_api_route("/", create_new_lesson, methods=["POST"], status_code=201)

lessons_router.add_api_route(
    "/{lesson_id}", update_lesson, methods=["PUT"], status_code=204
)
