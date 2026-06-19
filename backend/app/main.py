import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import json

# 🔥 Load environment variables
load_dotenv()

# 🔥 Import your chat router
from app.controllers.chat_controller import router as chat_router

# 🔥 Initialize FastAPI app
app = FastAPI(
    title="Conversational Image Recognition Chatbot",
    description="AI chatbot using YOLO + Gemini + FAISS",
    version="1.0.0"
)

#  CORS Middleware (VERY IMPORTANT for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Register API routes
app.include_router(chat_router, prefix="/api", tags=["Chat"])

# 🔥 Chat history file
DB_FILE = "chat_history.json"

# ✅ GET HISTORY API (VERY IMPORTANT)
@app.get("/history")
def get_history():
    if not os.path.exists(DB_FILE):
        return []

    try:
        with open(DB_FILE, "r") as f:
            return json.load(f)
    except:
        return []

# ✅ ROOT API
@app.get("/")
def read_root():
    return {
        "message": "Server is running 🚀",
        "routes": {
            "chat": "/api/ask",
            "history": "/history"
        }
    }

# 🔥 RUN SERVER
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)