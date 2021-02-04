from backend.domain.dto.base import BaseDTO
from backend.domain.model.base import ID


class CreateLessonDTO(BaseDTO):
    def __init__(
        self,
        *,
        name: str,
        duration: int,
        description: str,
        video_id: str,
        thumbnail_url: str,
        lesson_index: int,
        course_id: ID = None,
    ) -> None:
        self.name = name
        self.duration = duration
        self.description = description
        self.video_id = video_id
        self.course_id = course_id
        self.thumbnail_url = thumbnail_url
        self.lesson_index = lesson_index
