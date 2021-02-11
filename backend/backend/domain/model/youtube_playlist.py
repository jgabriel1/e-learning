from backend.domain.model.base import Base
from pydantic import AnyHttpUrl


class YoutubePlaylist(Base):
    title: str
    thumbnail_url: AnyHttpUrl
    description: str
