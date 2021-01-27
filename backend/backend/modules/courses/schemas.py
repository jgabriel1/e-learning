from typing import List, TypeVar
from backend.modules.courses.repository import Course
from pydantic import BaseModel

ID = TypeVar("ID", bound=int)


class ListCoursesCourseData(Course):
    lessons_count: int


class CreateNewCourseData(BaseModel):
    name: str
    image: str


class UpdateCourseData(BaseModel):
    name: str = None
    image: str = None


class IndexCoursesFromListData(BaseModel):
    courses: List[ID]
