import React, { useState } from "react";
import confetti from "canvas-confetti";

function QuizModal({ questions, onClose }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); // 🎉
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    card: {
      background: "#1e1e1e",
      padding: "30px",
      borderRadius: "16px",
      width: "500px",
      maxWidth: "90%",
      border: "1px solid #333",
      color: "#fff",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    question: { fontSize: "20px", marginBottom: "20px", color: "#a0f1bd" },
    optionBtn: {
      display: "block",
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      background: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.2s",
    },
    closeBtn: {
      marginTop: "20px",
      background: "transparent",
      border: "1px solid #555",
      color: "#888",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {showResult ? (
          <div>
            <h2>Quiz Complete! 🏆</h2>
            <p style={{ fontSize: "24px" }}>
              You scored {score} / {questions.length}
            </p>
            <button
              style={{ ...styles.optionBtn, background: "#2E4F21" }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <h3>
              Question {currentQ + 1} of {questions.length}
            </h3>
            <p style={styles.question}>{questions[currentQ].question}</p>
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                style={styles.optionBtn}
                onClick={() => handleAnswer(opt)}
                onMouseOver={(e) => (e.target.style.background = "#444")}
                onMouseOut={(e) => (e.target.style.background = "#333")}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {!showResult && (
          <button style={styles.closeBtn} onClick={onClose}>
            Cancel Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizModal;
