import React from "react";
import "./Header.css";
import treespreelogo from "../public/images/TreespreeLogo";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLinks: [
        { urlname: "Search", urlhref: "http://randomlink.org" },
        { urlname: "Shop", urlhref: "http://randomlink.org" },
        { urlname: "Team", urlhref: "http://randomlink.org" },
        { urlname: "Contact", urlhref: "http://randomlink.org" }
      ]
    };
  }

  render() {
    console.log(this.state.headerLinks);
    return (
      <div className="Header">
        <img src={treespreelogo} alt="Logo" />
        <h2 className="logo">
          <a href="/">TreeSpree</a>
        </h2>
        <ul className="navigation">
          <li>
            <a href="/">Shop</a>
          </li>
          <li>
            <a href="/team">Team</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>

        <button>Explore</button>
      </div>
    );
  }
}

export default Header;
