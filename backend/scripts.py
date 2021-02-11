import os

import uvicorn


def dev():
    os.environ["ENV"] = "DEV"

    uvicorn.run(
        app="backend.application.app:app",
        reload=True,
    )


def prod():
    os.environ["ENV"] = "PROD"

    uvicorn.run(
        app="backend.application.app:app",
    )
