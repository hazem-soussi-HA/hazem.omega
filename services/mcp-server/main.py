from fastapi import FastAPI
from fastapi.responses import JSONResponse
import math
import re
import os
import httpx

app = FastAPI(title="MCP Server")

@app.post("/calculator")
async def calculator(expression: dict):
    expr = expression.get("expression", "")
    # Safe math evaluation
    allowed = re.compile(r'^[0-9+\-*/().%\s]+$')
    if not allowed.match(expr):
        return JSONResponse({"error": "Invalid expression"}, status_code=400)
    try:
        result = eval(expr, {"__builtins__": {}}, {})
        return {"result": result, "expression": expr}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

@app.post("/text_processor")
async def text_processor(data: dict):
    text = data.get("text", "")
    operation = data.get("operation", "upper")
    
    operations = {
        "upper": text.upper(),
        "lower": text.lower(),
        "count_words": len(text.split()),
        "count_chars": len(text),
        "reverse": text[::-1],
        "summary": text[:100] + "..." if len(text) > 100 else text,
    }
    
    return {"result": operations.get(operation, text)}

@app.get("/weather")
async def weather(location: str = "Paris"):
    # Mock weather data
    return {
        "location": location,
        "temperature": 22,
        "condition": "Partly Cloudy",
        "humidity": 65,
        "wind": 12,
    }

@app.get("/health")
async def health():
    return {"status": "ok", "tools": ["calculator", "text_processor", "weather"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
