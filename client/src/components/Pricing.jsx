import React, { useState, useEffect } from "react";

function Pricing() {
  // Responsive Logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [selectedPlan, setSelectedPlan] = useState("Pro");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  // Styles
  const styles = {
    pricing: {
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      padding: isMobile ? "60px 20px" : "100px 40px",
      backgroundColor: "#f9f9f9",
      width: "100%",
      boxSizing: "border-box",
    },
    // Header Section
    labelSpan: {
      color: "#2E4F21",
      backgroundColor: "#a0f1bd",
      padding: "10px",
      borderRadius: "20px",
      fontWeight: "700",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "14px",
      marginBottom: "10px",
    },
    h2: {
      fontSize: isMobile ? "32px" : "42px",
      fontWeight: "800",
      color: "#2E4F21",
      margin: "0 0 20px 0",
      textAlign: "center",
    },
    subSpan: {
      fontSize: "18px",
      color: "#666",
      marginBottom: "60px",
      textAlign: "center",
      maxWidth: "600px",
      lineHeight: "1.6",
    },
    // Card Container
    pricingCards: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "1fr 1fr"
        : "repeat(3, 1fr)",
      gap: "30px",
      width: "100%",
      maxWidth: "1280px",
      alignItems: "stretch",
    },
    // Button Styling
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#2E4F21",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "24px",
      marginBottom: "24px",
      transition: "background-color 0.3s ease",
    },
    // List Styling
    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "left",
      width: "100%",
    },
    li: {
      padding: "10px 0",
      borderBottom: "1px solid #eee",
      color: "#555",
      fontSize: "15px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  // Helper for button hover
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const getButtonStyle = (index) => ({
    ...styles.button,
    backgroundColor: hoveredBtn === index ? "#1a3312" : "#2E4F21",
  });

  return (
    <div className="pricing" style={styles.pricing}>
      <span style={styles.labelSpan}>Pricing</span>
      <h2 style={styles.h2}>Pick the Perfect Plan for Success</h2>
      <span style={styles.subSpan}>
        Find a flexible plan that supports your learning and success.
      </span>

      <div className="pricing-cards" style={styles.pricingCards}>
        {/* STANDARD PLAN */}
        <PricingCard
          planName="Standard"
          pricing="$17"
          timeSpan="month"
          description="Get started with essential tools to manage your study analytics and career efficiently."
          // CHECK: Is this the selected plan?
          isHighlighted={selectedPlan === "Standard"}
          // ACTION: Click to select this plan
          onClick={() => setSelectedPlan("Standard")}
        >
          <button
            style={getButtonStyle(1)}
            onMouseEnter={() => setHoveredBtn(1)}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            Get Started →
          </button>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Access
              to core course materials
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Weekly
              live sessions with instructors
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Standard support for all inquiries
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Discounts available for future updates
            </li>
          </ul>
        </PricingCard>

        {/* PRO PLAN */}
        <PricingCard
          planName="Pro"
          pricing="$47"
          timeSpan="month"
          description="Beginners who are looking for essential resources and support"
          isHighlighted={selectedPlan === "Pro"}
          onClick={() => setSelectedPlan("Pro")}
        >
          <button
            style={getButtonStyle(2)}
            onMouseEnter={() => setHoveredBtn(2)}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            Get Started →
          </button>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Access
              to core course materials
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Weekly
              live Q&A with instructors
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Unlimited support for all inquiries
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Get
              all course materials and updates
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Discounts on future course updates
            </li>
          </ul>
        </PricingCard>

        {/* PLATINUM PLAN */}
        <PricingCard
          planName="Platinum"
          pricing="$67"
          timeSpan="month"
          description="Comprehensive features for experts seeking mastery"
          isHighlighted={selectedPlan === "Platinum"}
          onClick={() => setSelectedPlan("Platinum")}
        >
          <button
            style={getButtonStyle(3)}
            onMouseEnter={() => setHoveredBtn(3)}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            Get Started →
          </button>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Exclusive access to all course materials
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Priority live Q&A with instructors
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Support with Unlimited responses
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span>{" "}
              Special Discounts on all future courses
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Full
              access to every course update
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> VIP
              support with faster resolutions
            </li>
            <li style={styles.li}>
              <span style={{ color: "#2E4F21", marginRight: 8 }}>✓</span> Access
              to all course materials
            </li>
          </ul>
        </PricingCard>
      </div>
    </div>
  );
}

function PricingCard({
  planName,
  pricing,
  timeSpan,
  description,
  children,
  isHighlighted,
  onClick,
}) {
  const [hover, setHover] = useState(false);

  const styles = {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      transition: "all 0.3s ease",
      // Conditional styles for the Selected card
      border: isHighlighted ? "3px solid #2E4F21" : "1px solid #eee",
      // Lifts up if hovered OR if highlighted
      transform: hover || isHighlighted ? "translateY(-10px)" : "translateY(0)",
      boxShadow:
        hover || isHighlighted
          ? "0 20px 40px rgba(46, 79, 33, 0.15)"
          : "0 4px 10px rgba(0,0,0,0.05)",
      position: "relative",
      cursor: "pointer",
    },
    planName: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#2E4F21",
      marginBottom: "16px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      backgroundColor: "#a0f1bd",
      padding: "6px 12px",
      borderRadius: "20px",
    },
    h2: {
      fontSize: "48px",
      fontWeight: "800",
      color: "#1a1a1a",
      margin: "0 0 16px 0",
      display: "flex",
      alignItems: "baseline",
    },
    timeSpan: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#888",
      marginLeft: "5px",
    },
    description: {
      fontSize: "16px",
      color: "#555",
      lineHeight: "1.5",
      marginBottom: "auto",
      minHeight: "60px",
    },
  };

  return (
    <div
      className="pricing-card-content"
      style={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <span style={styles.planName}>{planName}</span>
      <h2 style={styles.h2}>
        {pricing}
        <span style={styles.timeSpan}>/{timeSpan}</span>
      </h2>
      <span style={styles.description}>{description}</span>
      {children}
    </div>
  );
}

export default Pricing;
