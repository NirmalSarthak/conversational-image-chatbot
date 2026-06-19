# import faiss
# import numpy as np
# from sentence_transformers import SentenceTransformer
# import os
# import pickle

# MODEL = SentenceTransformer("all-MiniLM-L6-v2")
# DIM = 384

# INDEX_FILE = "faiss.index"
# DATA_FILE = "faiss_texts.pkl"

# index = faiss.IndexFlatL2(DIM)
# texts = []

# # Load existing data
# if os.path.exists(INDEX_FILE):
#     index = faiss.read_index(INDEX_FILE)
#     with open(DATA_FILE, "rb") as f:
#         texts = pickle.load(f)

# def add_to_index(text):
#     embedding = MODEL.encode([text])
#     index.add(np.array(embedding).astype("float32"))
#     texts.append(text)

#     faiss.write_index(index, INDEX_FILE)
#     with open(DATA_FILE, "wb") as f:
#         pickle.dump(texts, f)

# def search_similar(query, k=1):
#     if index.ntotal == 0:
#         return None

#     q_emb = MODEL.encode([query])
#     distances, indices = index.search(
#         np.array(q_emb).astype("float32"), k
#     )

#     return texts[indices[0][0]]



import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import os
import pickle

# 🔥 GLOBALS
MODEL = None
DIM = 384

INDEX_FILE = "faiss.index"
DATA_FILE = "faiss_texts.pkl"

index = None
texts = []


# 🔥 LOAD MODEL SAFELY
def load_model():
    global MODEL
    if MODEL is None:
        try:
            MODEL = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception as e:
            print("MODEL LOAD ERROR:", e)
            MODEL = None


# 🔥 LOAD INDEX + TEXTS SAFELY
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


# 🔥 ADD TO INDEX
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


# 🔥 SEARCH
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