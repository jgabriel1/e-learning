from backend.infra.http.client import IHttpClient
from backend.infra.http.client.implementations.requests_http_client import (
    RequestsHttpClient,
)


async def http_client_factory() -> IHttpClient:
    client = RequestsHttpClient()

    return client
