import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/Theme";

function TestimonialContent({ img, name, tag, location, review }) {
  const [isHover, setIsHover] = useState(false);

  // ✅ Get Theme Data
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const cardStyles = {
    container: {
      backgroundColor: isDark ? "#1e1e1e" : "#2e4f21",
      padding: "40px",
      borderRadius: "16px",
      border: isDark ? "1px solid #2e4f21" : "none",
      boxShadow: isDark
        ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
        : "0px 4px 20px rgba(0, 0, 0, 0.05)",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "16px",
      minWidth: "280px",
      maxWidth: "350px",
      width: "100%",
      cursor: "pointer",
      // Hover Transition
      transform: isHover ? "translateY(-5px)" : "translateY(0)",
      transition: "transform 0.2s ease, background-color 0.3s ease",
    },
    img: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      objectFit: "cover",
      border: isDark ? "2px solid #2e4f21" : "none",
    },
    name: {
      fontWeight: "700",
      fontSize: "20px",
      color: isDark ? "#fff" : "#ddd",
    },
    tag: {
      fontSize: "14px",
      color: "#2E4F21",
      background: "#a0f1bd",
      padding: "4px 12px",
      borderRadius: "20px",
      fontWeight: "700",
    },
    location: {
      fontSize: "14px",
      color: "#ddd",
      opacity: 0.8,
    },
    review: {
      fontSize: "16px",
      lineHeight: "1.6",
      fontStyle: "italic",
      color: isDark ? "#ccc" : "#ddd",
      marginTop: "10px",
    },
  };

  return (
    <div
      style={cardStyles.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={img} alt={name} style={cardStyles.img} />
      <span style={cardStyles.name}>{name}</span>
      <span style={cardStyles.tag}>{tag}</span>
      <span style={cardStyles.location}>{location}</span>
      <span style={cardStyles.review}>"{review}"</span>
    </div>
  );
}

export default TestimonialContent;
