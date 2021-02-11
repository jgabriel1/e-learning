import uvicorn


def dev():
    uvicorn.run(
        app="backend.application.app:app",
        reload=True,
    )
