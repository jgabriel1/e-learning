from backend.modules.courses.repository import Course
from pydantic import BaseModel


class ListAllCoursesCourseData(Course):
    lessons_count: int


class CreateNewCourseData(BaseModel):
    name: str
    image: str


class UpdateCourseData(BaseModel):
    name: str = None
    image: str = None
