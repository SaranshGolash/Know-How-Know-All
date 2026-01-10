import React, { useState } from "react";

function ServiceCardContext({ img, title, description, buttonText }) {
  const [isCardHover, setIsCardHover] = useState(false);
  const [isBtnHover, setIsBtnHover] = useState(false);

  const cardStyles = {
    container: {
      background: "#d2f8dc",
      borderRadius: "12px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      height: "100%",
      boxSizing: "border-box",
      // Hover Lift Effect
      transform: isCardHover ? "translateY(-5px)" : "translateY(0)",
      transition: "transform 0.2s ease",
    },
    img: {
      width: "50px",
      height: "50px",
      backgroundColor: "#eee",
      borderRadius: "8px",
      objectFit: "cover",
    },
    h3: {
      fontSize: "18px",
      margin: "0",
      color: "#2E4F21",
    },
    span: {
      fontSize: "14px",
      color: "#555",
      lineHeight: "1.4",
      flexGrow: 1,
    },
    button: {
      background: isBtnHover ? "#7d9276" : "#2e4f21",
      color: "#ddd",
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
      <button
        style={cardStyles.button}
        onMouseEnter={() => setIsBtnHover(true)}
        onMouseLeave={() => setIsBtnHover(false)}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ServiceCardContext;
