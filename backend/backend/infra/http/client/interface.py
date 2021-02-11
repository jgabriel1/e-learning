from abc import ABCMeta, abstractmethod
from typing import Type, TypeVar, Any

from pydantic import AnyHttpUrl, BaseModel

T = TypeVar("T")


class IHttpClient(metaclass=ABCMeta):
    @abstractmethod
    async def get(self, url: AnyHttpUrl, response_model: Type[T], params: dict) -> T:
        ...
