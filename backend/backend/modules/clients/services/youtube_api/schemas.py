from typing import List

from pydantic import BaseModel


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
