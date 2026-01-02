import React from "react";
import "../hero.css";

function Header() {
  return (
    <div className="header">
      <div className="navBar">
        <h4 style={{ color: "#2E4F21" }}>Know-How-Know-All</h4>
        <div className="nav-content">
          <span style={{ fontSize: "18px", color: "#2E4F21" }}>about us</span>
          <span style={{ fontSize: "18px", color: "#2E4F21" }}>services</span>
          <span style={{ fontSize: "18px", color: "#2E4F21" }}>pricing</span>
          <span style={{ fontSize: "18px", color: "#2E4F21" }}>support</span>
        </div>
        <div>
          <button className="nav-btn" id="login">
            Login
          </button>
          <button className="nav-btn" id="signup">
            SignUp
          </button>
        </div>
      </div>
      <HeroSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-section-context">
        <h1>Learn, Perform, Compete, and Hustle</h1>
        <span>
          A E-Learning Platform having 0 human teachers. You heard it right! Our
          AI will be tutoring you all across various domains and skills. This
          platform is first of its kind
        </span>
        <button className="hero-section-btn">Check out the domains</button>
      </div>
      <div className="hero-section-img">
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Header;
