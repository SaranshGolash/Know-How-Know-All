import React, { useState, useEffect } from "react";
import TestimonialCardContext from "./TestimonialCardContext";

function Testimonial() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth <= 1024;
  const isMobile = windowWidth <= 600;

  const styles = {
    testimonial: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      background: "#f9f9f9",
      boxSizing: "border-box",
      margin: "0 auto",
      // Dynamic Layout based on screen size
      padding: isMobile ? "36px" : "100px",
      width: "100%",
      maxWidth: isMobile ? "375px" : isTablet ? "800px" : "1280px",
      height: "auto",
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
      color: "#2E4F21",
    },
    contextSpan: {
      fontSize: "16px",
      color: "#666",
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
