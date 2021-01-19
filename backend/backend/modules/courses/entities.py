from backend.shared.database.base_table import DeclarativeBase
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Course(DeclarativeBase):
    __tablename__ = "courses"

    name = Column(String, nullable=False)
    image = Column(String, nullable=True)

    lessons = relationship("Lesson")
