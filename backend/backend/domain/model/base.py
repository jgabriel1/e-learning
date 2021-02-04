from datetime import datetime

from pydantic import BaseModel, ValidationError

from backend.domain.exception import DomainValidationError


class ID(int):
    ...


class Base(BaseModel):
    """
    These are the attributes that should only be available after the record gets persisted.
    """

    id: ID = None
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, **data) -> None:
        try:
            super().__init__(**data)
        except (ValidationError, TypeError) as e:
            raise DomainValidationError(e)

    class Config:
        orm_mode = True
