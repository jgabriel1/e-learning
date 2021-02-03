from backend.modules.lessons.infra.container import LessonsUseCase, get_lessons_use_case
from backend.shared.domain.model.types import ID
from fastapi import APIRouter, Depends, HTTPException, Response

from .validators import (
    CreateNewLessonRequestData,
    CreateNewLessonResponseData,
    ShowLessonDetailsResponseData,
    UpdateLessonRequestData,
)

lessons_router = APIRouter(prefix="/lessons")


@lessons_router.post("/", status_code=201)
async def create_new_lesson(
    lesson_data: CreateNewLessonRequestData,
    use_case: LessonsUseCase = Depends(get_lessons_use_case),
):
    response = await use_case.create_new_lesson(lesson_data=lesson_data)

    return CreateNewLessonResponseData.parse_obj(response)


@lessons_router.put("/{lesson_id}", status_code=204)
async def update_lesson(
    lesson_id: ID,
    update_data: UpdateLessonRequestData,
    use_case: LessonsUseCase = Depends(get_lessons_use_case),
):
    await use_case.update_lesson(
        lesson_id=lesson_id,
        update_data=update_data,
    )

    return Response(status_code=204)


@lessons_router.get("/{lesson_id}")
async def show_lesson_details(
    lesson_id: ID,
    use_case: LessonsUseCase = Depends(get_lessons_use_case),
):
    response = await use_case.show_lesson_details(lesson_id=lesson_id)

    if response is None:
        raise HTTPException(status_code=404, detail="Lesson does not exist.")

    return ShowLessonDetailsResponseData.parse_obj(response)
