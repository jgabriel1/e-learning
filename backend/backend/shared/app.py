from backend.modules.courses.handlers import courses_router
from backend.modules.lessons.handlers import lessons_router
from fastapi import FastAPI

from .database.connection import get_database_connection


class App:
    def __init__(self) -> None:
        self.app = FastAPI()
        self.database_connection = get_database_connection()

        self.app.add_event_handler("startup", self.startup)
        self.app.add_event_handler("shutdown", self.shutdown)

        self.register_routes()

    def get_app(self) -> FastAPI:
        return self.app

    def register_routes(self) -> None:
        self.app.include_router(courses_router)
        self.app.include_router(lessons_router)

    async def startup(self) -> None:
        self.database_connection.create_tables()

        await self.database_connection.connect()

    async def shutdown(self) -> None:
        await self.database_connection.disconnect()
