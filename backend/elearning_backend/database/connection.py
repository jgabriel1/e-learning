from databases import Database
from elearning_backend.database.models import Base
from sqlalchemy import create_engine

DATABASE_URL = "sqlite:///./database.db"


class DatabaseConnection:
    def __init__(self, url=DATABASE_URL) -> None:
        self.db = Database(url)
        self.metadata = Base.metadata
        self.engine = create_engine(url, connect_args={"check_same_thread": False})

    def create_tables(self) -> None:
        self.metadata.create_all(self.engine)

    async def connect(self) -> None:
        await self.db.connect()

    async def disconnect(self) -> None:
        await self.db.disconnect()


database_connection = DatabaseConnection()


def get_database_connection() -> DatabaseConnection:
    return database_connection
