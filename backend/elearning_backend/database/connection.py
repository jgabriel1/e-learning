from databases import Database
from sqlalchemy import Column, DateTime, Integer, String, create_engine
from sqlalchemy.sql import func
from sqlalchemy.sql.schema import ForeignKey, MetaData, Table

DATABASE_URL = "sqlite:///./database.db"


class Tables:
    def __init__(self, metadata: MetaData) -> None:
        self.courses = Table(
            "courses",
            metadata,
            Column("id", Integer, primary_key=True, autoincrement=True),
            Column("name", String, nullable=False),
            Column("image", String, nullable=True),
            Column("created_at", DateTime(timezone=True), server_default=func.now()),
            Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
        )

        self.lessons = Table(
            "lessons",
            metadata,
            Column("id", Integer, primary_key=True, autoincrement=True),
            Column("name", String, nullable=False),
            Column("duration", Integer, nullable=False),
            Column("description", String(200), nullable=False),
            Column("course_id", Integer, ForeignKey("courses.id")),
            Column("created_at", DateTime(timezone=True), server_default=func.now()),
            Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
        )


class DatabaseConnection:
    def __init__(self, url=DATABASE_URL) -> None:
        self.db = Database(url)
        self.engine = create_engine(url, connect_args={"check_same_thread": False})

        self.metadata = MetaData()
        self.tables = Tables(self.metadata)

    def create_tables(self) -> None:
        self.metadata.create_all(self.engine)

    async def connect(self) -> None:
        await self.db.connect()

    async def disconnect(self) -> None:
        await self.db.disconnect()


database_connection = DatabaseConnection()


def get_database_connection() -> DatabaseConnection:
    return database_connection
