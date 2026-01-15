import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/Theme";

function HeroSection() {
  const [isBtnHover, setIsBtnHover] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const styles = {
    heroSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      background: isDark ? "#0f1c0b" : "#a0f1bd",
      width: "100%",
      padding: "60px 40px",
      gap: "50px",
      boxSizing: "border-box",
      transition: "background 0.3s ease", // Smooth transition
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
      color: isDark ? "#a0f1bd" : "#2e4f21",
      margin: 0,
      transition: "color 0.3s ease",
    },
    paragraph: {
      fontSize: "18px",
      lineHeight: "1.6",
      color: isDark ? "#e0e0e0" : "#555",
      maxWidth: "600px",
      transition: "color 0.3s ease",
    },
    btn: {
      width: "fit-content",
      padding: "16px 32px",
      backgroundColor: isDark
        ? isBtnHover
          ? "#fff"
          : "#a0f1bd"
        : isBtnHover
        ? "#7d9276"
        : "#2e4f21",

      color: isDark ? "#000" : "#fff", // Text color flips based on bg

      border: "none",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transform: isBtnHover ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.2s ease",
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
      filter: isDark ? "brightness(0.9)" : "none",
      transition: "filter 0.3s ease",
    },
  };

  return (
    <div style={styles.heroSection} className="hero-section">
      <div style={styles.context}>
        <h1 style={styles.h1}>Learn, Perform, Compete, and Hustle</h1>
        <p style={styles.paragraph}>
          A E-Learning Platform having 0 human teachers. You heard it right! Our
          AI will be tutoring you all across various domains and skills. This
          platform is first of its kind.
        </p>

        {/* Added Mouse Events for Hover */}
        <Link to="/services" style={{ textDecoration: "none" }}>
          <button
            style={styles.btn}
            onMouseEnter={() => setIsBtnHover(true)}
            onMouseLeave={() => setIsBtnHover(false)}
          >
            Check out the domains
          </button>
        </Link>
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
