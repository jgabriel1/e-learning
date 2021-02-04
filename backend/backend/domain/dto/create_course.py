from backend.domain.dto.base import BaseDTO


class CreateCourseDTO(BaseDTO):
    def __init__(self, name: str, image: str) -> None:
        self.name = name
        self.image = image
