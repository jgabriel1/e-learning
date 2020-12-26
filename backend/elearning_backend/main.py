from fastapi.param_functions import Depends
from elearning_backend.database.connection import get_database_connection
from fastapi import FastAPI
from elearning_backend.database.repositories.courses import CoursesRepository


app = FastAPI()


@app.on_event("startup")
async def startup():
    database = get_database_connection()

    database.create_tables()
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    database = get_database_connection()
    await database.disconnect()


@app.get("/")
async def create_course(
    courses_repository: CoursesRepository = Depends(),
):
    # course = await courses_repository.create(
    #     name="test",
    #     image_url="http://test.com?image=123123",
    # )

    # return course

    # await courses_repository.findAll()

    await courses_repository.update_by_id(10, name="testimage", image="test")
