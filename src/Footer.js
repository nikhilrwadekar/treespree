import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer container-fluid">
      <div>
        <nav>
          <ul>
            <li>
              <a href="/termsAndCondition">Terms&Conditions</a>
            </li>
            <li>
              <a href="/">Shop</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
