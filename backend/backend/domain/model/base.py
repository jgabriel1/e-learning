from datetime import datetime

from pydantic import BaseModel


class ID(int):
    ...


class Base(BaseModel):
    """
    These are the attributes that should only be available after the record gets persisted.
    """

    id: ID = None
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True
