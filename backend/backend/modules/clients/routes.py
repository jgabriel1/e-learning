from backend.modules.clients.services.youtube import create_course_from_youtube_playlist
from fastapi import APIRouter

clients_router = APIRouter()

clients_router.add_api_route(
    "/youtube/playlist", create_course_from_youtube_playlist, methods=["POST"]
)
