import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import HeroSection from "./HeroSection";
import Services from "./Services";
import ExploreMore from "./ExploreMore";
import AddToCart from "./AddToCart";
import Success from "./Success";
import Testimonial from "./Testimonial";
import HiringCompanies from "./HiringCompanies";
import About from "./About";
import Pricing from "./Pricing";
import MyLearning from "./MyLearning";
import AITeacher from "./AITeacher";
import Leaderboard from "./Leaderboard";
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
      <ChatWidget />
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
              <Route path="/explore" element={<ExploreMore />} />
              <Route path="/cart" element={<AddToCart />} />
              <Route path="/success" element={<Success />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ai-teacher" element={<AITeacher />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
