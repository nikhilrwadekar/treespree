import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";

function Hero() {
  return (
    <>
      <div class="mainContent area1">
        <div class="bgVid-container">
          <video class="bgVid" autoPlay muted loop>
            <source
              src="https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-a-beautiful-vermont-road-1572327401402.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <h2>Get to know trees around in Vancouver</h2>
        <p>Get started now.</p>
      </div>
    </>
  );
}

export default Hero;
