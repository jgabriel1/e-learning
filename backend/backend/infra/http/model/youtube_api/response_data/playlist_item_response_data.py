from typing import List

from pydantic import BaseModel, AnyHttpUrl


class _Thumbnail(BaseModel):
    url: AnyHttpUrl


class _Thumbnails(BaseModel):
    standard: _Thumbnail


class _Snippet(BaseModel):
    description: str
    title: str
    thumbnails: _Thumbnails


class _ContentDetails(BaseModel):
    videoId: str


class _Item(BaseModel):
    snippet: _Snippet
    contentDetails: _ContentDetails


class _PageInfo(BaseModel):
    totalResults: int
    resultsPerPage: int


class YoutubeAPIPlaylistItemResponseData(BaseModel):
    items: List[_Item]
    pageInfo: _PageInfo
    nextPageToken: str = None
