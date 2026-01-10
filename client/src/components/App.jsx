import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Testimonial from "./Testimonial";
import HiringCompanies from "./HiringCompanies";
import About from "./About";
import Pricing from "./Pricing";
import Login from "./Login";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* This is where the child route (About, Services etc) renders */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="landing-page">
          <Routes>
            {/* Wrap pages that needs the Header and Footer inside the Layout */}
            <Route element={<MainLayout />}>
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
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
