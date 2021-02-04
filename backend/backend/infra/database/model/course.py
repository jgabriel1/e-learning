from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from backend.domain.model.course import Course
from backend.infra.database.model.base import DeclarativeBase


class CourseModel(DeclarativeBase):
    __domain__ = Course
    __tablename__ = "courses"

    name = Column(String, nullable=False)
    image = Column(String, nullable=True)

    lessons = relationship("Lesson")
