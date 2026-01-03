import React, { useState } from "react";

function TestimonialContent({ img, name, tag, location, review }) {
  const [isHover, setIsHover] = useState(false);

  const cardStyles = {
    container: {
      backgroundColor: "#2e4f21",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "16px",
      minWidth: "280px", // Ensures cards don't get too squished
      maxWidth: "350px",
      width: "100%",
      cursor: "pointer",
      // Hover Transition
      transform: isHover ? "translateY(-5px)" : "translateY(0)",
      transition: "transform 0.2s ease",
    },
    img: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      objectFit: "cover",
    },
    name: {
      fontWeight: "700",
      fontSize: "20px",
      color: "#ddd",
    },
    tag: {
      fontSize: "14px",
      color: "#666",
      background: "#f0f0f0",
      padding: "4px 12px",
      borderRadius: "20px",
      fontWeight: "600",
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
      color: "#ddd",
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
