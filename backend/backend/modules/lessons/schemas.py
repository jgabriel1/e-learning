from pydantic import BaseModel


class CreateNewLessonData(BaseModel):
    name: str
    duration: int
    description: str
    video_id: str
    thumbnail_url: str
    lesson_index: int = None
    course_id: int = None


class UpdateLessonData(BaseModel):
    name: str = None
    duration: int = None
    description: str = None
    video_id: str = None
    thumbnail_url: str = None
    lesson_index: int = None
    course_id: int = None
