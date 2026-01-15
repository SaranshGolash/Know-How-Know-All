import React, { useState, useEffect, useContext } from "react";
import TestimonialCardContext from "./TestimonialCardContext";
import { ThemeContext } from "../context/Theme";

function Testimonial() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth <= 1024;
  const isMobile = windowWidth <= 600;

  // Dynamic Colors
  const titleColor = isDark ? "#a0f1bd" : "#2E4F21";
  const textColor = isDark ? "#ccc" : "#666";

  const styles = {
    testimonial: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      background: isDark ? "#121212" : "#f9f9f9",
      boxSizing: "border-box",
      margin: "0 auto",
      padding: isMobile ? "36px" : "100px",
      width: "100%",
      maxWidth: isMobile ? "375px" : isTablet ? "800px" : "1280px",
      height: "auto",
      transition: "background 0.3s ease",
    },
    context: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "12px",
      marginBottom: "40px",
    },
    h2: {
      margin: 0,
      fontSize: "32px",
      fontWeight: "700",
      color: titleColor,
      transition: "color 0.3s ease",
    },
    contextSpan: {
      fontSize: "16px",
      color: textColor,
      transition: "color 0.3s ease",
    },
    // Wrapper to center the cards area
    cardsWrapper: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    // The actual container that holds the cards
    cardsContainer: {
      display: "flex",
      flexFlow: "row nowrap", // Keeps them in a line
      justifyContent: isMobile ? "flex-start" : "space-evenly", // Left align on mobile for scrolling
      gap: "20px",
      width: "100%",
      overflowX: "auto", // Allows horizontal scrolling if screen is too small
      paddingBottom: "20px",
    },
  };

  return (
    <div style={styles.testimonial}>
      <div style={styles.context}>
        <h2 style={styles.h2}>Hear from our happy students</h2>
        <span style={styles.contextSpan}>
          What our students have to say about us
        </span>
      </div>

      <div style={styles.cardsWrapper}>
        <div style={styles.cardsContainer}>
          <TestimonialCardContext />
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
