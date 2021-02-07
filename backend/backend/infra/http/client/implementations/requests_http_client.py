from typing import Type, TypeVar, NewType, Literal

from requests import Session, Response
from pydantic import AnyHttpUrl, BaseModel as PydanticModel, parse_raw_as

from backend.infra.http.client import IHttpClient

T = TypeVar("T", bound=PydanticModel)
RequestMethod = NewType(
    "RequestMethod",
    tp=Literal[
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS",
    ],
)


class RequestsHttpClient(IHttpClient):
    def __init__(self) -> None:
        self._client = Session()

    def _request(
        self,
        method: RequestMethod,
        url: AnyHttpUrl,
        params: dict,
    ) -> Response:
        response = self._client.request(url=url, method=method, params=params)

        return response

    async def get(self, url: AnyHttpUrl, response_model: Type[T], params: dict) -> T:
        response = self._request("GET", url, params)

        return parse_raw_as(response_model, response.text)
