import React, { useState, useEffect } from "react";
import ServicesCardList from "./ServicesCardList";

function Services() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMainBtnHover, setIsMainBtnHover] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth <= 1024;
  const isMobile = windowWidth <= 600;

  const styles = {
    services: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px",
      width: "100%",
      maxWidth: isMobile ? "375px" : isTablet ? "800px" : "1280px", // Responsive Width
      background: "#f9f9f9",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    introServices: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "60px 20px",
      gap: "16px",
      maxWidth: "800px",
    },
    introH2: {
      fontSize: "32px",
      color: "#2E4F21",
      fontWeight: "700",
      lineHeight: "1.3",
    },
    introSpan: {
      fontSize: "22px",
      color: "#666",
      maxWidth: "600px",
      lineHeight: "1.5",
    },
    exploreBtn: {
      marginTop: "10px",
      padding: "12px 24px",
      // Dynamic Hover Background
      backgroundColor: isMainBtnHover ? "#7d9276" : "#2e4f21",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    servicesCardsGrid: {
      display: "grid",
      // Responsive Grid Columns
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(4, 1fr)",
      gap: "20px",
      padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "20px 40px",
      width: "100%",
      boxSizing: "border-box",
    },
  };

  return (
    <div style={styles.services}>
      <div style={styles.introServices}>
        <span>Services</span>
        <h2 style={styles.introH2}>
          Let us help you grow, improve, and succeed so that you can shape your
          future with confidence and clarity
        </h2>
        <span style={styles.introSpan}>
          Our services are designed to help you achieve your goals and dreams.
          From learning new skills to mastering existing ones, we've got you
          covered
        </span>
        <button
          style={styles.exploreBtn}
          onMouseEnter={() => setIsMainBtnHover(true)}
          onMouseLeave={() => setIsMainBtnHover(false)}
        >
          Explore our services
        </button>
      </div>

      {/* Passing the grid style down to the container */}
      <div style={styles.servicesCardsGrid}>
        <ServicesCardList />
      </div>
    </div>
  );
}

export default Services;
