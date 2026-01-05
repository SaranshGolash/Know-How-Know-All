import React, { useState, useEffect } from "react";

function About() {
  // Responsive State Logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 600;
  const isTablet = windowWidth <= 1024;

  // Styling
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      background: "#f9f9f9",
      padding: isMobile ? "40px 20px" : "80px 40px",
      boxSizing: "border-box",
    },

    // --- Hero Section ---
    heroSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "60px",
      marginBottom: "100px",
    },
    heroText: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      textAlign: isMobile ? "center" : "left",
    },
    h1: {
      fontSize: isMobile ? "36px" : "48px",
      fontWeight: "800",
      color: "#2E4F21",
      lineHeight: "1.2",
      margin: 0,
    },
    heroP: {
      fontSize: "18px",
      lineHeight: "1.6",
      color: "#555",
    },
    heroImage: {
      flex: 1,
      width: "100%",
      maxWidth: "500px",
      height: "350px",
      backgroundColor: "#a0f1bd",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 20px 40px rgba(46, 79, 33, 0.15)",
      overflow: "hidden",
    },

    // --- Stats Section ---
    statsRow: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-around",
      width: "100%",
      backgroundColor: "#2E4F21",
      borderRadius: "16px",
      padding: "60px 40px",
      marginBottom: "100px",
      gap: isMobile ? "40px" : "0",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      color: "#fff",
    },
    statNumber: {
      fontSize: "48px",
      fontWeight: "800",
      color: "#a0f1bd",
    },
    statLabel: {
      fontSize: "16px",
      fontWeight: "500",
      opacity: 0.8,
    },

    // Values Section
    valuesSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "60px",
      width: "100%",
    },
    sectionHeader: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#2E4F21",
      textAlign: "center",
    },
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "1fr 1fr"
        : "repeat(3, 1fr)",
      gap: "30px",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroText}>
          <span
            style={{
              color: "#2E4F21",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            OUR MISSION
          </span>
          <h1 style={styles.h1}>
            Democratizing Education with Artificial Intelligence
          </h1>
          <p style={styles.heroP}>
            At Know-How-Know-All, we believe the future of learning isn't human.
            By removing human bias, fatigue, and scheduling conflicts, we
            provide a purely objective, infinitely patient, and
            hyper-personalized learning experience for everyone, everywhere.
          </p>
        </div>
        <div style={styles.heroImage}>
          <img
            src="/images/knowhowknowall.png"
            alt="AI Education"
            style={{ width: "80%", opacity: 0.8 }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>0</span>
          <span style={styles.statLabel}>Human Teachers</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>24/7</span>
          <span style={styles.statLabel}>Availability</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>100%</span>
          <span style={styles.statLabel}>Data Driven</span>
        </div>
      </div>

      {/* Core Values */}
      <div style={styles.valuesSection}>
        <h2 style={styles.sectionHeader}>Why We Removed The Humans</h2>
        <div style={styles.valuesGrid}>
          <ValueCard
            title="Zero Bias"
            desc="Our AI treats every student exactly the same, grading and teaching based purely on logic and performance."
          />
          <ValueCard
            title="Infinite Patience"
            desc="Need to ask the same question 50 times? Go ahead. Our AI never gets frustrated, tired, or annoyed."
          />
          <ValueCard
            title="Instant Evolution"
            desc="Traditional curriculums take years to update. Our AI updates its knowledge base instantly every single day."
          />
        </div>
      </div>
    </div>
  );
}

function ValueCard({ title, desc }) {
  const [hover, setHover] = useState(false);

  const cardStyle = {
    backgroundColor: hover ? "#2E4F21" : "#d2f8dc", // Light green to Dark green
    color: hover ? "#fff" : "#2E4F21", // Dark text to White text
    padding: "40px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    transition: "all 0.3s ease",
    cursor: "default",
    boxShadow: hover ? "0 10px 30px rgba(46, 79, 33, 0.2)" : "none",
    transform: hover ? "translateY(-5px)" : "translateY(0)",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 style={{ fontSize: "24px", margin: 0 }}>{title}</h3>
      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.5",
          opacity: hover ? 0.9 : 0.8,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default About;
