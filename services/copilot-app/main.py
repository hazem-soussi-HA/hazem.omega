from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import os
import json

app = FastAPI(title="AI Copilot")

# Store active connections
connected_clients = set()

@app.get("/")
async def get():
    return HTMLResponse("""
    <html>
    <head><title>AI Copilot</title></head>
    <body style="font-family: monospace; background: #0a0a0f; color: #e4e4e7; padding: 40px;">
        <h1 style="color: #06b6d4;">AI Copilot</h1>
        <p>WebSocket endpoint: ws://localhost:8000/ws</p>
        <p>API endpoint: http://localhost:8000/api/chat</p>
    </body>
    </html>
    """)

@app.get("/api/chat")
async def chat(message: str):
    backend = os.getenv("LLM_BACKEND", "ollama")
    
    if backend == "ollama":
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "http://localhost:11434/api/generate",
                json={"model": "phi3:mini", "prompt": message, "stream": False},
                timeout=30.0
            )
            return {"response": resp.json().get("response", "Error")}
    
    return {"response": "Configure LLM_BACKEND or start Ollama"}

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    connected_clients.add(ws)
    try:
        while True:
            data = await ws.receive_text()
            message = json.loads(data)
            
            backend = os.getenv("LLM_BACKEND", "ollama")
            response_text = ""
            
            if backend == "ollama":
                async with httpx.AsyncClient() as client:
                    async with client.stream(
                        "POST",
                        "http://localhost:11434/api/generate",
                        json={"model": "phi3:mini", "prompt": message.get("message", ""), "stream": True},
                        timeout=60.0
                    ) as resp:
                        async for chunk in resp.aiter_bytes():
                            token = chunk.decode("utf-8")
                            response_text += token
                            await ws.send_text(json.dumps({"token": token}))
            
            await ws.send_text(json.dumps({"done": True, "response": response_text}))
    except WebSocketDisconnect:
        connected_clients.discard(ws)

@app.get("/health")
async def health():
    return {"status": "ok", "backend": os.getenv("LLM_BACKEND", "ollama")}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
