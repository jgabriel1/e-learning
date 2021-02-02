from fastapi import Depends, Path
from starlette.responses import Response

from .repository import LessonsRepository
from .schemas import CreateNewLessonData, UpdateLessonData


async def show_lesson_details(
    lesson_id: int = Path(...),
    lessons_repository: LessonsRepository = Depends(),
):
    lesson = await lessons_repository.find_one_by_id(lesson_id)

    return lesson


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


async def update_lesson(
    update_lesson_data: UpdateLessonData,
    lesson_id: int = Path(...),
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

    return Response(status_code=204)
