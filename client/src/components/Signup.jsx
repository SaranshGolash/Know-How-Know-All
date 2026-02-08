import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/Theme";
import ModernInput from "./ModernInput";
import { API_URL } from "../config";

function Signup() {
  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // UI States
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBtnHover, setIsBtnHover] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send data to the Backend
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      // Get the response from the server
      const data = await response.json();

      if (response.ok) {
        // Success!
        alert("Signup Successful! Please Login.");
        console.log("Server Token:", data.token);
        navigate("/Login");
      } else {
        // Error (e.g., User already exists)
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is not responding. Is it running?");
    }
  };

  // Styles
  const styles = {
    signupSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      minHeight: "100vh",
      width: "100%",
      background: isDark ? "#121212" : "#f4f7f6",
      transition: "background 0.3s ease",
    },

    // LEFT PANEL (Brand / Marketing)
    marketingPanel: {
      flex: isMobile ? "none" : "0.8", // Slightly narrower than login brand panel
      padding: isMobile ? "60px 30px" : "80px",
      background: "linear-gradient(135deg, #1a3312 0%, #2E4F21 100%)", // Reversed gradient for variety
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-start",
      textAlign: isMobile ? "center" : "left",
      position: "relative",
    },
    companyName: {
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#a0f1bd",
      marginBottom: "20px",
    },
    h1: {
      fontSize: isMobile ? "32px" : "48px",
      fontWeight: "800",
      lineHeight: "1.2",
      marginBottom: "20px",
    },
    marketingP: {
      fontSize: "18px",
      opacity: 0.8,
      lineHeight: "1.6",
      maxWidth: "400px",
    },

    // RIGHT PANEL (Form)
    formSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "40px 20px" : "40px",
      overflowY: "auto",
    },
    formCard: {
      width: "100%",
      maxWidth: "500px",
      background: isDark ? "#1e1e1e" : "#ffffff",
      padding: isMobile ? "30px" : "50px",
      borderRadius: "24px",
      boxShadow: isDark
        ? "0 20px 40px rgba(0,0,0,0.3)"
        : "0 20px 40px rgba(0,0,0,0.08)",
      transition: "background 0.3s ease",
    },
    h3: {
      fontSize: "28px",
      fontWeight: "700",
      color: isDark ? "#a0f1bd" : "#2E4F21",
      marginBottom: "10px",
      textAlign: "center",
    },
    subHeader: {
      textAlign: "center",
      color: isDark ? "#aaa" : "#666",
      marginBottom: "30px",
      fontSize: "15px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    signupBtn: {
      marginTop: "10px",
      padding: "16px",
      background: isBtnHover ? "#1a3312" : "#2E4F21",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: isBtnHover ? "translateY(-2px)" : "translateY(0)",
      boxShadow: isBtnHover ? "0 10px 20px rgba(46, 79, 33, 0.3)" : "none",
    },
    loginRedirect: {
      marginTop: "24px",
      textAlign: "center",
      fontSize: "14px",
      color: isDark ? "#aaa" : "#666",
    },
    link: {
      color: isDark ? "#a0f1bd" : "#2E4F21",
      fontWeight: "600",
      textDecoration: "none",
      marginLeft: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.signupSection}>
      {/* Left Panel */}
      <div style={styles.marketingPanel}>
        <span style={styles.companyName}>Know-How-Know-All</span>
        <h1 style={styles.h1}>Start your AI Learning Journey.</h1>
        <p style={styles.marketingP}>
          Join thousands of students learning without limits, without bias, and
          without schedules.
        </p>
      </div>

      {/* Right Panel */}
      <div style={styles.formSection}>
        <div style={styles.formCard}>
          <h3 style={styles.h3}>Create Account</h3>
          <p style={styles.subHeader}>
            It's free and takes less than a minute.
          </p>

          <form style={styles.form} onSubmit={handleSignup}>
            <ModernInput
              type="text"
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <ModernInput
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <ModernInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ModernInput
                type="password"
                label="Confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              style={styles.signupBtn}
              onMouseEnter={() => setIsBtnHover(true)}
              onMouseLeave={() => setIsBtnHover(false)}
            >
              Create Account
            </button>
          </form>

          <div style={styles.loginRedirect}>
            Already a member?
            <Link to="/login" style={styles.link}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
