import React from "react";

function Pricing() {
  return (
    <div className="Pricing">
      <span>Pricing</span>
      <h2>Pick the Perfect Plan for Success</h2>
      <span>Find a flexible plan that supports your learning and success.</span>
      <div className="pricing-cards">
        <PricingCard
          planName="Standard"
          pricing="$17"
          timeSpan="month"
          description="Get started with essential tools to manage your study analytics and career efficiently."
        >
          <button>Get Started →</button>
          <ul>
            <li>Access to core course materials</li>
            <li>Weekly live sessions with instructors</li>
            <li>Standard support for all inquiries</li>
            <li>Discounts available for future updates</li>
          </ul>
        </PricingCard>
        <PricingCard
          planName="Pro"
          pricing="$47"
          timeSpan="month"
          description="Beginners who are looking for essential resources and support"
        >
          <button>Get Started →</button>
          <ul>
            <li>Access to core course materials</li>
            <li>Weekly live Q&A with instructors</li>
            <li>Unlimited support for all inquiries</li>
            <li>Get all course materials and updates</li>
            <li>Discounts on future course updates</li>
          </ul>
        </PricingCard>
        <PricingCard
          planName="Platinum"
          pricing="$67"
          timeSpan="month"
          description="Comprehensive features for experts seeking mastery"
        >
          <button>Get Started →</button>
          <ul>
            <li>Exclusive access to all course materials</li>
            <li>Priority live Q&A with instructors</li>
            <li>Support with Unlimited responses</li>
            <li>Special Discounts on all future courses</li>
            <li>Full access to every course update</li>
            <li>VIP support with faster resolutions</li>
            <li>Access to all course materials</li>
          </ul>
        </PricingCard>
      </div>
    </div>
  );
}

function PricingCard({ planName, pricing, timeSpan, description, children }) {
  return (
    <div className="pricing-card-content">
      <span>{planName}</span>
      <h2>
        {pricing}/<span>{timeSpan}</span>
      </h2>
      <span>{description}</span>
      {children}
    </div>
  );
}

export default Pricing;
