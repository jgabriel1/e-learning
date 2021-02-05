from typing import Type

from sqlalchemy import Column, DateTime, Integer, func, MetaData
from sqlalchemy.ext.declarative import as_declarative

from backend.domain.model.base import Base as DomainBaseModel


@as_declarative(metadata=MetaData())
class DeclarativeBase:
    __domain__: Type[DomainBaseModel] = None

    _model: DomainBaseModel

    metadata: MetaData

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __init__(self, *args, **kwargs):
        ...

    @classmethod
    def from_domain(cls, entity: DomainBaseModel) -> "DeclarativeBase":
        if type(entity) != cls.__domain__:
            raise TypeError("Entity must have same declared model.")

        values = {
            key: value
            for key, value in entity
            if hasattr(cls, key) and value is not None
        }

        instance = cls(**values)

        instance._model = entity

        return instance

    def save_model(self) -> None:
        for key, value in self._model:
            saved_value = getattr(self, key, None)

            if saved_value != value:
                setattr(self._model, key, saved_value)
