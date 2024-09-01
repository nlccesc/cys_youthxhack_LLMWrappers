# app/main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
from app.api.websocket import router as websocket_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

# API & websocket routers
app.include_router(api_router, prefix="/api")
app.include_router(websocket_router, prefix="/ws")

@app.get("/")
def read_root():
    return {"message": "Testing this API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0,0,0,0", port=8000, reload=True)