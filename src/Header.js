import React from "react";
import "./Header.css";
import treespreelogo from "./images/TreespreeLogo.png";

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
      <div className="header">
        <a href="/">
          <img
            src={treespreelogo}
            alt="Logo"
            className="header-treespree-logo"
          />
        </a>
        <h2 className="logo">
          <a href="/">TreeSpree</a>
        </h2>
        <ul className="navigation">
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/team">Team</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>

        <a href="/explore">
          <button className="button-explore">Explore</button>
        </a>
      </div>
    );
  }
}

export default Header;
