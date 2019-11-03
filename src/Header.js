import React from "react";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLinks: [{ urlname: "Search", urlhref: "http://randomlink.org" }, { urlname: "Shop", urlhref: "http://randomlink.org" }, { urlname: "Team", urlhref: "http://randomlink.org" }, { urlname: "Contact", urlhref: "http://randomlink.org" }]
    };
  }

  render() {
    console.log(this.state.headerLinks);
    return (
        
      <div className="Header">
        <h2 className="logo">TreeSpree</h2>
        <ul className="navigation">
          {this.state.headerLinks.map(link => (
            <li>
              <a href={link.urlhref}>{link.urlname}</a>
            </li>
          ))}
        </ul>

        <button>Explore</button>
      </div>
    );
  }
}

export default Header;
