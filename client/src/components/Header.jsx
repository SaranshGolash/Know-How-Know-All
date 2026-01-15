import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/Theme"; // Ensure correct path

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoginHover, setIsLoginHover] = useState(false);
  const [isSignupHover, setIsSignupHover] = useState(false);
  const [stats, setStats] = useState({ level: 1, xp: 0 });

  // Get theme data
  const { colors, theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/user/stats/${user.id}`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Error fetching stats:", err));
    }
  }, [user]);

  const styles = {
    header: {
      background: colors.headerBg || "#a0f1bd", // Use context color if available
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "background 0.3s ease", // Smooth transition for dark mode
    },
    navBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 40px",
      height: "101px",
      width: "100%",
      boxSizing: "border-box",
    },
    navContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "700",
      color: theme === "light" ? "#2E4F21" : "#a0f1bd", // Dynamic Color
      cursor: "pointer",
      textDecoration: "none",
    },
    navLink: {
      fontSize: "18px",
      fontWeight: "500",
      cursor: "pointer",
      color: theme === "light" ? "#2E4F21" : "#a0f1bd", // Dynamic Color
      textDecoration: "none",
    },
    // --- Right Side Container ---
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    // --- New Header Theme Button ---
    themeBtn: {
      background: "transparent",
      // Dark border in light mode, Light border in dark mode
      border: `2px solid ${theme === "light" ? "#2E4F21" : "#a0f1bd"}`,
      color: theme === "light" ? "#2E4F21" : "#a0f1bd",
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.3s ease",
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
      border: `2px solid ${theme === "light" ? "#2E4F21" : "#a0f1bd"}`,
      color: isLoginHover ? "#fff" : theme === "light" ? "#000" : "#fff",
    },
    signup: {
      background: isSignupHover ? "#7d9267" : "#2e4f21",
      color: "#fff",
    },
    levelBadge: {
      background: "linear-gradient(45deg, #FFD700, #FFA500)",
      color: "#000",
      padding: "5px 12px",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "800",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      cursor: "default",
    },
    userContainer: {
      position: "relative",
      cursor: "pointer",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#2E4F21",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "20px",
    },
    dropdownMenu: {
      position: "absolute",
      top: "50px",
      right: "0",
      backgroundColor: theme === "light" ? "#fff" : "#333", // Dark mode support
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      borderRadius: "8px",
      padding: "10px",
      display: showDropdown ? "flex" : "none",
      flexDirection: "column",
      gap: "10px",
      minWidth: "150px",
      zIndex: 100,
    },
    dropdownItem: {
      fontSize: "14px",
      color: theme === "light" ? "#333" : "#fff",
      textDecoration: "none",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
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
          <Link to="/about" style={styles.navLink}>
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
          <Link to="/leaderboard" style={styles.navLink}>
            leaderboard 🏆
          </Link>
        </div>

        {/* Right Section: Theme Toggle + Auth */}
        <div style={styles.rightSection}>
          {/* ✅ Theme Toggle (Always Visible) */}
          <button style={styles.themeBtn} onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Auth State */}
          {user ? (
            <>
              {/* Level Badge */}
              <div style={styles.levelBadge} title={`${stats.xp} XP Points`}>
                ⚡ LVL {stats.level}
              </div>

              {/* User Avatar */}
              <div
                style={styles.userContainer}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div style={styles.avatar}>
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                <div style={styles.dropdownMenu}>
                  <span
                    style={{
                      ...styles.dropdownItem,
                      fontWeight: "bold",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    My Profile
                  </span>
                  <Link to="/my-learning" style={styles.dropdownItem}>
                    My Learning
                  </Link>
                  <Link to="/settings" style={styles.dropdownItem}>
                    Settings
                  </Link>
                  <div
                    style={{ ...styles.dropdownItem, color: "#ff4d4d" }}
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              <Link to="/login">
                <button
                  style={{ ...styles.navBtn, ...styles.login }}
                  onMouseEnter={() => setIsLoginHover(true)}
                  onMouseLeave={() => setIsLoginHover(false)}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  style={{ ...styles.navBtn, ...styles.signup }}
                  onMouseEnter={() => setIsSignupHover(true)}
                  onMouseLeave={() => setIsSignupHover(false)}
                >
                  SignUp
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
