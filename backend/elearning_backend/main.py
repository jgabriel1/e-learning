from elearning_backend.database.connection import get_database_connection
from fastapi import FastAPI


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
async def main():
    return {"hello": "world"}
