import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/Theme";

function ModernInput({ type, label, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const labelColor = isDark ? "#a0f1bd" : "#2E4F21";
  const textColor = isDark ? "#fff" : "#333";

  // Input Background: Light Grey vs Dark Grey
  const inputBg = isDark
    ? isFocused
      ? "#333"
      : "#2c2c2c"
    : isFocused
    ? "#fff"
    : "#f9f9f9";

  // Border Color: Grey vs Dark Grey (Default) -> Green vs Mint (Focused)
  const borderColor = isFocused
    ? isDark
      ? "#a0f1bd"
      : "#2E4F21" // Active Border
    : isDark
    ? "#444"
    : "#e0e0e0"; // Inactive Border

  const inputStyles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: labelColor,
      marginLeft: "4px",
      transition: "color 0.3s ease",
    },
    input: {
      padding: "16px",
      borderRadius: "12px",
      border: `2px solid ${borderColor}`,
      background: inputBg,
      fontSize: "16px",
      outline: "none",
      transition: "all 0.2s ease",
      color: textColor,
      caretColor: isDark ? "#a0f1bd" : "#2E4F21",
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
