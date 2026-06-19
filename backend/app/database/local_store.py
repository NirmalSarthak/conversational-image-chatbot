import json
import os

DB_FILE = "chat_history.json"

def save_chat(question, answer, objects):
    data = []

    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            data = json.load(f)

    data.append({
        "question": question,
        "answer": answer,
        "objects": objects
    })

    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=2)
