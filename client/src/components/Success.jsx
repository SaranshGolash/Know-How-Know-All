import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id"); // Get Stripe ID from URL
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    if (sessionId) {
      // Call backend to verify and save to DB
      fetch("http://localhost:5000/payment-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus("Payment Successful! Course Added.");
            setTimeout(() => navigate("/"), 3000); // Redirect home after 3s
          } else {
            setStatus("Payment Failed or Invalid Session.");
          }
        })
        .catch((err) => setStatus("Error verifying payment."));
    }
  }, [sessionId, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "100px", color: "#2E4F21" }}>
      <h1>{status}</h1>
      <p>Redirecting you shortly...</p>
    </div>
  );
}

export default Success;
