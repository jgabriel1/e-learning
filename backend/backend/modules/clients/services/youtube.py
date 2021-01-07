from backend.modules.courses.repository import CoursesRepository
from backend.modules.lessons.repository import LessonsRepository
from backend.modules.lessons.schemas import CreateNewLessonData
from fastapi import Depends
from fastapi.exceptions import HTTPException

from ..selenium_client import SeleniumClient


async def create_course_from_youtube_playlist(
    playlist_id: str,
    client: SeleniumClient = Depends(),
    courses_repository: CoursesRepository = Depends(),
    lessons_repository: LessonsRepository = Depends(),
):
    """
    TODO:
        - Need to verify this url somehow. Look for a regex later.
    """

    playlist_url = f"https://www.youtube.com/playlist?list={playlist_id}"

    try:
        client.access_page(playlist_url)
    except:
        raise HTTPException(400, "Invalid URL or playlist does not exist.")

    # Create the course:
    course_image_url: str = client.query_selector(
        "#playlist-thumbnails img"
    ).get_property("src")

    course_name: str = client.query_selector("h1#title a").get_property("innerHTML")

    new_course = await courses_repository.create(
        name=course_name,
        image_url=course_image_url,
    )

    # Create all lessons:
    lessons = []

    for lesson_element in client.query_selector_all("#contents #content"):
        video_url = (
            lesson_element.find_element_by_css_selector("a.ytd-playlist-video-renderer")
            .get_property("href")
            .split("&")[0]
        )

        image_url = lesson_element.find_element_by_css_selector("img").get_property(
            "src"
        )

        lesson_title = (
            lesson_element.find_element_by_css_selector("h3 span")
            .get_property("innerHTML")
            .replace("\n", "")
            .strip(" ")
        )

        lessons.append(
            CreateNewLessonData(
                name=lesson_title,
                duration=0,
                description="",
                video_id=video_url,
                course_id=new_course.id,
            )
        )
    else:
        client.close()

    for lesson in lessons:
        await lessons_repository.create(**lesson.dict())

    return new_course
