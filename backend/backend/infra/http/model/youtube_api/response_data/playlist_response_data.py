from typing import List

from pydantic import BaseModel, AnyHttpUrl


class _Thumbnail(BaseModel):
    url: AnyHttpUrl


class _Thumbnails(BaseModel):
    standard: _Thumbnail


class _Snippet(BaseModel):
    title: str
    thumbnails: _Thumbnails
    description: str


class _Item(BaseModel):
    snippet: _Snippet


class YoutubeAPIPlaylistResponseData(BaseModel):
    items: List[_Item]
