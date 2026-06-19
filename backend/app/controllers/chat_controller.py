from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import os
import json

from app.models.chat_schema import ChatResponse
from app.services.service_yolo import detect_objects
from app.services.service_network import is_internet_available
from app.services.service_gemini import online_gemini_flow
from app.services.service_rag import offline_rag_flow, add_to_index
from app.services.service_history import save_chat

router = APIRouter()


# 🔥 NEW CHAT SESSION
@router.post("/new-chat")
def new_chat():
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    file_path = os.path.join(base_dir, "chat_history.json")

    data = []

    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)

    new_id = len(data) + 1

    data.append({
        "session_id": new_id,
        "messages": []
    })

    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

    return {"message": "New chat session created"}


# 🔥 GET HISTORY
@router.get("/history")
def get_history():
    try:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        file_path = os.path.join(base_dir, "chat_history.json")

        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                return json.load(f)

        return []

    except Exception as e:
        print("HISTORY ERROR:", e)
        return []


# 🔥 MAIN CHAT API
@router.post("/ask", response_model=ChatResponse)
def ask(
    image: Optional[UploadFile] = File(None),
    question: str = Form(...)
):
    # 🔥 YOLO DETECTION
    try:
        if image:
            objects = detect_objects(image)
        else:
            objects = []
    except Exception as e:
        print("YOLO ERROR:", e)
        objects = []

    # 🔥 HYBRID FLOW
    if is_internet_available():
        try:
            answer = online_gemini_flow(image, question, objects)
            mode = "ONLINE"
        except Exception as e:
            print("GEMINI ERROR:", e)

            # 🔥 FALLBACK TO RAG
            answer = offline_rag_flow(question, objects)
            mode = "OFFLINE"
    else:
        answer = offline_rag_flow(question, objects)
        mode = "OFFLINE"

    # 🔥 SAVE CHAT + STORE IN FAISS
    try:
        save_chat(question, answer, objects)

        try:
            add_to_index(f"Objects: {', '.join(objects)} | Q: {question} | A: {answer}")
        except Exception as e:
            print("FAISS ERROR:", e)

    except Exception as e:
        print("SAVE ERROR:", e)

    return ChatResponse(
        mode=mode,
        detected_objects=objects,
        answer=answer
    )