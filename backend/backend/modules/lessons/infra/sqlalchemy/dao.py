from backend.shared.database.base_table import DeclarativeBase

from sqlalchemy import Column, ForeignKey, Integer, String


class LessonDAO(DeclarativeBase):
    __tablename__ = "lessons"

    name = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    description = Column(String(200), nullable=False)
    video_id = Column(String)
    thumbnail_url = Column(String)
    lesson_index = Column(Integer, nullable=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
