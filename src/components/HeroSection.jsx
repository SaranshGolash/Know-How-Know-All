import React from "react";
import { useState } from "react";

function HeroSection() {
  const [isBtnHover, setIsBtnHover] = useState(false);

  const styles = {
    heroSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#a0f1bd",
      width: "100%",
      padding: "60px 40px",
      gap: "50px",
      boxSizing: "border-box",
    },
    context: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    h1: {
      fontSize: "48px",
      lineHeight: "1.2",
      color: "#2e4f21",
      margin: 0,
    },
    paragraph: {
      fontSize: "18px",
      lineHeight: "1.6",
      color: "#555",
      maxWidth: "600px",
    },
    btn: {
      width: "fit-content",
      padding: "16px 32px",
      // Dynamic background based on hover state
      backgroundColor: isBtnHover ? "#7d9276" : "#2e4f21",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      // Transform logic based on hover state
      transform: isBtnHover ? "translateY(-2px)" : "translateY(0)",
      transition: "transform 0.2s ease, background-color 0.2s ease",
    },
    imgContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: "100%",
      maxWidth: "500px",
      height: "auto",
      borderRadius: "12px",
      minHeight: "300px",
      objectFit: "contain",
    },
  };

  return (
    // Apply styles using the style={} prop
    <div style={styles.heroSection} className="hero-section">
      <div style={styles.context}>
        <h1 style={styles.h1}>Learn, Perform, Compete, and Hustle</h1>
        <p style={styles.paragraph}>
          A E-Learning Platform having 0 human teachers. You heard it right! Our
          AI will be tutoring you all across various domains and skills. This
          platform is first of its kind.
        </p>

        {/* Added Mouse Events for Hover */}
        <button
          style={styles.btn}
          onMouseEnter={() => setIsBtnHover(true)}
          onMouseLeave={() => setIsBtnHover(false)}
        >
          Check out the domains
        </button>
      </div>

      <div style={styles.imgContainer}>
        <img
          src="/images/knowhowknowall.png"
          alt="know-how-know-all"
          style={styles.img}
        />
      </div>
    </div>
  );
}

export default HeroSection;
