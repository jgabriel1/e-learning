from pydantic import BaseModel


class YoutubeAPIVideoRequestParams(BaseModel):
    key: str
    id: str
    part: str = "contentDetails"
