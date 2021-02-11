from typing import List

from backend.domain.model.course import Course
from backend.domain.model.types import ID
from backend.domain.repository.courses_repository import ICoursesRepository
from backend.infra.database.connection import DatabaseConnection
from backend.infra.database.model import CourseModel


class CoursesRepositoryDB(ICoursesRepository):
    def __init__(self, connection: DatabaseConnection):
        self._db = connection.db

    async def save(self, course: Course) -> None:
        new_course = CourseModel.from_domain(course)

        self._db.add(new_course)
        self._db.flush()

        new_course.save_model()

        self._db.commit()

    async def exists_by_id(self, course_id: ID) -> bool:
        count = self._db.query(CourseModel).filter(CourseModel.id == course_id).count()

        return count == 1

    async def exists_by_name(self, name: str) -> bool:
        count = self._db.query(CourseModel).filter(CourseModel.name == name).count()

        return count == 1

    async def find_all(self) -> List[Course]:
        courses = self._db.query(CourseModel).all()

        return Course.parse_list(courses)

    async def find_many_by_ids(self, course_ids: List[ID]) -> List[Course]:
        courses = (
            self._db.query(CourseModel).filter(CourseModel.id.in_(course_ids)).all()
        )

        return Course.parse_list(courses)

    async def find_many_with_name_like(self, name: str) -> List[Course]:
        courses = (
            self._db.query(CourseModel).filter(CourseModel.name.like(f"%{name}%")).all()
        )

        return Course.parse_list(courses)
