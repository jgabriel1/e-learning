from pydantic import BaseModel


class YoutubeAPIPlaylistItemRequestParams(BaseModel):
    key: str
    playlistId: str
    part: str = "snippet,contentDetails"
    resultsPerPage: int = 10
    pageToken: str = None
