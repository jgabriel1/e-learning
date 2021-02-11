from dotenv import load_dotenv

from backend.domain.repository.courses_repository import ICoursesRepository
from backend.domain.repository.lessons_repository import ILessonsRepository
from backend.domain.repository.youtube_playlist_repository import (
    IYoutubePlaylistRepository,
)
from backend.domain.use_case.courses_use_case import CoursesUseCase
from backend.domain.use_case.lessons_use_case import LessonsUseCase
from backend.domain.use_case.youtube_playlist_use_case import YoutubePlaylistUseCase
from backend.infra.database import create_database_connection, DatabaseConnection
from backend.infra.http.client import http_client_factory, IHttpClient
from backend.infra.repository.courses_repository_db import CoursesRepositoryDB
from backend.infra.repository.lessons_repository_db import LessonsRepositoryDB
from backend.infra.repository.youtube_playlist_repository_api import (
    YoutubePlaylistRepositoryAPI,
)


class Container:
    def __init__(self):
        load_dotenv()

    async def _create_singletons(self):
        self._http_client = await http_client_factory()
        self._database_connection = await create_database_connection()

    async def set_up(self):
        await self._create_singletons()

    def get_database_connection_instance(self) -> DatabaseConnection:
        return self._database_connection

    def get_http_client_instance(self) -> IHttpClient:
        return self._http_client

    def get_courses_repository(self) -> ICoursesRepository:
        repository = CoursesRepositoryDB(connection=self._database_connection)

        return repository

    def get_lessons_repository(self) -> ILessonsRepository:
        repository = LessonsRepositoryDB(connection=self._database_connection)

        return repository

    def get_youtube_playlist_repository(self) -> IYoutubePlaylistRepository:
        repository = YoutubePlaylistRepositoryAPI(client=self._http_client)

        return repository

    def get_courses_use_case(self) -> CoursesUseCase:
        use_case = CoursesUseCase(
            lessons_repository=self.get_lessons_repository(),
            courses_repository=self.get_courses_repository(),
        )

        return use_case

    def get_lessons_use_case(self) -> LessonsUseCase:
        use_case = LessonsUseCase(
            lessons_repository=self.get_lessons_repository(),
            courses_repository=self.get_courses_repository(),
        )

        return use_case

    def get_youtube_playlist_use_case(self) -> YoutubePlaylistUseCase:
        use_case = YoutubePlaylistUseCase(
            lessons_repository=self.get_lessons_repository(),
            courses_repository=self.get_courses_repository(),
            youtube_playlist_repository=self.get_youtube_playlist_repository(),
        )

        return use_case


container = Container()
