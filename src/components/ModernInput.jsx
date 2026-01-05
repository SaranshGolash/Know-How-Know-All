import React, { useState } from "react";

function ModernInput({ type, label, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#2E4F21",
      marginLeft: "4px",
    },
    input: {
      padding: "16px",
      borderRadius: "12px",
      border: isFocused ? "2px solid #2E4F21" : "2px solid #e0e0e0",
      background: isFocused ? "#fff" : "#f9f9f9",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.2s ease",
      color: "#333",
    },
  };

  return (
    <div style={inputStyles.wrapper}>
      <label style={inputStyles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
}

export default ModernInput;
