import React from "react";

function HiringCompanies() {
  // 1. Define the Keyframes for the loop
  // We move the track from 0 to -50% because we duplicated the content.
  // When it hits -50% (the end of the first set), it snaps back to 0 seamlessly.
  const keyframesStyle = `
    @keyframes scrollLoop {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  // 2. Define Inline Styles
  const styles = {
    section: {
      overflow: "hidden", // Hides the scrollbar
      width: "100%",
      backgroundColor: "#f9f9f9",
      padding: "40px 0",
      whiteSpace: "nowrap", // Keeps items in a single horizontal line
      position: "relative",
    },
    track: {
      display: "inline-flex", // Allows the width to grow with content
      animation: "scrollLoop 30s linear infinite", // The looping magic
      width: "max-content", // Ensures the div is as wide as the companies
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
      <Company img="/images/amazon.png" />
      <Company img="/images/ey.png" />
      <Company img="/images/facebook.png" name="Facebook" />
      <Company img="/images/google.png" name="Google" />
      <Company img="/images/nike.jpg" name="Nike" />
      <Company img="/images/byjus.png" name="Byjus" />
      <Company img="" name="Snapchat" />
      <Company img="/images/cognizant.png" name="Cognizant" />
      <Company img="/images/tcs.png" name="TCS" />
      <Company img="/images/delloite.png" name="Delloite" />
      <Company img="" name="Know-How-Know-All" />
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

function Company({ img, name }) {
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 40px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  };

  const imgStyle = {
    height: "80px",
    width: "150px",
    objectFit: "contain",
    display: "block",
  };

  const textStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  };

  return (
    <div style={cardStyle} className="company">
      <img src={img} alt={name} style={imgStyle} />
    </div>
  );
}

export default HiringCompanies;
