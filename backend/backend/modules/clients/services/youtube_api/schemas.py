from typing import List

from metomi.isodatetime.parsers import DurationParser
from pydantic import BaseModel, validator

# Playlist info


class PlaylistInfoDefaultThumbnail(BaseModel):
    url: str


class PlaylistInfoThumbnails(BaseModel):
    default: PlaylistInfoDefaultThumbnail


class PlaylistInfoSnippet(BaseModel):
    title: str
    thumbnails: PlaylistInfoThumbnails
    description: str


class PlaylistInfoItem(BaseModel):
    snippet: PlaylistInfoSnippet


class PlaylistInfoResponse(BaseModel):
    items: List[PlaylistInfoItem]


class PlaylistInfo(BaseModel):
    title: str
    image_url: str
    description: str


# Playlist item


class PlaylistItemThumbnail(BaseModel):
    url: str


class PlaylistItemThumbnails(BaseModel):
    default: PlaylistItemThumbnail


class PlaylistItemSnippet(BaseModel):
    description: str
    title: str
    thumbnails: PlaylistItemThumbnails


class PlaylistItemContentDetails(BaseModel):
    videoId: str


class PlaylistItem(BaseModel):
    snippet: PlaylistItemSnippet
    contentDetails: PlaylistItemContentDetails


class PlaylistItemsPageInfo(BaseModel):
    totalResults: int
    resultsPerPage: int


class PlaylistItemsResponse(BaseModel):
    items: List[PlaylistItem]
    pageInfo: PlaylistItemsPageInfo
    nextPageToken: str = None


class PlaylistVideo(BaseModel):
    title: str
    description: str
    thumbnailUrl: str
    videoId: str
    duration: int = None


# Video


class VideoContentDetails(BaseModel):
    duration: int

    @validator("duration", pre=True, check_fields=False)
    def convert_duration_to_minutes(cls, v: str):
        duration = DurationParser().parse(v)

        return round(duration.get_seconds() / 60)


class VideosItem(BaseModel):
    contentDetails: VideoContentDetails


class VideosResponse(BaseModel):
    items: List[VideosItem]
