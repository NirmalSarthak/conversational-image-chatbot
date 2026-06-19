import { useState, useRef, useEffect } from "react";
import { askQuestion } from "../services/api";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [history, setHistory] = useState([]);

  const chatRef = useRef(null);



  useEffect(() => {
  return () => {
    // 🔥 Save chat before leaving page
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  };
}, [messages]);

  // 🔥 Load current chat (prevents disappearing)
  useEffect(() => {
  try {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  } catch (err) {
    console.error("Error loading chat:", err);
  }
}, []);
  const loadHistory = () => {
  fetch("http://127.0.0.1:8000/api/history")
    .then((res) => res.json())
    .then((data) => {
      console.log("Updated history:", data);
      setHistory(data.reverse()); 
    })
    .catch((err) => console.error(err));
};

useEffect(() => {
  loadHistory();
}, []);
  // 🔥 Save chat automatically
  useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }
}, [messages]);
  // Auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Submit
  const submit = async () => {
    if (!question) {
      alert("Ask a question");
      return;
    }

    if (!image && messages.length === 0) {
      alert("Upload image first");
      return;
    }

    const userMessage = {
      type: "user",
      text: question,
      image: preview,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const formData = new FormData();

      // 🔥 Only send image first time
      if (image) {
        formData.append("image", image);
      }

      formData.append("question", question);

      const res = await askQuestion(formData);

      const botMessage = {
        type: "bot",
        text: res.answer,
        objects: res.detected_objects,
        mode: res.mode,
      };

      setMessages((prev) => [...prev, botMessage]);
      loadHistory(); 
    } catch (err) {
      console.error(err);
      alert("Error connecting backend");
    } finally {
  setLoading(false);
  setQuestion("");
  setPreview(null);
}
  };

// 🔥 New Chat
const newChat = async () => {
  try {
    await fetch("http://127.0.0.1:8000/api/new-chat", {
      method: "POST",
    });
  } catch (err) {
    console.error(err);
  }

  setMessages([]);
  setImage(null);
  setPreview(null);

  localStorage.removeItem("chatMessages");
};
  // Remove image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="main-layout">

      {/* SIDEBAR */}
      {showSidebar && (
        <div className="sidebar">
          <h3>History</h3>

          {history.length === 0 && <p>No chats yet</p>}

        {history
  .filter(item => {
    // 🔥 handle both old + new format
    if (item.messages) {
      return item.messages[0]?.question
        ?.toLowerCase()
        .includes(search.toLowerCase());
    } else {
      return item.question
        ?.toLowerCase()
        .includes(search.toLowerCase());
    }
  })
  .map((item, i) => (
    <div
      key={i}
      className="history-item"
      onClick={() => {
        const loadedChat = [];

        if (item.messages) {
          // ✅ NEW SESSION FORMAT
          item.messages.forEach(msg => {
            loadedChat.push({ type: "user", text: msg.question });
            loadedChat.push({
              type: "bot",
              text: msg.answer,
              objects: msg.objects,
            });
          });
        } else {
          // ✅ OLD FORMAT (fallback)
          loadedChat.push({ type: "user", text: item.question });
          loadedChat.push({
            type: "bot",
            text: item.answer,
            objects: item.objects,
          });
        }

        setMessages(loadedChat);
        localStorage.setItem("chatMessages", JSON.stringify(loadedChat));
      }}
    >
      {/* 🔥 title */}
      {item.messages
        ? item.messages[0]?.question
        : item.question}
    </div>
))}
        </div>
      )}

      {/* MAIN */}
      <div className="chat-container">

        {/* TOP BAR */}
        <div className="top-bar">
          <button onClick={() => setShowSidebar(!showSidebar)}>☰</button>
          <button onClick={newChat}>New Chat</button>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TITLE */}
        <h2 className="title">AI Vision Chatbot</h2>

        {/* CHAT */}
        <div className="chat-box" ref={chatRef}>

          {messages.length === 0 && (
            <div className="welcome-box">
              <h3>👋 Welcome</h3>
              <p>Upload an image and ask anything</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>

              {msg.type === "user" && (
                <>
                  {msg.image && <img src={msg.image} alt="uploaded" />}
                  <p>{msg.text}</p>
                </>
              )}

              {msg.type === "bot" && (
                <>
                  <p><b>Answer:</b> {msg.text}</p>
                  <p><b>Objects:</b> {msg.objects?.join(", ")}</p>
                  <p><b>Mode:</b> {msg.mode}</p>
                </>
              )}

            </div>
          ))}

          {loading && <p className="loading">Thinking...</p>}
        </div>

        {/* INPUT AREA */}
        <div className="input-section">

          {/* UPLOAD */}
          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <div style={{ position: "relative", marginTop: "10px" }}>
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />

                <button
                  onClick={removeImage}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* INPUT */}
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about the image..."
          />

          {/* SUGGESTIONS */}
          <div className="suggestions">
            <button onClick={() => setQuestion("What is in this image?")}>
              What is in image?
            </button>

            <button onClick={() => setQuestion("Describe this image")}>
              Describe image
            </button>

            <button onClick={() => setQuestion("How many objects are there?")}>
              Count objects
            </button>
          </div>

          {/* BUTTON */}
          <button onClick={submit} className="submit-btn">
            Ask
          </button>

        </div>
      </div>
    </div>
  );
}