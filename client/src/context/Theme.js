import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check LocalStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("appTheme") || "light";
  });

  // Toggle Function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("appTheme", newTheme);
  };

  const colors = {
    bg: theme === "light" ? "#ffffff" : "#121212",
    text: theme === "light" ? "#000000" : "#e0e0e0",
    primary: "#2E4F21", // Keeps your brand green
    secondaryBg: theme === "light" ? "#f9f9f9" : "#1e1e1e",
    cardBg: theme === "light" ? "#ffffff" : "#252526",
    border: theme === "light" ? "#eeeeee" : "#333333",
    headerBg: theme === "light" ? "#a0f1bd" : "#1b2e13",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
