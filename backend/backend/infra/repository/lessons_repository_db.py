from typing import List, Mapping, Iterable, Optional

from sqlalchemy import text, bindparam

from backend.domain.model.lesson import Lesson
from backend.domain.model.types import ID
from backend.domain.repository.lessons_repository import ILessonsRepository
from backend.infra.database.connection import DatabaseConnection
from backend.infra.database.model import LessonModel


class LessonsRepositoryDB(ILessonsRepository):
    def __init__(self, connection: DatabaseConnection):
        self._db = connection.db

    async def save(self, lesson: Lesson) -> None:
        new_lesson = LessonModel.from_domain(lesson)

        self._db.add(new_lesson)
        self._db.flush()

        new_lesson.save_model()

        self._db.commit()

    async def save_many(self, lessons: Iterable[Lesson]) -> None:
        new_lessons = [LessonModel.from_domain(lesson) for lesson in lessons]

        self._db.add_all(new_lessons)
        self._db.flush()

        for lesson in new_lessons:
            lesson.save_model()

        self._db.commit()

    async def count_for_all_courses(self) -> Mapping[ID, int]:
        counts = self._db.execute(
            "SELECT course_id, COUNT() AS quantity FROM lessons GROUP BY course_id;",
        )

        return dict(count for count in counts)

    async def count_for_courses(self, course_ids: List[ID]) -> Mapping[ID, int]:
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

        counts = self._db.execute(query, {"courses_ids": course_ids})

        return dict(count for count in counts)

    async def find_one_by_id(self, lesson_id: ID) -> Optional[Lesson]:
        lesson = self._db.query(LessonModel).filter(LessonModel.id == lesson_id).first()

        if lesson is not None:
            return Lesson.from_orm(lesson)

    async def find_all_for_course(self, course_id: ID) -> List[Lesson]:
        lessons = (
            self._db.query(LessonModel).filter(LessonModel.course_id == course_id).all()
        )

        return Lesson.parse_list(lessons)
