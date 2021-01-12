from datetime import datetime
from typing import List

from backend.shared.database.connection import (
    DatabaseConnection,
    get_database_connection,
)
from fastapi import Depends
from pydantic import AnyHttpUrl, BaseModel, parse_obj_as


class Course(BaseModel):
    id: int
    name: str
    image: AnyHttpUrl
    created_at: datetime
    updated_at: datetime = None


class CoursesRepository:
    def __init__(
        self,
        connection: DatabaseConnection = Depends(get_database_connection),
    ) -> None:
        self.db = connection.db
        self.table = connection.tables.courses

    async def create(self, *, name: str, image_url: str) -> Course:
        new_course_id = await self.db.execute(
            f"INSERT INTO courses (name, image) VALUES (:name, :image_url);",
            {"name": name, "image_url": image_url},
        )

        new_course = Course(
            id=new_course_id,
            name=name,
            image=image_url,
        )

        return new_course

    async def update_by_id(
        self, id: int, *, name: str = None, image: str = None
    ) -> None:
        await self.db.execute(
            self.table.update()
            .where(self.table.c.id == id)
            .values(
                {
                    key: value
                    for key, value in {"name": name, "image": image}.items()
                    if value is not None
                }
            ),
        )

    async def findAll(self) -> List[Course]:
        courses = await self.db.fetch_all("SELECT * FROM courses;")

        return parse_obj_as(List[Course], courses)
