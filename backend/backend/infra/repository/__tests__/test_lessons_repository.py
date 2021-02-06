import os
from unittest import IsolatedAsyncioTestCase

import pytest

from backend.domain.model.lesson import Lesson
from backend.infra.database.connection import DatabaseConnection
from backend.infra.database.model import CourseModel, LessonModel
from backend.infra.repository.lessons_repository_db import LessonsRepositoryDB


class TestLessonsRepository(IsolatedAsyncioTestCase):
    @classmethod
    def setUpClass(cls) -> None:
        os.environ["ENV"] = "TEST"

        cls.connection = DatabaseConnection()
        cls.lessons_repository = LessonsRepositoryDB(connection=cls.connection)

    def setUp(self) -> None:
        course = CourseModel(name="Test course", image="http://test.com/image.jpg")
        self.connection.db.add(course)
        self.connection.db.flush()

        lessons = [
            LessonModel(
                name=f"Lesson {i}",
                duration=i * 10,
                description=f"Description for lesson {i}",
                video_id="abcd1234",
                thumbnail_url=f"http://test.com/thumbnail{i}.jpg",
                lesson_index=i + 1,
                course_id=course.id,
            )
            for i in range(10)
        ]
        self.connection.db.add_all(lessons)
        self.connection.db.flush()

        self.seed_course = course
        self.seed_lessons = lessons

        self.connection.db.commit()

    def tearDown(self) -> None:
        self.connection.db.execute("DELETE FROM lessons;")
        self.connection.db.execute("DELETE FROM courses;")

    @pytest.mark.skip("Setup test.")
    async def test_setup(self):
        self.assertIsInstance(self.seed_course, CourseModel)
        self.assertIsNotNone(self.seed_course.id)

        self.assertIsInstance(self.seed_lessons, list)
        self.assertIsInstance(self.seed_lessons[0], LessonModel)
        self.assertIsNotNone(self.seed_lessons[0].id)

    async def test_save(self):
        lesson = Lesson.parse_obj(
            {
                "name": "Test lesson",
                "duration": 10,
                "description": "Description for lesson.",
                "video_id": "1234",
                "thumbnail_url": "http://test.com/thumbnail.jpg",
                "lesson_index": 100,
                "course_id": self.seed_course.id,
            }
        )

        await self.lessons_repository.save(lesson)

        self.assertIsNotNone(lesson.id)
        self.assertIsNotNone(lesson.created_at)

    async def test_save_many(self):
        lessons = Lesson.parse_list(
            [
                {
                    "name": f"Lesson {i}",
                    "duration": i * 10,
                    "description": f"Description for lesson {i}",
                    "video_id": "abcd1234",
                    "thumbnail_url": f"http://test.com/thumbnail{i}.jpg",
                    "lesson_index": i + 1,
                }
                for i in range(11, 20)
            ]
        )

        await self.lessons_repository.save_many(self.seed_course.id, lessons)

        self.assertIsNotNone(lessons[0].id)

    async def test_count_for_all_courses(self):
        counts = await self.lessons_repository.count_for_all_courses()

        self.assertEqual(
            len(self.seed_lessons),
            counts.get(self.seed_course.id),
        )

    async def test_count_for_courses(self):
        counts = await self.lessons_repository.count_for_courses([self.seed_course.id])

        self.assertEqual(
            len(self.seed_lessons),
            counts.get(self.seed_course.id),
        )

    async def test_find_one_by_id(self):
        lesson = await self.lessons_repository.find_one_by_id(
            lesson_id=self.seed_lessons[0].id
        )

        self.assertIsNotNone(lesson)
        self.assertEqual(lesson.name, self.seed_lessons[0].name)
        self.assertEqual(lesson.description, self.seed_lessons[0].description)

    async def test_find_all_for_course(self):
        lessons = await self.lessons_repository.find_all_for_course(self.seed_course.id)

        self.assertEqual(len(lessons), len(self.seed_lessons))
