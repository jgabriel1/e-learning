from typing import Mapping, Any


class BaseDTO:
    def dict(self) -> Mapping[str, Any]:
        return self.__dict__
