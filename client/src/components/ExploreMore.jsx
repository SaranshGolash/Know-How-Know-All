import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ExploreMore() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data passed from the previous page
  const service = location.state;

  // Handle case where user accesses page directly via URL (no data)
  if (!service) {
    return (
      <div style={{ padding: 100, textAlign: "center" }}>
        <h2>No Service Selected</h2>
        <button onClick={() => navigate("/services")}>Go Back</button>
      </div>
    );
  }

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "80px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },
    header: {
      textAlign: "center",
      background: "#f0fdf4",
      padding: "60px",
      borderRadius: "24px",
      border: "1px solid #a0f1bd",
    },
    title: {
      fontSize: "42px",
      color: "#2E4F21",
      marginBottom: "16px",
    },
    desc: {
      fontSize: "20px",
      color: "#555",
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
      background: "#fff",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    price: {
      fontSize: "32px",
      fontWeight: "800",
      color: "#2E4F21",
    },
    btnBuy: {
      padding: "16px",
      backgroundColor: "#2E4F21",
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
      backgroundColor: "#fff",
      color: "#2E4F21",
      border: "2px solid #2E4F21",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
    },
    h3: {
      color: "#2E4F21",
      borderBottom: "2px solid #a0f1bd",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    p: {
      lineHeight: "1.8",
      color: "#444",
      marginBottom: "20px",
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
          <ul style={{ lineHeight: "2", color: "#555" }}>
            <li>In-depth analysis of {service.title} concepts.</li>
            <li>Real-world projects and case studies.</li>
            <li>AI-graded assignments with instant feedback.</li>
            <li>Industry-standard tools and frameworks.</li>
          </ul>
        </div>

        {/* Right Side: Buy/Add Buttons */}
        <div style={styles.sidebar}>
          <span style={{ fontSize: "14px", color: "#888" }}>Total Price</span>
          <div style={styles.price}>$49.99</div>

          <button
            style={styles.btnBuy}
            onClick={() => alert("Redirecting to Payment Gateway...")}
          >
            Buy Now
          </button>

          <button style={styles.btnAdd} onClick={handleAddToCart}>
            Add to Cart
          </button>

          <span
            style={{
              fontSize: "12px",
              color: "#666",
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
