from fastapi import APIRouter, Depends

from backend.application.container import container
from backend.application.model.youtube_client import (
    CreateCourseFromYoutubePlaylistResponseData,
)
from backend.domain.use_case.youtube_playlist_use_case import YoutubePlaylistUseCase

youtube_client_router = APIRouter()


@youtube_client_router.post("/playlist/youtube/{playlist_id}")
async def _(
    playlist_id: str,
    use_case: YoutubePlaylistUseCase = Depends(container.get_youtube_playlist_use_case),
):
    response = await use_case.create_course_from_youtube_playlist(
        playlist_id=playlist_id
    )

    return CreateCourseFromYoutubePlaylistResponseData.parse_obj(response)
