import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { handleCheckout } from "../utils/paymentHandler";
import { ThemeContext } from "../context/Theme";

function AddToCart() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { colors, theme } = useContext(ThemeContext);

  // Get the item passed from ExploreMore, if available
  const newItem = location.state?.item;

  // Define a dynamic accent color (Dark Green for Light Mode, Light Green for Dark Mode)
  const accentColor = theme === "light" ? "#2E4F21" : "#a0f1bd";

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "80px 20px",
      minHeight: "60vh",
      color: colors.text,
    },
    title: {
      fontSize: "32px",
      color: accentColor,
      marginBottom: "30px",
      borderBottom: `1px solid ${colors.border}`,
      paddingBottom: "20px",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: colors.cardBg,
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      marginBottom: "20px",
      borderLeft: `5px solid ${accentColor}`,
    },
    itemName: {
      fontSize: "20px",
      fontWeight: "700",
      color: colors.text,
    },
    itemDesc: {
      color: theme === "light" ? "#666" : "#aaa",
    },
    itemPrice: {
      fontSize: "18px",
      fontWeight: "600",
      color: accentColor,
    },
    emptyState: {
      textAlign: "center",
      color: theme === "light" ? "#666" : "#aaa",
      marginTop: "50px",
    },
    checkoutBtn: {
      background: "#2E4F21",
      color: "#fff",
      padding: "15px 40px",
      border: theme === "light" ? "none" : "1px solid #a0f1bd",
      borderRadius: "8px",
      fontSize: "18px",
      cursor: "pointer",
      marginTop: "20px",
      float: "right",
      transition: "background 0.3s",
    },
    link: {
      color: accentColor,
      textDecoration: "underline",
      cursor: "pointer",
    },
    totalText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: colors.text,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Shopping Cart</h1>

      {newItem ? (
        <>
          <div style={styles.cartItem}>
            <div>
              <div style={styles.itemName}>{newItem.title}</div>
              <span style={styles.itemDesc}>{newItem.description}</span>
            </div>
            <div style={styles.itemPrice}>$49.99</div>
          </div>

          {/* Subtotal Area */}
          <div style={{ textAlign: "right", marginTop: "40px" }}>
            <div style={styles.totalText}>Total: $49.99</div>
            <button
              style={styles.checkoutBtn}
              onClick={() => handleCheckout(user?.name ? "1" : null, newItem)}
              onMouseOver={(e) => (e.target.style.opacity = "0.9")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div style={styles.emptyState}>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any courses yet.</p>
          <Link to="/services" style={styles.link}>
            Browse Services
          </Link>
        </div>
      )}
    </div>
  );
}

export default AddToCart;
