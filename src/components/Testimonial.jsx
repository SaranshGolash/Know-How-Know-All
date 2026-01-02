import React from "react";
import "../testimonial.css";

function Testimonial() {
  return (
    <div className="testimonial">
      <div className="testimonial-context">
        <h2 style={{ color: "#2E4F21" }}>Hear from our happy students</h2>
        <span>What our students have to say about us</span>
      </div>
      <div className="testimonial-cards">
        <TestimonialCardContext />
      </div>
    </div>
  );
}

function TestimonialCardContext() {
  return (
    <div className="testimonial-card-context">
      <TestimonialContent
        img=""
        name="Somasree Nandi"
        tag="Student"
        location="Tripura, India"
        review="I have been using this platform for the past 6 months and it has been a
        great experience. I upskilled myself in ways I could not have imagined"
      />
      <TestimonialContent
        img=""
        name="Saransh Golash"
        tag="Student"
        location="West Bengal, India"
        review="I have never seen something like this. It was a wonderful experience."
      />
      <TestimonialContent
        img=""
        name="Patrick James"
        tag="Student"
        location="California, USA"
        review="I have been using this platform for the past 2 years and it has been a
        great experience."
      />
    </div>
  );
}

function TestimonialContent({ img, name, tag, location, review }) {
  return (
    <div className="testimonial-content">
      <img src={img} alt="" />
      <span style={{ color: "#ddd" }}>{name}</span>
      <span>{tag}</span>
      <span>{location}</span>
      <span>{review}</span>
    </div>
  );
}

export default Testimonial;
