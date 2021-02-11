import os
from unittest import IsolatedAsyncioTestCase

from dotenv import load_dotenv

from backend.infra.http.client import http_client_factory
from backend.infra.http.model.youtube_api import (
    YoutubeAPIVideoResponseData,
    YoutubeAPIVideoRequestParams,
    YoutubeAPIPlaylistResponseData,
    YoutubeAPIPlaylistRequestParams,
    YoutubeAPIPlaylistItemResponseData,
    YoutubeAPIPlaylistItemRequestParams,
)


class TestYoutubeAPIResponseModels(IsolatedAsyncioTestCase):
    async def asyncSetUp(self) -> None:
        load_dotenv()

        self.client = await http_client_factory()

        self.KEY = os.getenv("YOUTUBE_API_KEY")

        self.PLAYLIST_URL = os.getenv("YOUTUBE_API_PLAYLIST_URL")
        self.PLAYLIST_ITEM_URL = os.getenv("YOUTUBE_API_PLAYLIST_ITEM_URL")
        self.VIDEOS_URL = os.getenv("YOUTUBE_API_VIDEOS_URL")

        self.TEST_PLAYLIST_ID = "PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6"

    async def test_playlist_response(self):
        data = await self.client.get(
            url=self.PLAYLIST_URL,  # noqa
            response_model=YoutubeAPIPlaylistResponseData,
            params=YoutubeAPIPlaylistRequestParams(
                key=self.KEY,
                id=self.TEST_PLAYLIST_ID,
            ).dict(),
        )

        self.assertIsInstance(data, YoutubeAPIPlaylistResponseData)

    async def test_playlist_item_response(self):
        data = await self.client.get(
            url=self.PLAYLIST_ITEM_URL,  # noqa
            response_model=YoutubeAPIPlaylistItemResponseData,
            params=YoutubeAPIPlaylistItemRequestParams(
                key=self.KEY,
                playlistId=self.TEST_PLAYLIST_ID,
            ).dict(exclude={"pageToken"}),
        )

        self.assertIsInstance(data, YoutubeAPIPlaylistItemResponseData)

    async def test_playlist_item_response_with_next_page_token(self):
        first_response: YoutubeAPIPlaylistItemResponseData = await self.client.get(
            url=self.PLAYLIST_ITEM_URL,  # noqa
            response_model=YoutubeAPIPlaylistItemResponseData,
            params=YoutubeAPIPlaylistItemRequestParams(
                key=self.KEY,
                playlistId=self.TEST_PLAYLIST_ID,
            ).dict(exclude={"pageToken"}),
        )

        second_response = await self.client.get(
            url=self.PLAYLIST_ITEM_URL,  # noqa
            response_model=YoutubeAPIPlaylistItemResponseData,
            params=YoutubeAPIPlaylistItemRequestParams(
                key=self.KEY,
                playlistId=self.TEST_PLAYLIST_ID,
                pageToken=first_response.nextPageToken,
            ).dict(),
        )

        self.assertIsInstance(second_response, YoutubeAPIPlaylistItemResponseData)

    async def test_videos_response(self):
        playlist_items_response: YoutubeAPIPlaylistItemResponseData = (
            await self.client.get(
                url=self.PLAYLIST_ITEM_URL,  # noqa
                response_model=YoutubeAPIPlaylistItemResponseData,
                params=YoutubeAPIPlaylistItemRequestParams(
                    key=self.KEY,
                    playlistId=self.TEST_PLAYLIST_ID,
                ).dict(exclude={"pageToken"}),
            )
        )

        data = await self.client.get(
            url=self.VIDEOS_URL,  # noqa
            response_model=YoutubeAPIVideoResponseData,
            params=YoutubeAPIVideoRequestParams(
                key=self.KEY,
                id=",".join(
                    item.contentDetails.videoId
                    for item in playlist_items_response.items
                ),
            ).dict(exclude={"pageToken"}),
        )

        self.assertIsInstance(data, YoutubeAPIVideoResponseData)
