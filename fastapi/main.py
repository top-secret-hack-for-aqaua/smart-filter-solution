from fastapi_offline import FastAPIOffline as FastAPIOffline
import uvicorn
from src.auth.routers import router as router_auth
from src.video.routers import router as router_video
# from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware


app = FastAPIOffline()
app.include_router(router_auth)
app.include_router(router_video)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# uvicorn.run(app, host="0.0.0.0", port=8000)