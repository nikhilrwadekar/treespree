import React from "react";
import "./Header.css";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import treespreelogo from "./images/TreespreeLogo.png";

class Header extends React.Component {
  render() {
    return (
      // Boilerplate from React Bootstrap Nav: https://react-bootstrap.github.io/components/navbar/
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand className="logo" href="/">
          <img
            src={treespreelogo}
            alt="Logo"
            className="header-treespree-logo"
          />

          <span
            className="logoText"
            style={{ fontFamily: "Kalam", fontSize: "2rem", color: "#50642d" }}
          >
            TreeSpree
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/shop">SHOP</Nav.Link>
            <Nav.Link href="/team">TEAM</Nav.Link>
            <Nav.Link href="/contact">CONTACT</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/explore">
              <Button
                size="lg"
                style={{ backgroundColor: "#90c33e", color: "#fff" }}
                variant=""
              >
                EXPLORE
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

export default Header;
