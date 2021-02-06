import os
from unittest import IsolatedAsyncioTestCase

from backend.domain.model.course import Course
from backend.infra.database.connection import DatabaseConnection
from backend.infra.repository.courses_repository_db import CoursesRepositoryDB


class TestCoursesRepository(IsolatedAsyncioTestCase):
    @classmethod
    def setUpClass(cls) -> None:
        os.environ["ENV"] = "TEST"

        cls.connection = DatabaseConnection()
        cls.courses_repository = CoursesRepositoryDB(connection=cls.connection)

    def tearDown(self) -> None:
        self.connection.db.execute("DELETE FROM courses;")

    @staticmethod
    def build_course():
        return Course.parse_obj(
            {"name": "Test course", "image": "http://images.com/image.jpg"}
        )

    async def test_save(self):
        course = self.build_course()

        await self.courses_repository.save(course)

        self.assertIsNotNone(course.id)
        self.assertIsNotNone(course.created_at)

    async def test_exists_by_id(self):
        course = self.build_course()
        await self.courses_repository.save(course)

        exists = await self.courses_repository.exists_by_id(course.id)

        self.assertTrue(exists)

    async def test_exists_by_name(self):
        course = self.build_course()
        await self.courses_repository.save(course)

        exists = await self.courses_repository.exists_by_name(name=course.name)

        self.assertTrue(exists)

    async def test_find_all(self):
        courses = Course.parse_list(
            [
                {"name": f"Test course {i}", "image": "http://images.com/image.jpg"}
                for i in range(5)
            ]
        )

        for course in courses:
            await self.courses_repository.save(course)

        fetched_courses = await self.courses_repository.find_all()

        created_courses_names = {course.name for course in courses}
        fetched_courses_names = {course.name for course in fetched_courses}

        self.assertEqual(len(fetched_courses_names), len(courses))
        self.assertTrue(created_courses_names.issubset(fetched_courses_names))

    async def test_find_many_by_id(self):
        courses = [
            Course.parse_obj(
                {"name": f"Test course {i}", "image": "http://images.com/image.jpg"}
            )
            for i in range(5)
        ]

        for course in courses:
            await self.courses_repository.save(course)

        fetched_courses = await self.courses_repository.find_many_by_ids(
            [
                course.id
                for course in courses
                if course.name in {"Test course 2", "Test course 4"}
            ]
        )

        fetched_courses_names = {course.name for course in fetched_courses}

        self.assertEqual(len(fetched_courses_names), 2)
        self.assertEqual(fetched_courses_names, {"Test course 2", "Test course 4"})

    async def test_find_many_with_name_like(self):
        courses = [
            Course.parse_obj(
                {"name": f"Test course {i}", "image": "http://images.com/image.jpg"}
            )
            for i in range(5)
        ]

        for course in courses:
            await self.courses_repository.save(course)

        fetched_courses = await self.courses_repository.find_many_with_name_like(
            "test course"
        )

        for course in fetched_courses:
            self.assertIn("Test course", course.name)
