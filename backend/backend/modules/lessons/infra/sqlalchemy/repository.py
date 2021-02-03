from typing import Iterable, List, Mapping, Optional

from backend.modules.lessons.domain.dtos import CreateLessonDTO, UpdateLessonDTO
from backend.modules.lessons.domain.model import Lesson
from backend.modules.lessons.domain.repository import ILessonsRepository
from backend.shared.domain.model.types import ID
from pydantic import parse_obj_as

from sqlalchemy import bindparam, text

from .dao import LessonDAO

from backend.shared.database.connection import DatabaseConnection


class LessonsRepository(ILessonsRepository):
    def __init__(self, connection: DatabaseConnection) -> None:
        super().__init__()

        self.db = connection.db

    async def list_by_course_id(self, course_id: ID) -> List[Lesson]:
        lessons = (
            self.db.query(LessonDAO)
            .filter(LessonDAO.course_id == course_id)
            .all()
            .sort(key=LessonDAO.lesson_index)
        )

        return parse_obj_as(List[Lesson], lessons)

    async def find_one_by_id(self, lesson_id: ID) -> Optional[Lesson]:
        lesson = self.db.query(LessonDAO).filter(LessonDAO.id == lesson_id).first()

        return Lesson.from_orm(lesson)

    async def create(self, data: CreateLessonDTO) -> Lesson:
        new_lesson = LessonDAO(
            name=data.name,
            description=data.description,
            course_id=data.course_id,
            duration=data.duration,
            lesson_index=data.lesson_index,
            thumbnail_url=data.thumbnail_url,
            video_id=data.video_id,
        )

        self.db.add(new_lesson)

        try:
            self.db.flush()
            return Lesson.from_orm(new_lesson)
        finally:
            self.commit()

    async def create_all_for_course(
        self, course_id: ID, lessons: Iterable[CreateLessonDTO]
    ) -> List[Lesson]:
        new_lessons = [
            LessonDAO(
                name=lesson.name,
                description=lesson.description,
                duration=lesson.duration,
                lesson_index=lesson.lesson_index,
                thumbnail_url=lesson.thumbnail_url,
                video_id=lesson.video_id,
                course_id=course_id,
            )
            for lesson in lessons
        ]

        self.db.add_all(new_lessons)

        try:
            self.db.flush()
            return parse_obj_as(List[Lesson], new_lessons)
        finally:
            self.db.commit()

    async def update_by_id(self, lesson_id: ID, update_data: UpdateLessonDTO) -> None:
        lesson = self.db.query(LessonDAO).filter(LessonDAO.id == lesson_id).first()

        for prop_name, value in update_data.dict().items():
            if value is not None:
                setattr(lesson, prop_name, value)

        self.db.commit()

    async def count_lessons_all(self) -> Mapping[ID, int]:
        counts = self.db.execute(
            "SELECT course_id, COUNT() AS quantity FROM lessons GROUP BY course_id;",
        )

        return dict(result for result in counts)

    async def count_lessons_per_course_id(
        self, course_ids: List[ID]
    ) -> Mapping[ID, int]:
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

        counts = self.db.execute(query, {"courses_ids": course_ids})

        return dict(result for result in counts)
