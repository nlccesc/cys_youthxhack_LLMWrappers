# app/api/websocket.py

from fastapi import APIRouter, WebSocket

router = APIRouter()

@router.websocket("/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Alert: {data}")