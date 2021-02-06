from datetime import datetime
from typing import Any, List, Type, TypeVar

from pydantic import BaseModel, ValidationError, parse_obj_as

from backend.domain.exception import DomainValidationError
from backend.domain.model.types import ID


def validation_error_handler(func):
    def decorate(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValidationError:
            raise DomainValidationError

    return decorate


T = TypeVar("T", bound="Base")


class Base(BaseModel):
    """
    These are the attributes that should only be available after the record gets persisted.
    """

    id: ID = None
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True

    @validation_error_handler
    def __init__(self, **data) -> None:
        super().__init__(**data)

    @classmethod
    @validation_error_handler
    def parse_obj(cls: Type[T], obj: Any) -> T:
        return parse_obj_as(cls, obj)

    @classmethod
    @validation_error_handler
    def parse_list(cls: Type[T], arr: List[Any]) -> List[T]:
        return parse_obj_as(List[cls], arr)
