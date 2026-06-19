from pydantic import BaseModel
from typing import List

class EmbeddingRecord(BaseModel):
    text: str
    embedding: List[float]
