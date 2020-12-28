import uvicorn


def dev():
    uvicorn.run(
        app="backend.main:app",
        reload=True,
    )
