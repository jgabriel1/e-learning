from pydantic import BaseModel


class YoutubeAPIPlaylistRequestParams(BaseModel):
    key: str
    id: str
    part: str = "snippet"
