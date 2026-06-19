import { useEffect, useState } from "react";
import "./History.css";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load history from backend
  const loadHistory = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/api/history");
      const data = await res.json();

      console.log("History Data:", data); // debug

      //  force re-render
     setHistory([...data].reverse());

    } catch (err) {
      console.error("Error loading history:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Run on page load
  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="history-container">

      {/* TITLE */}
      <div className="history-header">
        <h2 className="history-title">📜 Chat History</h2>

        <button className="refresh-btn" onClick={loadHistory}>
          🔄 Refresh
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="loading">Loading history...</p>}

      {/* EMPTY */}
      {!loading && history.length === 0 && (
        <div className="empty">
          <p>No past chats found</p>
        </div>
      )}

      {/* HISTORY LIST */}
      <div className="history-list">
        {history.map((chat, index) => (
          <div key={index} className="history-card">

            <p className="history-question">
              <b>Q:</b> {chat.question || "No question"}
            </p>

            <p className="history-answer">
              <b>A:</b> {chat.answer || "No answer"}
            </p>

            {/* OPTIONAL: objects */}
            {chat.objects && chat.objects.length > 0 && (
              <p className="history-objects">
                <b>Objects:</b> {chat.objects.join(", ")}
              </p>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}