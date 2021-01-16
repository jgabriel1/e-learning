from backend.modules.clients.services.youtube_api import (
    create_course_from_youtube_playlist,
)
from fastapi import APIRouter

clients_router = APIRouter()

clients_router.add_api_route(
    "/playlist/youtube/{playlist_id}",
    create_course_from_youtube_playlist,
    methods=["POST"],
    status_code=201,
)
