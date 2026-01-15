import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme"; // ✅ Import Context

function HiringCompanies() {
  const { theme } = useContext(ThemeContext); // ✅ Get Theme
  const isDark = theme === "dark";

  const keyframesStyle = `
    @keyframes scrollLoop {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  const styles = {
    section: {
      overflow: "hidden",
      width: "100%",
      // ✅ Dynamic Background: Light Grey vs Dark Grey
      backgroundColor: isDark ? "#121212" : "#f9f9f9",
      padding: "40px 0",
      whiteSpace: "nowrap",
      position: "relative",
      transition: "background-color 0.3s ease",
      // ✅ Subtle border for separation in dark mode
      borderTop: isDark ? "1px solid #333" : "none",
      borderBottom: isDark ? "1px solid #333" : "none",
    },
    track: {
      display: "inline-flex",
      animation: "scrollLoop 30s linear infinite",
      width: "max-content",
    },
    gradientOverlay: {
      position: "absolute",
      top: 0,
      width: "100px",
      height: "100%",
      zIndex: 2,
    },
  };

  const companyList = (
    <>
      <Company img="/images/amazon.png" isDark={isDark} />
      <Company img="/images/ey.png" isDark={isDark} />
      <Company img="/images/facebook.png" name="Facebook" isDark={isDark} />
      <Company img="/images/google.png" name="Google" isDark={isDark} />
      <Company img="/images/nike.jpg" name="Nike" isDark={isDark} />
      <Company img="/images/byjus.png" name="Byjus" isDark={isDark} />
      <Company img="/images/snapchat.png" name="Snapchat" isDark={isDark} />
      <Company img="/images/cognizant.png" name="Cognizant" isDark={isDark} />
      <Company img="/images/tcs.png" name="TCS" isDark={isDark} />
      <Company img="/images/delloite.png" name="Delloite" isDark={isDark} />
      <Company
        img="/images/knowhowknowall.png"
        name="Know-How-Know-All"
        isDark={isDark}
      />
    </>
  );

  return (
    <div style={styles.section} className="hiring-companies-section">
      <style>{keyframesStyle}</style>
      <div style={styles.track} className="scrolling-track">
        {companyList}
        {companyList}
      </div>
    </div>
  );
}

function Company({ img, name, isDark }) {
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 40px",
    transition: "transform 0.3s ease",
  };

  const imgStyle = {
    height: "80px",
    width: "150px",
    objectFit: "contain",
    // ✅ Dark Mode Magic: Turn logos into flat white silhouettes
    // This ensures black logos (like Nike/Amazon) are visible on the dark background
    filter: isDark ? "grayscale(100%) brightness(100) contrast(0%)" : "none",
    opacity: isDark ? 0.8 : 1, // Slight transparency for the white logos
    transition: "filter 0.3s ease, opacity 0.3s ease",
  };

  return (
    <div style={cardStyle} className="company">
      <img src={img} alt={name} style={imgStyle} />
    </div>
  );
}

export default HiringCompanies;
