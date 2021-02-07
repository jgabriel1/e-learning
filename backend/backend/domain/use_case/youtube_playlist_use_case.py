from typing import List

from backend.domain.model.course import Course
from backend.domain.model.lesson import Lesson
from backend.domain.model.youtube_video import YoutubeVideo
from backend.domain.repository.courses_repository import ICoursesRepository
from backend.domain.repository.lessons_repository import ILessonsRepository
from backend.domain.repository.youtube_playlist_repository import (
    IYoutubePlaylistRepository,
)


class YoutubePlaylistUseCase:
    def __init__(
        self,
        lessons_repository: ILessonsRepository,
        courses_repository: ICoursesRepository,
        youtube_playlist_repository: IYoutubePlaylistRepository,
    ) -> None:
        self._lessons_repository = lessons_repository
        self._courses_repository = courses_repository
        self._youtube_playlist_repository = youtube_playlist_repository

    async def create_course_from_youtube_playlist(self, playlist_id: str):
        playlist_info = await self._youtube_playlist_repository.get_playlist_info(
            playlist_id
        )

        created_course = Course(
            name=playlist_info.title,
            image=playlist_info.thumbnail_url,
        )

        await self._courses_repository.save(created_course)

        videos: List[YoutubeVideo] = [
            video
            async for video in self._youtube_playlist_repository.get_playlist_videos(  # noqa
                playlist_id
            )
        ]

        videos_durations = await self._youtube_playlist_repository.get_videos_durations(
            video_ids=[video.video_id for video in videos]
        )

        created_lessons = [
            Lesson(
                name=video.title,
                description=video.description,
                video_id=video.video_id,
                duration=videos_durations.get(video.video_id) or 0,
                thumbnail_url=video.thumbnail_url,
                lesson_index=index + 1,
                course_id=created_course.id,
            )
            for index, video in enumerate(videos)
        ]

        await self._lessons_repository.save_many(created_lessons)

        return {
            "course": created_course,
            "lessons": created_lessons,
        }
