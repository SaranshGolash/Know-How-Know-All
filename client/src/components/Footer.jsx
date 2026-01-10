import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Footer() {
  // Responsive Logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 600;

  // Styles
  const styles = {
    footer: {
      backgroundColor: "#2E4F21",
      color: "#ffffff",
      padding: isMobile ? "60px 20px" : "80px 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "auto",
    },
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "1280px",
      gap: isMobile ? "40px" : "20px",
      marginBottom: "60px",
    },

    // Brand Info
    brandColumn: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      maxWidth: isMobile ? "100%" : "350px",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#a0f1bd",
      textDecoration: "none",
    },
    tagline: {
      fontSize: "16px",
      lineHeight: "1.6",
      opacity: 0.8,
    },

    // Links
    linksColumn: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    columnTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#a0f1bd",
      marginBottom: "8px",
    },

    // Bottom Bar
    divider: {
      width: "100%",
      maxWidth: "1280px",
      height: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      marginBottom: "30px",
    },
    bottomBar: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      fontSize: "14px",
      opacity: 0.6,
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Column 1: Brand */}
        <div style={styles.brandColumn}>
          <Link to="/" style={styles.logo}>
            Know-How-Know-All
          </Link>
          <span style={styles.tagline}>
            The first AI-driven E-learning platform with 0 human teachers.
            Removing bias, fatigue, and limits from your education.
          </span>
        </div>

        {/* Column 2: Quick Links */}
        <div style={styles.linksColumn}>
          <span style={styles.columnTitle}>Company</span>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
        </div>

        {/* Column 3: Resources */}
        <div style={styles.linksColumn}>
          <span style={styles.columnTitle}>Resources</span>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/support">Help Center</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
        </div>

        {/* Column 4: Legal */}
        <div style={styles.linksColumn}>
          <span style={styles.columnTitle}>Legal</span>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/cookie">Cookie Policy</FooterLink>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.bottomBar}>
        <span>© 2026 Know-How-Know-All. All rights reserved.</span>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Simple text placeholders for social icons */}
          <span style={{ cursor: "pointer" }}>Twitter</span>
          <span style={{ cursor: "pointer" }}>LinkedIn</span>
          <span style={{ cursor: "pointer" }}>Instagram</span>
        </div>
      </div>
    </footer>
  );
}

// Helper Component for Links with Hover Effect
function FooterLink({ to, children }) {
  const [hover, setHover] = useState(false);

  const style = {
    color: hover ? "#a0f1bd" : "#ffffff", // White to Mint Green
    textDecoration: "none",
    fontSize: "16px",
    opacity: hover ? 1 : 0.8,
    transition: "all 0.2s ease",
    cursor: "pointer",
    width: "fit-content",
  };

  return (
    <Link
      to={to}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

export default Footer;
