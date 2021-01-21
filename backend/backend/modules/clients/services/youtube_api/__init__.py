from backend.modules.courses.repository import CoursesRepository
from backend.modules.lessons.repository import LessonsRepository
from backend.modules.lessons.schemas import CreateNewLessonData
from fastapi import Depends

from .client import YoutubeAPIClient


async def create_course_from_youtube_playlist(
    playlist_id: str,
    youtube: YoutubeAPIClient = Depends(),
    courses_repository: CoursesRepository = Depends(),
    lessons_repository: LessonsRepository = Depends(),
):
    playlist_info = await youtube.get_playlist_info(playlist_id)

    created_course = await courses_repository.create(
        name=playlist_info.title,
        image_url=playlist_info.image_url,
    )

    videos = [
        video
        async for video in youtube.get_playlist_videos(
            playlist_id,
            page_size=10,
        )
    ]

    videos_durations = await youtube.get_videos_durations(
        video_ids=[video.videoId for video in videos]
    )

    created_lessons = await lessons_repository.create_all_for_course(
        lessons=(
            CreateNewLessonData(
                name=video.title,
                description=video.description,
                video_id=video.videoId,
                duration=duration,
                thumbnail_url=video.thumbnailUrl,
                lesson_index=index + 1,
                course_id=created_course.id,
            )
            for index, (video, duration) in enumerate(
                zip(
                    videos,
                    videos_durations,
                )
            )
        ),
        course_id=created_course.id,
    )

    return {
        "course": created_course,
        "lessons": created_lessons,
    }
