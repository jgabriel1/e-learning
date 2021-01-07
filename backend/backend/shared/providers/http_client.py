from typing import Dict, Type, TypeVar

from pydantic import AnyUrl, BaseModel
from requests import Response, Session

T = TypeVar("T", bound=BaseModel)


class Test(BaseModel):
    test: str


class HTTPClient:
    def __init__(self) -> None:
        self.client = Session()

    async def _request(self, method: str, url: AnyUrl, params: Dict) -> Response:
        return self.client.request(url=url, method=method, params=params)

    async def GET(
        self,
        url: AnyUrl,
        ExpectedResponseSchema: Type[T],
        params: Dict,
    ) -> T:
        response = await self._request("GET", url, params)

        return ExpectedResponseSchema.parse_raw(response.text)


client = HTTPClient()


async def get_http_client() -> HTTPClient:
    return client
