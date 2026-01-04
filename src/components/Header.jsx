import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      margin: "0px",
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
      textDecoration: "none",
    },
    navLink: {
      fontSize: "18px", // Updated from 16px to match your JSX
      fontWeight: "500",
      cursor: "pointer",
      color: "#2E4F21",
      textDecoration: "none",
    },
    navBtn: {
      padding: "10px 24px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
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
        <Link to="/" style={styles.logoText}>
          Know-How-Know-All
        </Link>

        {/* Navigation Links */}
        <div style={styles.navContent}>
          <Link to="about" style={styles.navLink}>
            about us
          </Link>
          <Link to="/services" style={styles.navLink}>
            services
          </Link>
          <Link to="/pricing" style={styles.navLink}>
            pricing
          </Link>
          <Link to="/support" style={styles.navLink}>
            support
          </Link>
        </div>

        {/* Buttons */}
        <div>
          <Link to="/login">
            <button
              id="login"
              style={{ ...styles.navBtn, ...styles.login }}
              onMouseEnter={() => setIsLoginHover(true)}
              onMouseLeave={() => setIsLoginHover(false)}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              id="signup"
              style={{ ...styles.navBtn, ...styles.signup }}
              onMouseEnter={() => setIsSignupHover(true)}
              onMouseLeave={() => setIsSignupHover(false)}
            >
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
