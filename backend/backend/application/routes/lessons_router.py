from fastapi import APIRouter, Depends, HTTPException

from backend.application.container import container
from backend.application.model.lessons import (
    CreateNewLessonRequestData,
    CreateNewLessonResponseData,
    ShowLessonDetailsResponseData,
)
from backend.domain.model.types import ID
from backend.domain.use_case.lessons_use_case import LessonsUseCase

lessons_router = APIRouter(prefix="/lessons")


@lessons_router.post("/", status_code=201, response_model=CreateNewLessonResponseData)
async def create_new_lesson(
    lesson_data: CreateNewLessonRequestData,
    use_case: LessonsUseCase = Depends(container.get_lessons_use_case),
):
    response = await use_case.create_new_lesson(lesson_data=lesson_data)

    return CreateNewLessonResponseData.parse_obj(response)


@lessons_router.get("/{lesson_id}")
async def show_lesson_details(
    lesson_id: ID,
    use_case: LessonsUseCase = Depends(container.get_lessons_use_case),
):
    response = await use_case.show_lesson_details(lesson_id=lesson_id)

    if response is None:
        raise HTTPException(status_code=404, detail="Lesson does not exist.")

    return ShowLessonDetailsResponseData.parse_obj(response)
