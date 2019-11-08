import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import treespreelogo from "./images/TreespreeLogo.png";

function Footer() {
  return (
    <div className="footer">
      <a href="/">
        <img src={treespreelogo} alt="Logo" className="footer-treespree-logo" />
      </a>
      <h2 className="logo">
        <a href="/">TreeSpree</a>
      </h2>
      <ul className="navigation">
        <li>
          <a href="/termsAndCondition">T&C</a>
        </li>
        <li>
          <a href="/team">Team</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/">Explore</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
