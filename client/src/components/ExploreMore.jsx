import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/Theme";
import { handleCheckout } from "../utils/paymentHandler";

function ExploreMore() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { colors, theme } = useContext(ThemeContext);

  // Retrieve data passed from the previous page
  const service = location.state;

  // Handle case where user accesses page directly via URL (no data)
  if (!service) {
    return (
      <div style={{ padding: 100, textAlign: "center", color: colors.text }}>
        <h2>No Service Selected</h2>
        <button
          onClick={() => navigate("/services")}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            cursor: "pointer",
            background: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Define dynamic accent colors
  const isDark = theme === "dark";
  const accentColor = isDark ? "#a0f1bd" : "#2E4F21";
  const headerBg = isDark ? "#1b2e13" : "#f0fdf4";

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "80px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
      color: colors.text,
    },
    header: {
      textAlign: "center",
      background: headerBg,
      padding: "60px",
      borderRadius: "24px",
      border: `1px solid ${accentColor}`,
    },
    title: {
      fontSize: "42px",
      color: accentColor,
      marginBottom: "16px",
    },
    desc: {
      fontSize: "20px",
      color: isDark ? "#ccc" : "#555",
      maxWidth: "700px",
      margin: "0 auto",
    },
    contentSection: {
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
    },
    details: {
      flex: 2,
    },
    sidebar: {
      flex: 1,
      background: colors.cardBg,
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      border: isDark ? "1px solid #333" : "none", // Add border for dark mode definition
    },
    price: {
      fontSize: "32px",
      fontWeight: "800",
      color: accentColor,
    },
    btnBuy: {
      padding: "16px",
      backgroundColor: "#2E4F21", // Keep brand color
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
    },
    btnAdd: {
      padding: "16px",
      backgroundColor: "transparent",
      color: accentColor,
      border: `2px solid ${accentColor}`,
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
      transition: "0.2s",
    },
    h3: {
      color: accentColor,
      borderBottom: `2px solid ${isDark ? "#333" : "#a0f1bd"}`,
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    p: {
      lineHeight: "1.8",
      color: isDark ? "#ddd" : "#444",
      marginBottom: "20px",
    },
    listItem: {
      marginBottom: "10px",
      color: isDark ? "#ccc" : "#555",
    },
  };

  const handleAddToCart = () => {
    // Navigate to the Cart page and pass this service
    navigate("/cart", { state: { item: service } });
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>{service.title}</h1>
        <p style={styles.desc}>{service.description}</p>
      </div>

      <div style={styles.contentSection}>
        {/* Left Side: Course Details */}
        <div style={styles.details}>
          <h3 style={styles.h3}>About this Course</h3>
          <p style={styles.p}>
            Master the art of {service.title} with our AI-driven curriculum.
            This comprehensive module covers everything from foundational
            theories to advanced practical applications.
          </p>

          <h3 style={styles.h3}>What you will learn</h3>
          <ul style={{ lineHeight: "2" }}>
            <li style={styles.listItem}>
              In-depth analysis of {service.title} concepts.
            </li>
            <li style={styles.listItem}>
              Real-world projects and case studies.
            </li>
            <li style={styles.listItem}>
              AI-graded assignments with instant feedback.
            </li>
            <li style={styles.listItem}>
              Industry-standard tools and frameworks.
            </li>
          </ul>
        </div>

        {/* Right Side: Buy/Add Buttons */}
        <div style={styles.sidebar}>
          <span style={{ fontSize: "14px", color: isDark ? "#aaa" : "#888" }}>
            Total Price
          </span>
          <div style={styles.price}>$49.99</div>

          <button
            style={styles.btnBuy}
            onClick={() => handleCheckout(user ? "1" : null, service)}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Buy Now
          </button>

          <button
            style={styles.btnAdd}
            onClick={handleAddToCart}
            onMouseOver={(e) => {
              e.target.style.background = accentColor;
              e.target.style.color = isDark ? "#000" : "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = accentColor;
            }}
          >
            Add to Cart
          </button>

          <span
            style={{
              fontSize: "12px",
              color: isDark ? "#888" : "#666",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            30-Day Money-Back Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExploreMore;
