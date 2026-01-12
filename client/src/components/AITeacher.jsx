import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";

function AITeacher() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  // Refs for managing media and socket
  const webcamRef = useRef(null);
  const ws = useRef(null);

  // State
  const [aiResponse, setAiResponse] = useState("Connecting to AI Teacher...");
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");

  // Initialize WebSocket Connection
  useEffect(() => {
    if (!course) return;

    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to AI");
      // Send Init message to set context
      ws.current.send(
        JSON.stringify({
          type: "init",
          courseTitle: course.course_title,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ai_response") {
        setAiResponse(data.text);
        speak(data.text); // Text-to-Speech
      } else if (data.type === "ready") {
        setAiResponse(data.text);
        speak(data.text);
      }
    };

    return () => {
      if (ws.current) ws.current.close();
      window.speechSynthesis.cancel(); // Stop talking on exit
    };
  }, [course]);

  // Helper: Send Frame to AI
  const sendFrameToAI = () => {
    if (webcamRef.current && ws.current.readyState === WebSocket.OPEN) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Remove data:image/jpeg;base64, prefix
      const base64Data = imageSrc.split(",")[1];

      ws.current.send(
        JSON.stringify({
          type: "stream",
          image: base64Data,
          prompt: userPrompt || "What do you see? Teach me about this context.",
        })
      );

      setUserPrompt(""); // Clear prompt after sending
    }
  };

  // Helper: Text to Speech (Browser Native)
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  if (!course) return <div style={{ padding: 50 }}>No Course Selected</div>;

  // STYLES
  const styles = {
    container: {
      display: "flex",
      height: "calc(100vh - 80px)", // Full height minus header
      background: "#1a1a1a",
      color: "#fff",
    },
    videoSection: {
      flex: 2,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#000",
    },
    aiSection: {
      flex: 1,
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderLeft: "2px solid #2E4F21",
      background: "#121212",
    },
    aiAvatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "linear-gradient(45deg, #2E4F21, #a0f1bd)",
      margin: "0 auto 20px auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      boxShadow: "0 0 30px rgba(160, 241, 189, 0.3)",
      animation: "pulse 2s infinite",
    },
    responseBox: {
      background: "#222",
      padding: "20px",
      borderRadius: "12px",
      minHeight: "200px",
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#a0f1bd",
      marginBottom: "20px",
    },
    controls: {
      display: "flex",
      gap: "10px",
      flexDirection: "column",
    },
    input: {
      padding: "15px",
      borderRadius: "8px",
      border: "none",
      background: "#333",
      color: "#fff",
      marginBottom: "10px",
    },
    btn: {
      padding: "15px",
      background: "#2E4F21",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      {/* LEFT: User Video */}
      <div style={styles.videoSection}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(0,0,0,0.6)",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          🔴 Live Class: {course.course_title}
        </div>
      </div>

      {/* RIGHT: AI Interaction */}
      <div style={styles.aiSection}>
        <div>
          <div style={styles.aiAvatar}>🤖</div>
          <div style={styles.responseBox}>{aiResponse}</div>
        </div>

        <div style={styles.controls}>
          <input
            type="text"
            style={styles.input}
            placeholder="Type a specific question (or just click Ask AI)"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <button style={styles.btn} onClick={sendFrameToAI}>
            📸 Show AI & Ask
          </button>
          <button
            style={{ ...styles.btn, background: "#444" }}
            onClick={() => navigate("/my-learning")}
          >
            End Class
          </button>
        </div>
      </div>
    </div>
  );
}

export default AITeacher;
