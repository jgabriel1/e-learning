import uvicorn


def dev():
    uvicorn.run(
        app="elearning_backend.main:app",
        reload=True,
    )
