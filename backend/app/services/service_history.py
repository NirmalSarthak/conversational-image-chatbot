import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DB_FILE = os.path.join(BASE_DIR, "chat_history.json")

def save_chat(question, answer, objects):
    data = []

    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            data = json.load(f)

    # 🔥 If no session → create first one
    if len(data) == 0:
        data.append({
            "session_id": 1,
            "messages": []
        })

    # 🔥 Always add to LAST session
    data[-1]["messages"].append({
        "question": question,
        "answer": answer,
        "objects": objects
    })

    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=2)