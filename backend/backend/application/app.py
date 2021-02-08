from fastapi import FastAPI

from backend.application.container import container
from backend.application.routes import (
    courses_router,
    lessons_router,
    youtube_client_router,
)


class App:
    def __init__(self):
        self._app = FastAPI()

        self._container = container

        self._app.add_event_handler("startup", self.startup)
        self._app.add_event_handler("shutdown", self.shutdown)

        self._app.include_router(courses_router)
        self._app.include_router(lessons_router)
        self._app.include_router(youtube_client_router)

    def get_app(self):
        return self._app

    async def startup(self):  # noqa
        print("Starting server up...")
        await self._container.set_up()

    async def shutdown(self):  # noqa
        print("Shutting server down...")


app = App().get_app()
