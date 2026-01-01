import React from "react";

function HiringCompanies() {
  return (
    <div className="hiring-companies-section">
      <Company img="" name="Amazon" />
      <Company img="" name="EY" />
      <Company img="" name="Facebook" />
      <Company img="" name="Google" />
      <Company img="" name="Nike" />
      <Company img="" name="Byjus" />
      <Company img="" name="Snapchat" />
      <Company img="" name="Cognizant" />
      <Company img="" name="TCS" />
      <Company img="" name="Delloite" />
      <Company img="" name="Know-How-Know-All" />
    </div>
  );
}

function Company({ img, name }) {
  return (
    <div className="company">
      <img src={img} alt="" />
      <span>{name}</span>
    </div>
  );
}

export default HiringCompanies;
