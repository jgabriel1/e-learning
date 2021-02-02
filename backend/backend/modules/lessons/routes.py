from fastapi import APIRouter

from .services import create_new_lesson, show_lesson_details, update_lesson

lessons_router = APIRouter(prefix="/lessons")

lessons_router.add_api_route("/", create_new_lesson, methods=["POST"], status_code=201)

lessons_router.add_api_route(
    "/{lesson_id}", update_lesson, methods=["PUT"], status_code=204
)

lessons_router.add_api_route("/{lesson_id}", show_lesson_details, methods=["GET"])
