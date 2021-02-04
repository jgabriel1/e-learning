from sqlalchemy import Column, DateTime, Integer, func, MetaData
from sqlalchemy.ext.declarative import as_declarative

from backend.domain.exception import DomainValidationError


@as_declarative(metadata=MetaData())
class DeclarativeBase:
    metadata: MetaData

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __new__(cls, *args, **kwargs):
        if hasattr(cls, "__domain__"):
            cls.__domain__(*args, **kwargs)
        else:
            raise DomainValidationError("Must have a model to validate in __domain__.")

        return super().__new__(cls)
