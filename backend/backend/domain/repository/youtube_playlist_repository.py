from abc import ABCMeta, abstractmethod
from typing import AsyncIterable, List, Iterable

from backend.domain.model.youtube_playlist import YoutubePlaylist
from backend.domain.model.youtube_video import YoutubeVideo


class IYoutubePlaylistRepository(metaclass=ABCMeta):
    @abstractmethod
    async def get_playlist_info(self, playlist_id: str) -> YoutubePlaylist:
        ...

    @abstractmethod
    async def get_playlist_videos(
        self, playlist_id: str, page_size: int = 10
    ) -> AsyncIterable[YoutubeVideo]:
        ...

    @abstractmethod
    async def get_videos_durations(self, video_ids: Iterable[str]) -> List[int]:
        ...
