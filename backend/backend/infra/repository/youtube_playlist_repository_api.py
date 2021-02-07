import math
import os
from typing import Iterable, AsyncIterable, Mapping

from dotenv import load_dotenv

from backend.domain.model.youtube_playlist import YoutubePlaylist
from backend.domain.model.youtube_video import YoutubeVideo
from backend.domain.repository.youtube_playlist_repository import (
    IYoutubePlaylistRepository,
)
from backend.infra.http.client import IHttpClient
from backend.infra.http.model.youtube_api import (
    YoutubeAPIPlaylistResponseData,
    YoutubeAPIPlaylistRequestParams,
    YoutubeAPIPlaylistItemResponseData,
    YoutubeAPIPlaylistItemRequestParams,
    YoutubeAPIVideoResponseData,
    YoutubeAPIVideoRequestParams,
)


class YoutubePlaylistRepositoryAPI(IYoutubePlaylistRepository):
    def __init__(self, client: IHttpClient):
        load_dotenv()

        self.KEY = os.getenv("YOUTUBE_API_KEY")
        self.PLAYLIST_URL = os.getenv("YOUTUBE_API_PLAYLIST_URL")
        self.PLAYLIST_ITEM_URL = os.getenv("YOUTUBE_API_PLAYLIST_ITEM_URL")
        self.VIDEOS_URL = os.getenv("YOUTUBE_API_VIDEOS_URL")

        self._client = client

    async def get_playlist_info(self, playlist_id: str) -> YoutubePlaylist:
        response: YoutubeAPIPlaylistResponseData = await self._client.get(
            url=self.PLAYLIST_URL,  # noqa
            response_model=YoutubeAPIPlaylistResponseData,
            params=YoutubeAPIPlaylistRequestParams(
                key=self.KEY,
                id=playlist_id,
            ).dict(),
        )

        (playlist_info,) = response.items

        return YoutubePlaylist(
            title=playlist_info.snippet.title,
            thumbnail_url=playlist_info.snippet.thumbnails.standard.url,
            description=playlist_info.snippet.description,
        )

    async def get_playlist_videos(
        self, playlist_id: str, page_size: int = 10
    ) -> AsyncIterable[YoutubeVideo]:
        response = await self._client.get(
            url=self.PLAYLIST_ITEM_URL,  # noqa
            response_model=YoutubeAPIPlaylistItemResponseData,
            params=YoutubeAPIPlaylistItemRequestParams(
                key=self.KEY,
                playlistId=playlist_id,
                resultsPerPage=page_size,
            ).dict(exclude={"pageToken"}),
        )

        total_videos = response.pageInfo.totalResults
        results_per_page = response.pageInfo.resultsPerPage

        total_pages = math.ceil(total_videos / results_per_page)

        current_page = 0
        while True:
            if current_page >= total_pages:
                break

            for item in response.items:
                yield YoutubeVideo(
                    title=item.snippet.title,
                    description=item.snippet.description,
                    thumbnail_url=item.snippet.thumbnails.standard.url,
                    video_id=item.contentDetails.videoId,
                )

            next_page_token = response.nextPageToken

            response = await self._client.get(
                url=self.PLAYLIST_ITEM_URL,  # noqa
                response_model=YoutubeAPIPlaylistItemResponseData,
                params=YoutubeAPIPlaylistItemRequestParams(
                    key=self.KEY,
                    playlistId=playlist_id,
                    pageToken=next_page_token,
                    resultsPerPage=page_size,
                ).dict(),
            )

            current_page += 1

    async def get_videos_durations(self, video_ids: Iterable[str]) -> Mapping[str, int]:
        response = await self._client.get(
            url=self.VIDEOS_URL,  # noqa
            response_model=YoutubeAPIVideoResponseData,
            params=YoutubeAPIVideoRequestParams(
                key=self.KEY,
                id=",".join(video_ids),
            ).dict(),
        )

        return dict(
            zip(
                video_ids,
                (item.contentDetails.duration for item in response.items),
            )
        )
