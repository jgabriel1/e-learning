from typing import Any, Type, List

from pydantic import BaseModel, AnyHttpUrl, parse_obj_as

from backend.domain.dto import CreateCourseDTO
from backend.domain.model.types import ID


class CreateNewCourseRequestData(CreateCourseDTO, BaseModel):
    ...


class CreateNewCourseResponseData(BaseModel):
    id: ID
    name: str
    image: AnyHttpUrl
    lessons_count: int = None


class ListAllCoursesResponseData(BaseModel):
    id: ID
    name: str
    image: AnyHttpUrl
    lessons_count: int = None

    @classmethod
    def parse_array(
        cls: Type["ListAllCoursesResponseData"], obj: Any
    ) -> List["ListAllCoursesResponseData"]:
        return parse_obj_as(List[cls], obj)


class ListCoursesBySearchNameResponseData(ListAllCoursesResponseData):
    ...


class ListLessonsForCourseResponseData(BaseModel):
    id: ID
    name: str
    duration: int
    lesson_index: int
    course_id: int

    @classmethod
    def parse_array(
        cls: Type["ListLessonsForCourseResponseData"], obj: Any
    ) -> List["ListLessonsForCourseResponseData"]:
        return parse_obj_as(List[cls], obj)
