import React from "react";
import "./Header.css";

function Header() {
    return (
      <div className="Header">
        <h2 className="logo">Logo</h2>
        <ul className="navigation">
         
            <li>Search</li>
            <li>Shop</li>
            <li>Team</li>
            <li>Home</li>
            <li>Explore</li>
           
        </ul>
      
      </div>
    );
  }
  
  export default Header;