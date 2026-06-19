# import os
# import google.generativeai as genai
# from app.database.local_store import save_chat
# from app.database.faiss_index import add_to_index
# from app.utils.image_utils import read_image_from_upload # Import image utility

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# model = genai.GenerativeModel("gemini-1.5-flash")

# def online_gemini_flow(image_file, question, objects):
#     # 1. Convert UploadFile to PIL Image so Gemini can read it
#     pil_image = read_image_from_upload(image_file)

#     prompt = f"""
#     Detected objects via YOLO: {', '.join(objects)}
#     User question: {question}
    
#     Answer the question based on the image provided and the context above.
#     """

#     # 2. Pass BOTH text and image to the model
#     response = model.generate_content([prompt, pil_image])
#     answer = response.text

#     # Store locally
#     save_chat(question, answer, objects)

#     # Update FAISS RAG (Text only)
#     add_to_index(question + " " + answer)

#     return answer



import os
import google.generativeai as genai
from app.database.local_store import save_chat
from app.database.faiss_index import add_to_index
from app.utils.image_utils import read_image_from_upload

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# FIXED: Changed model version to 'latest' to avoid 404 error
model = genai.GenerativeModel("gemini-flash-latest")

def online_gemini_flow(image_file, question, objects):
    # 1. Convert UploadFile to PIL Image so Gemini can read it
    pil_image = read_image_from_upload(image_file)

    prompt = f"""
    Detected objects via YOLO: {', '.join(objects)}
    User question: {question}
    
    Answer the question based on the image provided and the context above.
    """

    # 2. Pass BOTH text and image to the model
    response = model.generate_content([prompt, pil_image])
    answer = response.text

    # Store locally
    save_chat(question, answer, objects)

    # Update FAISS RAG (Text only)
    add_to_index(question + " " + answer)

    return answer