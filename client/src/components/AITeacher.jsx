import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import QuizModal from "./OuizModal"; // ✅ IMPORT ADDED

// --- ICONS ---
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
// ✅ QUIZ ICON ADDED
const QuizIcon = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

function AITeacher() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  // --- HOOKS ---
  const webcamRef = useRef(null);
  const aiVideoRef = useRef(null);
  const ws = useRef(null);
  const recognition = useRef(null);

  // --- STATE ---
  const [aiState, setAiState] = useState("idle");
  const [aiMessage, setAiMessage] = useState("Hello! I am ready to teach.");
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [transcript, setTranscript] = useState("");

  // ✅ QUIZ STATE VARIABLES ADDED
  const [quizData, setQuizData] = useState(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  // --- 1. WEBSOCKET SETUP ---
  useEffect(() => {
    if (!course) return;
    if (ws.current) return;

    console.log("🔌 Connecting to WebSocket...");
    const socket = new WebSocket("ws://localhost:8080");
    ws.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({ type: "init", courseTitle: course.course_title })
        );
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle Standard Response
      if (data.type === "ai_response" || data.type === "ready") {
        setAiMessage(data.text);
        speak(data.text);
        setIsLoadingQuiz(false); // Stop loading if AI talks instead of quitting
      }
      // ✅ Handle Quiz Data
      else if (data.type === "quiz_data") {
        setQuizData(data.data);
        setIsLoadingQuiz(false);
        setAiMessage("I've prepared a quiz for you. Good luck!");
      }
    };

    socket.onerror = (error) => console.error("❌ WebSocket Error:", error);

    // Initialize Speech Recognition
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "en-US";
      recognition.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleSend(text);
      };
    }

    return () => {
      if (socket.readyState === WebSocket.OPEN) socket.close();
      ws.current = null;
      window.speechSynthesis.cancel();
      if (isAutoMode) clearInterval(autoInterval.current);
    };
  }, [course]);

  // --- 2. VIDEO HANDLING ---
  useEffect(() => {
    const video = aiVideoRef.current;
    if (!video) return;
    const newSrc =
      aiState === "speaking" ? "/videos/ai-talking.mp4" : "/videos/ai-idle.mp4";
    if (!video.src.includes(newSrc)) {
      video.src = newSrc;
      video.load();
    }
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        if (error.name !== "AbortError")
          console.log("Autoplay prevented:", error);
      });
    }
  }, [aiState]);

  // --- 3. SPEECH & CORE LOGIC ---
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.name.includes("Google US English")) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onstart = () => setAiState("speaking");
    utterance.onend = () => setAiState("idle");
    window.speechSynthesis.speak(utterance);
  };

  const autoInterval = useRef(null);
  useEffect(() => {
    if (isAutoMode) {
      setAiMessage("Watching you work...");
      autoInterval.current = setInterval(() => {
        captureAndSend(
          "I am currently working on this. Briefly guide me if I'm wrong."
        );
      }, 8000);
    } else {
      clearInterval(autoInterval.current);
    }
    return () => clearInterval(autoInterval.current);
  }, [isAutoMode]);

  const captureAndSend = useCallback((promptText) => {
    if (webcamRef.current && ws.current?.readyState === WebSocket.OPEN) {
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
      setAiState("listening");
      try {
        recognition.current.start();
      } catch (e) {
        console.log("Already started");
      }
    }
  };

  // ✅ NEW FUNCTION: Start Quiz
  const startQuiz = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setAiMessage("Generating a unique quiz for you...");
      setIsLoadingQuiz(true);
      ws.current.send(
        JSON.stringify({
          type: "quiz",
          courseTitle: course.course_title,
        })
      );
    }
  };

  if (!course) return null;

  // --- STYLES ---
  const styles = {
    page: {
      height: "100vh",
      width: "100vw",
      background: "#000",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
    },
    studentSection: {
      flex: 1,
      position: "relative",
      borderRight: "2px solid #333",
    },
    webcam: { width: "100%", height: "100%", objectFit: "cover" },
    aiSection: {
      flex: 1,
      position: "relative",
      background: "#111",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    aiVideo: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.8,
    },
    hud: {
      position: "absolute",
      bottom: "40px",
      width: "90%",
      background: "rgba(0,0,0,0.8)",
      padding: "20px",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      border: "1px solid #333",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      zIndex: 10,
    },
    aiText: {
      color: "#a0f1bd",
      fontSize: "18px",
      lineHeight: "1.5",
      maxHeight: "100px",
      overflowY: "auto",
    },
    controls: { display: "flex", gap: "15px", justifyContent: "center" },
    btn: {
      background: "rgba(255,255,255,0.1)",
      border: "none",
      color: "#fff",
      padding: "15px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    activeBtn: { background: "#2E4F21", color: "#a0f1bd" },
    endBtn: { background: "#d93025" },
  };

  return (
    <div style={styles.page}>
      {/* ✅ QUIZ MODAL */}
      {quizData && (
        <QuizModal questions={quizData} onClose={() => setQuizData(null)} />
      )}

      <div style={styles.studentSection}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={styles.webcam}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(0,0,0,0.6)",
            padding: "5px 12px",
            borderRadius: "20px",
            color: "white",
            fontSize: "12px",
          }}
        >
          YOU
        </div>
      </div>

      <div style={styles.aiSection}>
        <video ref={aiVideoRef} loop muted playsInline style={styles.aiVideo} />
        <div style={styles.hud}>
          <div style={styles.aiText}>
            <strong>AI Teacher:</strong> {aiMessage}
          </div>
          <div style={styles.controls}>
            <button
              style={{ ...styles.btn, ...(isAutoMode ? styles.activeBtn : {}) }}
              onClick={() => setIsAutoMode(!isAutoMode)}
            >
              <CamIcon />
            </button>
            <button
              style={{
                ...styles.btn,
                ...(aiState === "listening" ? styles.activeBtn : {}),
              }}
              onClick={startListening}
            >
              <MicIcon />
            </button>

            {/* ✅ QUIZ BUTTON */}
            <button
              style={{
                ...styles.btn,
                ...(isLoadingQuiz ? styles.activeBtn : {}),
              }}
              onClick={startQuiz}
              title="Take a Quiz"
            >
              {isLoadingQuiz ? "..." : <QuizIcon />}
            </button>

            <button
              style={{ ...styles.btn, ...styles.endBtn }}
              onClick={() => navigate("/my-learning")}
            >
              <PhoneIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AITeacher;
