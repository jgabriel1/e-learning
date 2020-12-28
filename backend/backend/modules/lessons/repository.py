from datetime import datetime
from typing import List

from backend.shared.database.connection import (
    DatabaseConnection,
    get_database_connection,
)
from fastapi.param_functions import Depends
from pydantic import BaseModel, parse_obj_as


class Lesson(BaseModel):
    id: int
    name: str
    duration: int
    description: str
    video_id: str
    course_id: int
    created_at: datetime
    updated_at: datetime = None


class LessonsRepository(BaseModel):
    def __init__(
        self,
        connection: DatabaseConnection = Depends(get_database_connection),
    ) -> None:
        self.db = connection.db
        self.table = connection.tables.lessons

    async def create(
        self,
        *,
        name: str,
        duration: int,
        description: str,
        video_id: str,
        course_id: int,
    ) -> Lesson:
        new_lesson_id = await self.db.execute(
            f"""
                INSERT INTO
                    lessons (name, duration, description, video_id, course_id)
                VALUES
                    (:name, :duration, :description, :video_id, :course_id);
            """,
            {
                "name": name,
                "duration": duration,
                "description": description,
                "video_id": video_id,
                "course_id": course_id,
            },
        )

        new_lesson = Lesson(
            id=new_lesson_id,
            name=name,
            duration=duration,
            description=description,
            video_id=video_id,
        )

        return new_lesson

    async def update_by_id(
        self,
        id: int,
        *,
        name: str = None,
        duration: int = None,
        description: str = None,
        video_id: str = None,
    ) -> None:
        await self.db.execute(
            f"""
                UPDATE lessons
                SET {",".join([
                    f"name = '{name}'",
                    f"duration = '{duration}'",
                    f"description = '{description}'",
                    f"video_id = '{video_id}'",
                ])}
                WHERE id = {id};
            """,
        )

    async def list_by_course_id(self, course_id: int) -> List[Lesson]:
        lessons = await self.db.fetch_all(
            "SELECT * FROM lessons WHERE course_id = :course_id",
            {"course_id": course_id},
        )

        return parse_obj_as(List[Lesson], lessons)