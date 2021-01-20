from sqlalchemy import MetaData, create_engine
from sqlalchemy.orm import Session

from .tables import Tables

from backend.shared.config import DATABASE_URL


class DatabaseConnection:
    def __init__(self, url=DATABASE_URL) -> None:
        self.engine = create_engine(url, connect_args={"check_same_thread": False})

        self.metadata = MetaData()
        self.tables = Tables(self.metadata)

        self.db = Session(bind=self.engine)

    def create_tables(self) -> None:
        self.metadata.create_all(self.engine)

    async def connect(self) -> None:
        ...

    async def disconnect(self) -> None:
        ...


database_connection = DatabaseConnection()


def get_database_connection() -> DatabaseConnection:
    return database_connection
