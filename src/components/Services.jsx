import React from "react";

function Services() {
  return (
    <div className="services">
      <div className="intro-services">
        <span>Services</span>
        <h2>
          Let us help you grow, improve, and succeed so that you can shape your
          future with confidence and clarity
        </h2>
        <span>
          Our services are designed to help you achieve your goals and dreams.
          From learning new skills to mastering existing ones, we've got you
          covered
        </span>
        <button className="explore-services-btn">Explore our services</button>
      </div>
      <div className="services-cards">
        <ServiceCard
          img=""
          title="Frontend Development"
          description="Learn to build beautiful and functional websites and web applications"
          buttonText="Explore more"
        />
      </div>
    </div>
  );
}

function ServiceCard({ img, title, description, buttonText }) {
  return (
    <div className="service-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <span>{description}</span>
      <button>{buttonText}</button>
    </div>
  );
}

export default Services;
