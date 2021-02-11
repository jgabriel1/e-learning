from sqlalchemy import Column, Integer, ForeignKey, String

from backend.domain.model.lesson import Lesson
from backend.infra.database.model.base import DeclarativeBase


class LessonModel(DeclarativeBase):
    __domain__ = Lesson
    __tablename__ = "lessons"

    name = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    description = Column(String(200), nullable=False)
    video_id = Column(String)
    thumbnail_url = Column(String)
    lesson_index = Column(Integer, nullable=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
