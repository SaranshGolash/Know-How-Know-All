import React, { useState, useRef, useEffect } from "react";

// Icons
const ChatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        { text: "Hi! I'm the Know-How-Know-All AI. How can I help you today?" },
      ],
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message to UI
    const userMsg = { role: "user", parts: [{ text: input }] };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Send to Backend
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.slice(1),
        }),
      });

      const data = await response.json();

      // 3. Add AI Response to UI
      setMessages([
        ...newHistory,
        { role: "model", parts: [{ text: data.text }] },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newHistory,
        { role: "model", parts: [{ text: "Sorry, I am offline right now." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Allow "Enter" key to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const styles = {
    // Floating Button
    floatBtn: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#2E4F21",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      zIndex: 1000,
      transition: "transform 0.2s",
    },
    // Chat Window
    window: {
      position: "fixed",
      bottom: "100px",
      right: "30px",
      width: "350px",
      height: "500px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
      display: isOpen ? "flex" : "none",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 1000,
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      background: "#2E4F21",
      color: "#fff",
      padding: "15px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      flex: 1,
      padding: "15px",
      overflowY: "auto",
      background: "#f9f9f9",
    },
    messageRow: { display: "flex", marginBottom: "10px" },
    bubble: {
      maxWidth: "80%",
      padding: "10px 14px",
      borderRadius: "12px",
      fontSize: "14px",
      lineHeight: "1.4",
    },
    inputArea: {
      padding: "10px",
      borderTop: "1px solid #eee",
      display: "flex",
      gap: "10px",
      background: "#fff",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "20px",
      border: "1px solid #ddd",
      outline: "none",
    },
    sendBtn: {
      background: "#2E4F21",
      color: "#fff",
      border: "none",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <>
      {/* 1. The Floating Button */}
      <div
        style={styles.floatBtn}
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        {isOpen ? <XIcon /> : <ChatIcon />}
      </div>

      {/* 2. The Chat Window */}
      <div style={styles.window}>
        <div style={styles.header}>
          <span>🤖 AI Assistant</span>
          <div style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}>
            <XIcon />
          </div>
        </div>

        <div style={styles.body}>
          {messages.map((msg, i) => {
            const isAi = msg.role === "model";
            return (
              <div
                key={i}
                style={{
                  ...styles.messageRow,
                  justifyContent: isAi ? "flex-start" : "flex-end",
                }}
              >
                <div
                  style={{
                    ...styles.bubble,
                    background: isAi ? "#e9e9e9" : "#a0f1bd",
                    color: isAi ? "#333" : "#000",
                    borderBottomLeftRadius: isAi ? "2px" : "12px",
                    borderBottomRightRadius: isAi ? "12px" : "2px",
                  }}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
              <div
                style={{
                  ...styles.bubble,
                  background: "#e9e9e9",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button style={styles.sendBtn} onClick={handleSend}>
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatWidget;
