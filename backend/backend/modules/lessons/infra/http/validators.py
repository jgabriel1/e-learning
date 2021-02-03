from backend.modules.lessons.domain.dtos import CreateLessonDTO, UpdateLessonDTO
from backend.modules.lessons.domain.model import Lesson
from pydantic import BaseModel


class CreateNewLessonRequestData(CreateLessonDTO, BaseModel):
    ...


class CreateNewLessonResponseData(Lesson, BaseModel):
    ...


class UpdateLessonRequestData(UpdateLessonDTO, BaseModel):
    ...


class ShowLessonDetailsResponseData(Lesson, BaseModel):
    ...