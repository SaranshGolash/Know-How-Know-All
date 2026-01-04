import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Testimonial from "./Testimonial";
import HiringCompanies from "./HiringCompanies";

function App() {
  return (
    <BrowserRouter>
      <div className="landing-page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Services />
                <Testimonial />
                <HiringCompanies />
              </>
            }
          />
          <Route path="/services" element={<Services />} />
          {/*<Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />*/}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
