import React from "react";
import { useLocation, Link } from "react-router-dom";

function AddToCart() {
  const location = useLocation();
  // Get the item passed from ExploreMore, if available
  const newItem = location.state?.item;

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "80px 20px",
      minHeight: "60vh",
    },
    title: {
      fontSize: "32px",
      color: "#2E4F21",
      marginBottom: "30px",
      borderBottom: "1px solid #ddd",
      paddingBottom: "20px",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      marginBottom: "20px",
      borderLeft: "5px solid #2E4F21",
    },
    itemName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#333",
    },
    itemPrice: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2E4F21",
    },
    emptyState: {
      textAlign: "center",
      color: "#666",
      marginTop: "50px",
    },
    checkoutBtn: {
      background: "#2E4F21",
      color: "#fff",
      padding: "15px 40px",
      border: "none",
      borderRadius: "8px",
      fontSize: "18px",
      cursor: "pointer",
      marginTop: "20px",
      float: "right",
    },
    link: {
      color: "#2E4F21",
      textDecoration: "underline",
      cursor: "pointer",
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
              <span style={{ color: "#666" }}>{newItem.description}</span>
            </div>
            <div style={styles.itemPrice}>$49.99</div>
          </div>

          {/* Subtotal Area */}
          <div style={{ textAlign: "right", marginTop: "40px" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              Total: $49.99
            </div>
            <button
              style={styles.checkoutBtn}
              onClick={() => alert("Proceeding to Checkout...")}
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
