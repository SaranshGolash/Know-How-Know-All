import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";

// --- ICONS (Simple SVGs) ---
const MicIcon = () => (
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
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);
const CamIcon = () => (
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
    <path d="M23 7l-7 5 7 5V7z"></path>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);
const PhoneIcon = () => (
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
    <path d="M10.68 13.31a16 16 0 0 0 6.9 6.9l2.2-2.2a2 2 0 0 1 2.11-.45 16.74 16.74 0 0 0 5.06 1.69 2 2 0 0 1 1.76 2.07v3.25a2 2 0 0 1-2.08 2.08 17 17 0 0 1-15-15A2 2 0 0 1 4.7 2h3.25a2 2 0 0 1 2.07 1.76 16.74 16.74 0 0 0 1.69 5.06 2 2 0 0 1-.45 2.11z"></path>
  </svg>
);

function AITeacher() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  // --- HOOKS ---
  const webcamRef = useRef(null);
  const ws = useRef(null);
  const recognition = useRef(null);

  // --- STATE ---
  const [aiState, setAiState] = useState("idle"); // idle, listening, thinking, speaking
  const [aiMessage, setAiMessage] = useState("Hello! I am ready to teach.");
  const [isAutoMode, setIsAutoMode] = useState(false); // Live Monitor Toggle
  const [transcript, setTranscript] = useState("");

  // --- 1. SETUP WEBSOCKET & SPEECH ---
  useEffect(() => {
    if (!course) return;

    // A. Connect to Backend
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("✅ WebSocket Connected");
      ws.current.send(
        JSON.stringify({ type: "init", courseTitle: course.course_title })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ai_response" || data.type === "ready") {
        setAiState("speaking");
        setAiMessage(data.text);
        speak(data.text);
      }
    };

    // B. Setup Speech Recognition (Browser Native)
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleSend(text); // Auto-send when speaking stops
      };
    }

    return () => {
      if (ws.current) ws.current.close();
      window.speechSynthesis.cancel();
      if (isAutoMode) clearInterval(autoInterval.current);
    };
  }, [course]);

  // --- 2. AUTO MODE (Adaptive Learning) ---
  const autoInterval = useRef(null);
  useEffect(() => {
    if (isAutoMode) {
      setAiMessage("I am watching you work...");
      autoInterval.current = setInterval(() => {
        captureAndSend(
          "I am currently working on this. Does it look right? If not, guide me."
        );
      }, 8000); // Check every 8 seconds
    } else {
      clearInterval(autoInterval.current);
      setAiMessage("Auto-mode off. Click microphone to speak.");
    }
    return () => clearInterval(autoInterval.current);
  }, [isAutoMode]);

  // --- 3. CORE FUNCTIONS ---
  const captureAndSend = useCallback((promptText) => {
    if (webcamRef.current && ws.current?.readyState === WebSocket.OPEN) {
      setAiState("thinking");
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Data = imageSrc.split(",")[1];
        ws.current.send(
          JSON.stringify({
            type: "stream",
            image: base64Data,
            prompt: promptText,
          })
        );
      }
    }
  }, []);

  const handleSend = (text) => {
    if (!text) return;
    captureAndSend(text);
  };

  const startListening = () => {
    if (recognition.current) {
      try {
        setAiState("listening");
        recognition.current.start();
      } catch (e) {
        console.log("Already listening");
      }
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    // Attempt to select a better voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.name.includes("Google US English")) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => setAiState("idle");
    window.speechSynthesis.speak(utterance);
  };

  // --- 4. SAFETY CHECK ---
  if (!course) return null; // Or the error UI from before

  // --- 5. MODERN STYLES ---
  const styles = {
    page: {
      height: "100vh",
      width: "100vw",
      background: "#0f0f13", // Deep dark background
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
      position: "relative",
    },
    // The Main Video Feed (You)
    videoContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    webcam: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.6, // Slight dim to make UI pop
    },
    // The AI HUD (Heads Up Display)
    hud: {
      position: "absolute",
      zIndex: 10,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "40px",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    badge: {
      background: "rgba(46, 79, 33, 0.8)",
      padding: "8px 16px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(160, 241, 189, 0.3)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
    },
    // The AI Avatar Core
    aiCoreContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "50px", // Push down a bit
    },
    aiCore: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background:
        aiState === "speaking"
          ? "radial-gradient(circle, #a0f1bd 0%, #2E4F21 100%)" // Active Green
          : aiState === "thinking"
          ? "radial-gradient(circle, #f1e0a0 0%, #cf8b13 100%)" // Thinking Orange
          : "radial-gradient(circle, #333 0%, #000 100%)", // Idle Dark
      boxShadow:
        aiState === "speaking"
          ? "0 0 50px #a0f1bd"
          : "0 0 20px rgba(255,255,255,0.1)",
      transition: "all 0.5s ease",
      animation: aiState === "speaking" ? "pulse 1.5s infinite" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
    },
    aiText: {
      marginTop: "20px",
      background: "rgba(0,0,0,0.6)",
      padding: "15px 30px",
      borderRadius: "12px",
      maxWidth: "600px",
      textAlign: "center",
      lineHeight: "1.6",
      backdropFilter: "blur(5px)",
      borderLeft: "4px solid #a0f1bd",
      minHeight: "60px",
      transition: "all 0.3s ease",
    },
    // Bottom Controls
    controlBar: {
      display: "flex",
      gap: "20px",
      background: "rgba(255,255,255,0.1)",
      padding: "15px 30px",
      borderRadius: "40px",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      marginBottom: "20px",
      alignSelf: "center",
    },
    btn: {
      background: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      padding: "12px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.2s",
    },
    btnActive: {
      background: "#2E4F21",
      color: "#a0f1bd",
    },
    btnEnd: {
      background: "#ff4d4d",
      color: "#fff",
      marginLeft: "20px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Background Video Feed */}
      <div style={styles.videoContainer}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={styles.webcam}
        />
      </div>

      {/* Foreground HUD */}
      <div style={styles.hud}>
        {/* Top Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <span
              style={{
                width: 8,
                height: 8,
                background: "#a0f1bd",
                borderRadius: "50%",
              }}
            ></span>
            {course.course_title}
          </div>
          <div
            style={{
              ...styles.badge,
              background: isAutoMode ? "#2E4F21" : "rgba(0,0,0,0.5)",
            }}
          >
            {isAutoMode ? "👁️ Adaptive Mode: ON" : "Adaptive Mode: OFF"}
          </div>
        </div>

        {/* Center AI Core */}
        <div style={styles.aiCoreContainer}>
          <div style={styles.aiCore}>
            {aiState === "listening"
              ? "👂"
              : aiState === "thinking"
              ? "🧠"
              : "🤖"}
          </div>
          <div style={styles.aiText}>
            {transcript ? (
              <span style={{ color: "#aaa", fontStyle: "italic" }}>
                "{transcript}"
              </span>
            ) : null}
            <br />
            <strong>AI: </strong> {aiMessage}
          </div>
        </div>

        {/* Bottom Controls */}
        <div style={styles.controlBar}>
          {/* 1. Toggle Auto-Mode */}
          <button
            style={{ ...styles.btn, ...(isAutoMode ? styles.btnActive : {}) }}
            onClick={() => setIsAutoMode(!isAutoMode)}
            title="Toggle Live Monitor"
          >
            <CamIcon />
          </button>

          {/* 2. Speak to AI */}
          <button
            style={{
              ...styles.btn,
              ...(aiState === "listening" ? styles.btnActive : {}),
            }}
            onClick={startListening}
            title="Speak to AI"
          >
            <MicIcon />
          </button>

          {/* 3. End Call */}
          <button
            style={{ ...styles.btn, ...styles.btnEnd }}
            onClick={() => navigate("/my-learning")}
            title="End Class"
          >
            <PhoneIcon />
          </button>
        </div>
      </div>

      {/* CSS Animation for Pulse */}
      <style>{`
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(160, 241, 189, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(160, 241, 189, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(160, 241, 189, 0); }
        }
      `}</style>
    </div>
  );
}

export default AITeacher;
