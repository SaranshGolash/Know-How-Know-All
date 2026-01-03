import React from "react";
import TestimonialContent from "./TestimonialContent";

function TestimonialCardContext() {
  const reviews = [
    {
      name: "Somasree Nandi",
      tag: "Student",
      location: "Tripura, India",
      review:
        "I have been using this platform for the past 6 months and it has been a great experience. I upskilled myself in ways I could not have imagined",
    },
    {
      name: "Saransh Golash",
      tag: "Student",
      location: "West Bengal, India",
      review:
        "I have never seen something like this. It was a wonderful experience.",
    },
    {
      name: "Patrick James",
      tag: "Student",
      location: "California, USA",
      review:
        "I have been using this platform for the past 2 years and it has been a great experience.",
    },
  ];

  return (
    <>
      {reviews.map((item, index) => (
        <TestimonialContent
          key={index}
          img=""
          name={item.name}
          tag={item.tag}
          location={item.location}
          review={item.review}
        />
      ))}
    </>
  );
}

export default TestimonialCardContext;
