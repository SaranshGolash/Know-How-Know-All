import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/Theme";

function ServiceCardContext({ img, title, description, buttonText }) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isBtnHover, setIsBtnHover] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const serviceData = { title, description, img };

  const cardStyles = {
    container: {
      background: isDark ? "#1e1e1e" : "#d2f8dc",
      borderRadius: "12px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "12px",
      boxShadow: isDark
        ? "0 4px 15px rgba(0,0,0,0.3)"
        : "0 2px 10px rgba(0, 0, 0, 0.05)",
      border: isDark ? "1px solid #333" : "none",
      height: "100%",
      boxSizing: "border-box",
      // Hover Lift Effect
      transform: isCardHover ? "translateY(-5px)" : "translateY(0)",
      transition: "transform 0.2s ease, background-color 0.3s ease",
    },
    img: {
      width: "50px",
      height: "50px",
      backgroundColor: isDark ? "#333" : "#eee",
      borderRadius: "8px",
      objectFit: "cover",
    },
    h3: {
      fontSize: "18px",
      margin: "0",
      color: isDark ? "#a0f1bd" : "#2E4F21",
    },
    span: {
      fontSize: "14px",
      color: isDark ? "#ccc" : "#555",
      lineHeight: "1.4",
      flexGrow: 1,
    },
    button: {
      background: isBtnHover ? "#7d9276" : "#2e4f21",
      color: "#ffffff",
      border: isBtnHover ? "1px solid #7d9276" : "1px solid #2e4f21",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "10px",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div
      style={cardStyles.container}
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
    >
      <img src={img} alt={title} style={cardStyles.img} />
      <h3 style={cardStyles.h3}>{title}</h3>
      <span style={cardStyles.span}>{description}</span>
      <Link to="/explore" state={serviceData}>
        <button
          style={cardStyles.button}
          onMouseEnter={() => setIsBtnHover(true)}
          onMouseLeave={() => setIsBtnHover(false)}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

export default ServiceCardContext;
