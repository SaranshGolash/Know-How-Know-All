import React from "react";
import ServiceCardContext from "./ServiceCardContext";

function ServicesCardList() {
  const data = [
    { title: "Frontend Development", desc: "Build beautiful websites" },
    { title: "Backend Development", desc: "Build robust APIs" },
    { title: "Full Stack Development", desc: "Master both ends" },
    { title: "Data Science", desc: "Analyze data insights" },
    { title: "AI & Machine Learning", desc: "Train smart models" },
    { title: "Cyber Security", desc: "Protect systems" },
    { title: "Mobile App Dev", desc: "iOS and Android apps" },
    { title: "UI/UX Design", desc: "Design user interfaces" },
    { title: "Digital Marketing", desc: "Reach global audiences" },
    { title: "Graphic Design", desc: "Visual content creation" },
    { title: "Content Writing", desc: "Write engaging content" },
    { title: "Social Media", desc: "Manage online presence" },
  ];

  return (
    <>
      {data.map((item, index) => (
        <ServiceCardContext
          key={index}
          img=""
          title={item.title}
          description={item.desc}
          buttonText="Explore more"
        />
      ))}
    </>
  );
}

export default ServicesCardList;
