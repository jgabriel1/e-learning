from datetime import datetime

from pydantic import BaseModel


class ID(int):
    ...


class Base(BaseModel):
    id: ID
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        orm_mode = True
