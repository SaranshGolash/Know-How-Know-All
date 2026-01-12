import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";

function AITeacher() {
  const location = useLocation();
  const navigate = useNavigate();

  // SAFETY CHECK 1: Did we receive course data?
  const course = location.state?.course;

  // SAFETY CHECK 2: Logs to Debug
  console.log("AI Teacher Component Loaded");
  console.log("Course Data:", course);

  const webcamRef = useRef(null);
  const ws = useRef(null);
  const [aiResponse, setAiResponse] = useState("Connecting to AI Teacher...");
  const [userPrompt, setUserPrompt] = useState("");

  // --- 2. WEBSOCKET LOGIC ---
  useEffect(() => {
    // Connect to Backend WS
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("✅ WebSocket Connected");
      ws.current.send(
        JSON.stringify({
          type: "init",
          courseTitle: course.course_title,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ai_response" || data.type === "ready") {
        setAiResponse(data.text);
        speak(data.text);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setAiResponse(
        "⚠️ Error connecting to AI Server. Is the backend running?"
      );
    };

    return () => {
      if (ws.current) ws.current.close();
      window.speechSynthesis.cancel();
    };
  }, [course]);

  // --- 1. HANDLE MISSING DATA (Prevents Blank Screen) ---
  if (!course) {
    return (
      <div style={{ padding: "50px", textAlign: "center", marginTop: "100px" }}>
        <h1>⚠️ No Class Selected</h1>
        <p>
          You cannot access this page directly. Please go back to My Learning.
        </p>
        <button
          onClick={() => navigate("/my-learning")}
          style={{
            padding: "10px 20px",
            background: "#2E4F21",
            color: "#fff",
            border: "none",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const sendFrameToAI = () => {
    if (webcamRef.current && ws.current.readyState === WebSocket.OPEN) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Data = imageSrc.split(",")[1];
        ws.current.send(
          JSON.stringify({
            type: "stream",
            image: base64Data,
            prompt:
              userPrompt || "What do you see? Teach me about this context.",
          })
        );
        setUserPrompt("");
      }
    }
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // --- 3. THE UI ---
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
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
      background: "#121212",
      borderLeft: "1px solid #333",
    },
    responseBox: {
      background: "#222",
      padding: "20px",
      borderRadius: "8px",
      minHeight: "150px",
      marginBottom: "20px",
      color: "#a0f1bd",
    },
    input: {
      padding: "15px",
      width: "90%",
      borderRadius: "5px",
      border: "none",
      marginBottom: "10px",
    },
    btn: {
      padding: "15px",
      width: "100%",
      background: "#2E4F21",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
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

      <div style={styles.aiSection}>
        <h2>AI Tutor 🤖</h2>
        <div style={styles.responseBox}>{aiResponse}</div>

        <input
          style={styles.input}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Ask a question..."
        />
        <button style={styles.btn} onClick={sendFrameToAI}>
          📸 Ask AI
        </button>
        <button
          style={{ ...styles.btn, marginTop: "10px", background: "#555" }}
          onClick={() => navigate("/my-learning")}
        >
          End Class
        </button>
      </div>
    </div>
  );
}

export default AITeacher;
