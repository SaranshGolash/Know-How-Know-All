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
        <ServiceCard
          img=""
          title="Backend Development"
          description="Learn to build seamless and efficient backend systems and APIs"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Full Stack Development"
          description="Learn to build complete web applications from frontend to backend"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Data Science"
          description="Learn to analyze and interpret data to gain insights and make data-driven decisions"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="AI and Machine Learning"
          description="Learn to build and train AI models to automate tasks and make predictions"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Cyber Security"
          description="Learn to protect systems and data from cyber threats and attacks"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Digital Marketing"
          description="Learn to market products and services online to reach a global audience"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Graphic Design"
          description="Learn to create visual content for marketing and branding"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Content Writing"
          description="Learn to write engaging and informative content for marketing and branding"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Social Media Management"
          description="Learn to manage social media accounts and create engaging content"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Mobile App Development"
          description="Learn to build mobile applications for iOS and Android platforms"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="UI/UX Design"
          description="Learn to create user-friendly and visually appealing interfaces for websites and applications"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Digital Marketing"
          description="Learn to market products and services online to reach a global audience"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Graphic Design"
          description="Learn to create visual content for marketing and branding"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Content Writing"
          description="Learn to write engaging and informative content for marketing and branding"
          buttonText="Explore more"
        />
        <ServiceCard
          img=""
          title="Social Media Management"
          description="Learn to manage social media accounts and create engaging content"
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
