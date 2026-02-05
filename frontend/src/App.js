import React, { useState, useEffect } from "react";
const API = "https://quantum-messenger-new.onrender.com";


export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>
      <h1>🔐 Quantum Secure Messenger</h1>

      <form onSubmit={sendMessage} style={{ marginBottom: "20px" }}>
        <input
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button style={{ padding: "8px 12px" }}>
          Send
        </button>
      </form>

      <div style={{
        background: "white",
        padding: "15px",
        width: "90%",
        maxWidth: "600px",
        borderRadius: "8px"
      }}>
        <h3>📦 Blockchain Messages</h3>

        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
              <p><strong>From:</strong> {msg.sender}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {msg.timestamp}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
