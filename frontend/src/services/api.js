import axios from "axios";

export const askQuestion = async (formData) => {
  // Points to your FastAPI backend
  const res = await axios.post(
    "http://localhost:8000/api/ask", 
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};