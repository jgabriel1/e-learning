from backend.domain.model.base import Base


class YoutubeVideo(Base):
    title: str
    description: str
    thumbnail_url: str
    video_id: str
    duration: int = None
