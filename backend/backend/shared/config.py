import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", default="sqlite:///./database.db")

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
