from sqlalchemy.ext.declarative import as_declarative
from sqlalchemy import Column, DateTime, Integer, func


@as_declarative()
class DeclarativeBase:
    id = Column(Integer, primary_key=True, autoincrement=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())