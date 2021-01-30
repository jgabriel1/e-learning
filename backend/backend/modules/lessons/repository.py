from datetime import datetime
from typing import Iterable, List, Mapping

from backend.shared.database.connection import (
    DatabaseConnection,
    get_database_connection,
)
from fastapi.param_functions import Depends
from pydantic import BaseModel, parse_obj_as
from sqlalchemy import bindparam, text

from .entities import Lesson as LessonDAO
from .schemas import CreateNewLessonData


class Lesson(BaseModel):
    id: int
    name: str
    duration: int
    description: str
    video_id: str
    course_id: int
    lesson_index: int
    thumbnail_url: str
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True


class LessonsRepository:
    def __init__(
        self,
        connection: DatabaseConnection = Depends(get_database_connection),
    ) -> None:
        self.db = connection.db

    async def create(
        self,
        *,
        name: str,
        duration: int,
        description: str,
        video_id: str,
        course_id: int,
        thumbnail_url: str,
        lesson_index: int,
    ) -> Lesson:
        new_lesson = LessonDAO(
            name=name,
            duration=duration,
            description=description,
            video_id=video_id,
            course_id=course_id,
            thumbnail_url=thumbnail_url,
            lesson_index=lesson_index,
        )

        self.db.add(new_lesson)

        try:
            self.db.flush()
            return Lesson.from_orm(new_lesson)
        finally:
            self.db.commit()

    async def create_all_for_course(
        self,
        lessons: Iterable[CreateNewLessonData],
        course_id: int,
    ) -> List[Lesson]:
        lessons = [
            LessonDAO(
                **{
                    **lesson.dict(),
                    "course_id": course_id,
                },
            )
            for lesson in lessons
        ]

        self.db.add_all(lessons)

        try:
            self.db.flush()
            return parse_obj_as(List[Lesson], lessons)
        finally:
            self.db.commit()

    async def update_by_id(
        self,
        id: int,
        *,
        name: str = None,
        duration: int = None,
        description: str = None,
        video_id: str = None,
    ) -> None:
        lesson = self.db.query(LessonDAO).filter(LessonDAO.id == id).first()

        if name:
            lesson.name = name

        if duration:
            lesson.duration = duration

        if description:
            lesson.description = description

        if video_id:
            lesson.video_id = video_id

        self.db.commit()

    async def list_by_course_id(self, course_id: int) -> List[Lesson]:
        lessons = (
            self.db.query(LessonDAO).filter(LessonDAO.course_id == course_id).all()
        )

        return parse_obj_as(List[Lesson], lessons)

    async def count_lessons_per_course(self) -> Mapping[int, int]:
        counts = self.db.execute(
            "SELECT course_id, COUNT() AS quantity FROM lessons GROUP BY course_id;",
        )

        return dict(result for result in counts)

    async def count_lessons_per_course_id(self, ids: List[int]) -> Mapping[int, int]:
        query = text(
            """
            SELECT 
                course_id,
                COUNT() AS quantity
            FROM 
                lessons      
            WHERE
                course_id IN :courses_ids
            GROUP BY 
                course_id;
            """
        ).bindparams(bindparam("courses_ids", expanding=True))

        counts = self.db.execute(query, {"courses_ids": ids})

        return dict(result for result in counts)
