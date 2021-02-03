from backend.modules.lessons.domain.repository import ILessonsRepository
from backend.modules.lessons.domain.use_case import LessonsUseCase
from backend.modules.lessons.infra.sqlalchemy.repository import LessonsRepository
from fastapi import Depends

from backend.shared.database.connection import (
    DatabaseConnection,
    get_database_connection,
)


def get_lessons_repository(
    database_connection: DatabaseConnection = Depends(get_database_connection),
) -> ILessonsRepository:
    return LessonsRepository(connection=database_connection)


def get_lessons_use_case(
    lessons_repository: ILessonsRepository = Depends(get_lessons_repository),
) -> LessonsUseCase:
    return LessonsUseCase(lessons_repository)
