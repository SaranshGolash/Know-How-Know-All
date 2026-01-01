import React from "react";

function Testimonial() {
  return (
    <div className="testimonial">
      <div className="testimonial-context">
        <h2>Hear from our happy students</h2>
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
    </div>
  );
}

function TestimonialContent({ img, name, tag, location, review }) {
  return (
    <div className="testimonial-content">
      <img src={img} alt="" />
      <span>{name}</span>
      <span>{tag}</span>
      <span>{location}</span>
      <span>{review}</span>
    </div>
  );
}

export default Testimonial;
