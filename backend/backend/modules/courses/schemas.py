from pydantic import BaseModel


class CreateNewCourseData(BaseModel):
    name: str
    image: str


class UpdateCourseData(BaseModel):
    name: str = None
    image: str = None
