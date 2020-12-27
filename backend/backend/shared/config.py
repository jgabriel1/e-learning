import os

DATABASE_URL = os.getenv("DATABASE_URL", default="sqlite:///./database.db")
