from datetime import datetime
from typing import List

from backend.shared.database.connection import (
    DatabaseConnection,
    get_database_connection,
)
from fastapi import Depends
from pydantic import AnyHttpUrl, BaseModel, parse_obj_as

from .entities import Course as CourseDAO


class Course(BaseModel):
    id: int
    name: str
    image: AnyHttpUrl
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True


class CoursesRepository:
    def __init__(
        self,
        connection: DatabaseConnection = Depends(get_database_connection),
    ) -> None:
        self.db = connection.db

    async def create(
        self,
        *,
        name: str,
        image_url: str,
    ) -> Course:
        new_course = CourseDAO(name=name, image=image_url)

        self.db.add(new_course)

        try:
            self.db.flush()
            return Course.from_orm(new_course)
        finally:
            self.db.commit()

    async def update_by_id(
        self,
        id: int,
        *,
        name: str = None,
        image: str = None,
    ) -> None:
        course = self.db.query(CourseDAO).filter(CourseDAO.id == id).first()

        if name:
            course.name = name

        if image:
            course.image = image

        self.db.commit()

    async def findAll(self) -> List[Course]:
        courses = self.db.query(CourseDAO).all()

        return parse_obj_as(List[Course], courses)

    async def find_many_by_id(self, ids: List[int]) -> List[Course]:
        courses = self.db.query(CourseDAO).filter(CourseDAO.id.in_(ids)).all()

        return parse_obj_as(List[Course], courses)

    async def search_many(self, query: str) -> List[Course]:
        courses = (
            self.db.query(CourseDAO).filter(CourseDAO.name.like(f"%{query}%")).all()
        )

        return parse_obj_as(List[Course], courses)
