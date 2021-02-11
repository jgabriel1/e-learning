import os

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from backend.infra.database.model import DeclarativeBase


class DatabaseConnection:
    def __init__(self) -> None:
        environment = os.getenv("ENV")

        if environment == "PROD":
            url = os.getenv("PRODUCTION_DB_URL")
        elif environment == "TEST":
            url = "sqlite:///:memory:"
        else:
            url = "sqlite:///./database.db"

        self._engine = create_engine(url)
        self._metadata = DeclarativeBase.metadata

        self._create_tables()

        self.db = Session(bind=self._engine)

    def _create_tables(self) -> None:
        self._metadata.create_all(self._engine)
