import React from "react";

function HiringCompanies() {
  const keyframesStyle = ` @keyframes scrollLoop {
0% { transform: translateX(0); }
100% { transform: translateX(-50%); }
}
`;

  const styles = {
    section: {
      overflow: "hidden",
      width: "100%",
      backgroundColor: "#f9f9f9",
      padding: "40px 0",
      whiteSpace: "nowrap", // Keeps items in a single horizontal line
      position: "relative",
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
      <Company img="/images/amazon.png" />
      <Company img="/images/ey.png" />
      <Company img="/images/facebook.png" name="Facebook" />
      <Company img="/images/google.png" name="Google" />
      <Company img="/images/nike.jpg" name="Nike" />
      <Company img="/images/byjus.png" name="Byjus" />
      <Company img="/images/snapchat.png" name="Snapchat" />
      <Company img="/images/cognizant.png" name="Cognizant" />
      <Company img="/images/tcs.png" name="TCS" />
      <Company img="/images/delloite.png" name="Delloite" />
      <Company img="/images/knowhowknowall.png" name="Know-How-Know-All" />
    </>
  );

  return (
    <div style={styles.section} className="hiring-companies-section">
      <style>{keyframesStyle}</style>
      <div style={styles.track} className="scrolling-track">
        {companyList}
        {companyList}
      </div>{" "}
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
  };

  const imgStyle = {
    height: "80px",
    width: "150px",
    objectFit: "contain",
  };

  return (
    <div style={cardStyle} className="company">
      <img src={img} alt={name} style={imgStyle} />
    </div>
  );
}

export default HiringCompanies;
