import React from "react";

function Pricing() {
  return (
    <div className="Pricing">
      <PricingCard
        planName="Standard"
        pricing="$17"
        timeSpan="month (USD) $228 billed yearly"
        description="Get started with essential tools to manage your study analytics and career efficiently."
      >
        <ul>
          <li>Access to core course materials</li>
          <li>Weekly live sessions with instructors</li>
          <li>Standard support for all inquiries</li>
          <li>Discounts available for future updates</li>
        </ul>
      </PricingCard>
    </div>
  );
}

function PricingCard({ planName, pricing, timeSpan, description, children }) {
  return (
    <div className="pricing-card">
      <span>{planName}</span>
      <h2>
        {pricing}/{timeSpan}
      </h2>
      <span>{description}</span>
      <div className="pricing-content-list">{children}</div>
    </div>
  );
}

export default Pricing;
