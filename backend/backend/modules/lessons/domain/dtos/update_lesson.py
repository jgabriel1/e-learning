from .base import BaseDTO


class UpdateLessonDTO(BaseDTO):
    def __init__(
        self,
        *,
        name: str = None,
        duration: int = None,
        description: str = None,
        video_id: str = None,
        thumbnail_url: str = None,
    ) -> None:
        self.name = name
        self.duration = duration
        self.description = description
        self.video_id = video_id
        self.thumbnail_url = thumbnail_url
