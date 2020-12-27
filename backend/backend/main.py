from fastapi import FastAPI

from .database.connection import get_database_connection
from .handlers.courses import courses_router
from .handlers.lessons import lessons_router

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


app.include_router(courses_router)
app.include_router(lessons_router)
