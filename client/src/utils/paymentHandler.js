export const handleCheckout = async (userId, product) => {
  if (!userId) {
    alert("Please log in to purchase courses.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send product details + dummy price (since your data didn't have price, I added it below)
        body: JSON.stringify({
          products: [{ ...product, price: 49.99 }],
          userId: userId,
        }),
      }
    );

    const data = await response.json();

    if (data.url) {
      // Redirect user to Stripe
      window.location.href = data.url;
    } else {
      console.error("Failed to create session");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
