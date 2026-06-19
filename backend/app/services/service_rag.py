import os
os.environ["TRANSFORMERS_OFFLINE"] = "1"

from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

# 🔥 GLOBALS
MODEL = None
index = None
texts = []

DIM = 384
INDEX_FILE = "faiss.index"
DATA_FILE = "faiss_texts.pkl"


# 🔥 LOAD MODEL SAFELY
def load_model():
    global MODEL
    if MODEL is None:
        try:
            MODEL = SentenceTransformer(
                "all-MiniLM-L6-v2",
                local_files_only=True
            )
        except Exception as e:
            print("MODEL LOAD ERROR:", e)
            MODEL = None


# 🔥 LOAD INDEX + TEXTS
def load_index():
    global index, texts

    if os.path.exists(INDEX_FILE):
        index = faiss.read_index(INDEX_FILE)
    else:
        index = faiss.IndexFlatL2(DIM)

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "rb") as f:
            texts = pickle.load(f)
    else:
        texts = []


# 🔥 ADD TO INDEX (used by controller)
def add_to_index(text):
    try:
        load_model()
        load_index()

        if MODEL is None:
            return

        embedding = MODEL.encode([text])
        index.add(np.array(embedding).astype("float32"))
        texts.append(text)

        faiss.write_index(index, INDEX_FILE)

        with open(DATA_FILE, "wb") as f:
            pickle.dump(texts, f)

    except Exception as e:
        print("ADD ERROR:", e)


# 🔥 SEARCH SIMILAR
def search_similar(query, k=1):
    try:
        load_model()
        load_index()

        if MODEL is None or index.ntotal == 0:
            return None

        q_emb = MODEL.encode([query])
        distances, indices = index.search(
            np.array(q_emb).astype("float32"), k
        )

        idx = indices[0][0]

        if idx == -1 or idx >= len(texts):
            return None

        return texts[idx]

    except Exception as e:
        print("SEARCH ERROR:", e)
        return None


# 🔥 SIMPLE REPHRASER (to avoid copy-paste answers)
def rephrase_answer(text):
    try:
        # basic transformation
        text = text.replace("Q:", "").replace("A:", "")
        text = text.replace("Objects:", "")
        return "From what I remember:\n\n" + text.strip()
    except:
        return text


# 🔥 OFFLINE RAG FLOW
def offline_rag_flow(question, objects):
    try:
        # 🔥 IMPORTANT: include objects for better match
        query = question + " " + " ".join(objects)

        similar = search_similar(query)

        # 🔥 CASE 1: Similar knowledge found
        if similar:
            return rephrase_answer(similar)

        # 🔥 CASE 2: Object-based reasoning (better + natural)
        if objects:
            obj_text = ", ".join(objects)

            return (
                f"It looks like the image contains: {obj_text}.\n\n"
                f"From the visual cues, {obj_text} seems to be the main focus here. "
                "Even without internet access, I can still interpret the detected elements and give a general idea.\n\n"
                f"Typically, {obj_text} can be associated with common real-world usage or characteristics depending on context. "
                "However, for more detailed or specific insights, online mode would provide richer information."
            )

        # 🔥 CASE 3: No data
        return (
            "I'm currently operating without internet access and couldn't find relevant stored knowledge for this query."
        )

    except Exception as e:
        print("RAG ERROR:", e)
        return "Offline system encountered an issue but is still running."