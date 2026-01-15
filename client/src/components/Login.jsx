import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/Theme";
import ModernInput from "./ModernInput";

function Login() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // State for responsiveness and interactions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBtnHover, setIsBtnHover] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const safeCase = {
          id: data.user.id || data.user.user_id,
          name: data.user.name || data.user.full_name,
          email: data.user.email,
        };
        // 1. Save Token and Update Global State
        login(data.token, safeCase);

        // 2. Redirect to Landing Page
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const styles = {
    // Main container
    loginSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      minHeight: "100vh",
      width: "100%",
      // ✅ Dynamic Background
      background: isDark ? "#121212" : "#f4f7f6",
      transition: "background 0.3s ease",
    },

    // LEFT PANEL (Brand Side) - Kept consistent as it looks good in both modes
    loginText: {
      flex: isMobile ? "none" : "1",
      padding: isMobile ? "60px 30px" : "80px",
      background: "linear-gradient(135deg, #2E4F21 0%, #1a3312 100%)",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-start",
      textAlign: isMobile ? "center" : "left",
      position: "relative",
      overflow: "hidden",
    },

    patternOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: "radial-gradient(#a0f1bd 2px, transparent 2px)",
      backgroundSize: "30px 30px",
      pointerEvents: "none",
    },
    companyNameBlock: {
      marginBottom: "auto",
    },
    companyName: {
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#a0f1bd",
      marginBottom: "20px",
      display: "block",
    },
    welcomeSmall: {
      fontSize: isMobile ? "18px" : "24px",
      fontWeight: "400",
      opacity: 0.8,
      display: "block",
      marginBottom: "10px",
    },
    h1: {
      fontSize: isMobile ? "36px" : "54px",
      fontWeight: "800",
      lineHeight: "1.1",
      margin: 0,
      maxWidth: "500px",
    },

    // RIGHT PANEL (Form Side)
    loginFormSection: {
      flex: isMobile ? "none" : "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "40px 20px" : "80px",
    },
    formCard: {
      width: "100%",
      maxWidth: "450px",
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
      marginBottom: "30px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    // Styles for the Submit Button
    loginBtn: {
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
    // Bottom links
    formFooter: {
      marginTop: "24px",
      textAlign: "center",
      fontSize: "14px",
      color: isDark ? "#aaa" : "#666",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    link: {
      color: isDark ? "#a0f1bd" : "#2E4F21",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.loginSection}>
      {/* Left Side: Brand & Welcome Text */}
      <div style={styles.loginText}>
        <div style={styles.patternOverlay}></div>
        <div style={styles.companyNameBlock}>
          <span style={styles.companyName}>Know-How-Know-All</span>
        </div>
        <div>
          <span style={styles.welcomeSmall}>Nice to meet you again.</span>
          <h1 style={styles.h1}>Welcome Back!</h1>
        </div>
        <div style={{ marginTop: "auto" }}></div>
      </div>

      {/* Right Side: The Form */}
      <div style={styles.loginFormSection}>
        <div style={styles.formCard}>
          <h3 style={styles.h3}>Login Account</h3>

          <form style={styles.form} onSubmit={handleLogin}>
            <ModernInput
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ModernInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              style={styles.loginBtn}
              onMouseEnter={() => setIsBtnHover(true)}
              onMouseLeave={() => setIsBtnHover(false)}
            >
              Login
            </button>
          </form>

          <div style={styles.formFooter}>
            <Link to="/forgot-password" style={styles.link}>
              Forgot Password?
            </Link>
            <span>
              Don't have an account?{" "}
              <Link to="/signup" style={styles.link}>
                Sign Up Free
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
