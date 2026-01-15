import React, { useState, useEffect, useContext } from "react";
import ServicesCardList from "./ServicesCardList";
import { ThemeContext } from "../context/Theme";

function Services() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMainBtnHover, setIsMainBtnHover] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth <= 1024;
  const isMobile = windowWidth <= 600;

  // Dynamic Colors
  const accentColor = isDark ? "#a0f1bd" : "#2E4F21";
  const textColor = isDark ? "#ccc" : "#666";

  const styles = {
    services: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px",
      width: "100%",
      maxWidth: isMobile ? "375px" : isTablet ? "800px" : "1280px",
      background: isDark ? "#121212" : "#f9f9f9",
      margin: "0 auto",
      boxSizing: "border-box",
      transition: "background 0.3s ease",
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
    label: {
      color: accentColor,
      fontSize: "16px",
    },
    introH2: {
      fontSize: "32px",
      color: accentColor,
      fontWeight: "700",
      lineHeight: "1.3",
      transition: "color 0.3s ease",
    },
    introSpan: {
      fontSize: "22px",
      color: textColor,
      maxWidth: "600px",
      lineHeight: "1.5",
      transition: "color 0.3s ease",
    },
    exploreBtn: {
      marginTop: "10px",
      padding: "12px 24px",
      backgroundColor: isMainBtnHover ? "#7d9276" : "#2e4f21",
      color: "#fff",
      border: isDark ? "1px solid #a0f1bd" : "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    servicesCardsGrid: {
      display: "grid",
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
        {/* Applied dynamic style to the label */}
        <span style={styles.label}>
          <b>Services</b>
        </span>
        <h2 style={styles.introH2}>
          Let us help you grow, improve, and succeed so that you can shape your
          future with confidence and clarity
        </h2>
        <span style={styles.introSpan}>
          Our services are designed to help you achieve your goals and dreams.
          From learning new skills to mastering existing ones, we've got you
          covered
        </span>
      </div>

      {/* Passing the grid style down to the container */}
      <div style={styles.servicesCardsGrid}>
        <ServicesCardList />
      </div>
    </div>
  );
}

export default Services;
