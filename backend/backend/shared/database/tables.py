from sqlalchemy import MetaData

from backend.modules.courses.entities import Course
from backend.modules.lessons.entities import Lesson


class Tables:
    def __init__(self, metadata: MetaData) -> None:
        self.metadata = metadata

        self.metadata.tables = {
            Course.__tablename__: Course.__table__,
            Lesson.__tablename__: Lesson.__table__,
        }
