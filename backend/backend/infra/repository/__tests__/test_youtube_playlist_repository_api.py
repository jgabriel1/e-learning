from unittest import IsolatedAsyncioTestCase

from backend.domain.model.youtube_playlist import YoutubePlaylist
from backend.domain.model.youtube_video import YoutubeVideo
from backend.infra.http.client import http_client_factory
from backend.infra.repository.youtube_playlist_repository_api import (
    YoutubePlaylistRepositoryAPI,
)


class TestYoutubePlaylistRepositoryAPI(IsolatedAsyncioTestCase):
    async def asyncSetUp(self) -> None:
        client = await http_client_factory()

        self.youtube_playlist_repository = YoutubePlaylistRepositoryAPI(client=client)

        self.TEST_PLAYLIST_ID = "PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA"  # noqa

    async def test_get_playlist_info(self):
        playlist_info = await self.youtube_playlist_repository.get_playlist_info(
            playlist_id=self.TEST_PLAYLIST_ID,
        )

        self.assertIsInstance(playlist_info, YoutubePlaylist)

    async def test_get_playlist_videos(self):
        playlist_videos = [
            video
            async for video in self.youtube_playlist_repository.get_playlist_videos(
                playlist_id=self.TEST_PLAYLIST_ID,
                page_size=20,
            )
        ]

        self.assertIsInstance(playlist_videos, list)
        self.assertIsInstance(playlist_videos[0], YoutubeVideo)

    async def test_get_videos_durations(self):
        playlist_videos = [
            video
            async for video in self.youtube_playlist_repository.get_playlist_videos(
                playlist_id=self.TEST_PLAYLIST_ID,
                page_size=20,
            )
        ]

        video_ids = {video.video_id for video in playlist_videos}

        playlist_durations = (
            await self.youtube_playlist_repository.get_videos_durations(
                video_ids=video_ids,
            )
        )

        self.assertIsInstance(playlist_durations, dict)

        for key, value in playlist_durations.items():
            self.assertIsInstance(key, str)
            self.assertIsInstance(value, int)

        self.assertSetEqual(video_ids, set(playlist_durations.keys()))
