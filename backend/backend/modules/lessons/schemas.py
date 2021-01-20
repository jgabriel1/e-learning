from pydantic import BaseModel


class CreateNewLessonData(BaseModel):
    name: str
    duration: int
    description: str
    video_id: str
    thumbnail_url: str
    course_id: int = None


class UpdateLessonData(BaseModel):
    name: str = None
    duration: int = None
    description: str = None
    video_id: str = None
    course_id: int = None
    thumbnail_url: str = None
