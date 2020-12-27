from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    MetaData,
    String,
    Table,
    func,
)


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
            Column("video_id", String),
            Column("course_id", Integer, ForeignKey("courses.id")),
            Column("created_at", DateTime(timezone=True), server_default=func.now()),
            Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
        )
