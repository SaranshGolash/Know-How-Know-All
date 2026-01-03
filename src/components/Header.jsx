import React, { useState } from "react";
import HeroSection from "./HeroSection";

function Header() {
  const [isLoginHover, setIsLoginHover] = useState(false);
  const [isSignupHover, setIsSignupHover] = useState(false);

  const styles = {
    header: {
      /* Ensures the background stretches full width */
      background: "#a0f1bd",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    navBar: {
      /* Auto layout translation */
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      /* Dimensions & Spacing */
      padding: "0 40px",
      height: "101px",
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      background: "#a0f1bd",
      boxSizing: "border-box", // Important for padding
    },
    navContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Changed from flex-start to align with text
      gap: "20px",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#2E4F21", // Updated to your preferred dark green
      cursor: "pointer",
      margin: 0,
    },
    navLink: {
      fontSize: "18px", // Updated from 16px to match your JSX
      fontWeight: "500",
      cursor: "pointer",
      color: "#2E4F21",
    },
    navBtn: {
      padding: "10px 24px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    login: {
      background: isLoginHover ? "#7d9267" : "transparent",
      border: "2px solid #2e4f21",
      color: isLoginHover ? "#fff" : "#000",
      marginRight: "15px",
    },
    signup: {
      background: isSignupHover ? "#7d9267" : "#2e4f21",
      color: "#fff",
    },
  };

  return (
    <div style={styles.header}>
      <div style={styles.navBar}>
        {/* Logo */}
        <h4 style={styles.logoText}>Know-How-Know-All</h4>

        {/* Navigation Links */}
        <div style={styles.navContent}>
          <span style={styles.navLink}>about us</span>
          <span style={styles.navLink}>services</span>
          <span style={styles.navLink}>pricing</span>
          <span style={styles.navLink}>support</span>
        </div>

        {/* Buttons */}
        <div>
          <button
            id="login"
            style={{ ...styles.navBtn, ...styles.login }}
            onMouseEnter={() => setIsLoginHover(true)}
            onMouseLeave={() => setIsLoginHover(false)}
          >
            Login
          </button>
          <button
            id="signup"
            style={{ ...styles.navBtn, ...styles.signup }}
            onMouseEnter={() => setIsSignupHover(true)}
            onMouseLeave={() => setIsSignupHover(false)}
          >
            SignUp
          </button>
        </div>
      </div>

      <HeroSection />
    </div>
  );
}

export default Header;
