from fastapi import APIRouter, Depends

from .repository import LessonsRepository
from .schemas import CreateNewLessonData, UpdateLessonData

lessons_router = APIRouter(prefix="/lessons")


@lessons_router.post("/", status_code=201)
async def create_new_lesson(
    lesson_data: CreateNewLessonData,
    lessons_repository: LessonsRepository = Depends(),
):
    lesson = await lessons_repository.create(
        name=lesson_data.name,
        duration=lesson_data.duration,
        description=lesson_data.description,
        video_id=lesson_data.video_id,
        course_id=lesson_data.course_id,
    )

    return lesson


@lessons_router.put("/{lesson_id}", status_code=204)
async def update_lesson(
    lesson_id: int,
    update_lesson_data: UpdateLessonData,
    lessons_repository: LessonsRepository = Depends(),
):
    await lessons_repository.update_by_id(
        lesson_id,
        name=update_lesson_data.name,
        duration=update_lesson_data.duration,
        description=update_lesson_data.description,
        video_id=update_lesson_data.video_id,
        course_id=update_lesson_data.course_id,
    )
