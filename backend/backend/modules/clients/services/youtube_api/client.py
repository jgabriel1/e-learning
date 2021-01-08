import math
from typing import AsyncIterable, List

from backend.shared.config import YOUTUBE_API_KEY
from backend.shared.providers.http_client import HTTPClient, get_http_client
from fastapi.param_functions import Depends

from .schemas import PlaylistItemsResponse, PlaylistVideo, VideosResponse


class YoutubeAPIClient:
    YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3/"

    def __init__(self, client: HTTPClient = Depends(get_http_client)) -> None:
        self.client = client

    async def get_playlist_videos(
        self,
        playlist_id: str,
        page_size: int = 5,
    ) -> AsyncIterable[PlaylistVideo]:
        """
        Grabs all videos for a given playlist id using the /playlistItems endpoint of
        the YouTube API.
        """
        PLAYLIST_ITEMS_URL = f"{self.YOUTUBE_API_BASE_URL}playlistItems"

        response = await self.client.GET(
            PLAYLIST_ITEMS_URL,
            PlaylistItemsResponse,
            params={
                "key": YOUTUBE_API_KEY,
                "playlistId": playlist_id,
                "part": "snippet,contentDetails",
                "resultsPerPage": page_size,
            },
        )

        total_videos = response.pageInfo.totalResults
        results_per_page = response.pageInfo.resultsPerPage

        total_pages = math.ceil(total_videos / results_per_page)

        current_page = 0
        while True:
            if current_page >= total_pages:
                break

            for item in response.items:
                yield PlaylistVideo(
                    title=item.snippet.title,
                    description=item.snippet.description,
                    thumbnailUrl=item.snippet.thumbnails.default.url,
                    videoId=item.contentDetails.videoId,
                )

            next_page_token = response.nextPageToken

            response = await self.client.GET(
                PLAYLIST_ITEMS_URL,
                PlaylistItemsResponse,
                params={
                    "key": YOUTUBE_API_KEY,
                    "playlistId": playlist_id,
                    "part": "snippet,contentDetails",
                    "resultsPerPage": page_size,
                    "pageToken": next_page_token,
                },
            )

            current_page += 1

    async def get_videos_durations(self, videos: List[PlaylistVideo]) -> None:
        """
        Sets duration for each playlist object by requesting it from the videos
        endpoint for the YouTube API.

        TODO:
            - Work on pagination. This version will probably break if there are more
            than 50 videos in the playlist.
        """
        VIDEOS_URL = f"{self.YOUTUBE_API_BASE_URL}videos"

        response = await self.client.GET(
            VIDEOS_URL,
            VideosResponse,
            params={
                "key": YOUTUBE_API_KEY,
                "id": ",".join(video.videoId for video in videos),
                "part": "contentDetails",
            },
        )

        for video, item in zip(videos, response.items):
            video.duration = item.contentDetails.duration
