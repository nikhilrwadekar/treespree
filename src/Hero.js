import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";

function Hero() {
  return (
    <div className="Hero jumbotron">
      <div className="Hero-content">
        <h2>Get to know trees around in Vancouver</h2>
        <p>Get started now.</p>
        <button className="btn btn-primary">EXPLORE TREES</button>
      </div>

      <img
        src={
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        }
        alt=""
        class="Hero-image"
      />
    </div>
  );
}

export default Hero;
