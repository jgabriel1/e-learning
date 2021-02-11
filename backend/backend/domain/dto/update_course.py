from backend.domain.dto.base import BaseDTO


class UpdateCourseDTO(BaseDTO):
    def __init__(self, name: str = None, image: str = None) -> None:
        self.name = name
        self.image = image
