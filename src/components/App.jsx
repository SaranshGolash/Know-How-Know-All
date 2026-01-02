import React from "react";
import Header from "./Header";
import Services from "./Services";
import Testimonial from "./Testimonial";
import HiringCompanies from "./HiringCompanies";
import "../header.css";

function App() {
  return (
    <div className="landing-page">
      <Header />
      <Services />
      <Testimonial />
      <HiringCompanies />
    </div>
  );
}

export default App;
