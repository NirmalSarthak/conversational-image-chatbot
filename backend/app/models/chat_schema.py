from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    mode: str
    detected_objects: List[str]
    answer: str
