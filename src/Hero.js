import React from "react";
import "./Hero.css";
import { Button } from "react-bootstrap";

function Hero() {
  return (
    <>
      <div className="mainContent area1">
        <svg width="100%" height="500px">
          <defs>
            <clipPath id="path">
              <path
                class="cls-1"
                d="M1100,0H1.71L0,404.91S1097.38,390.48,1099.58,217.3L1100,0"
              />
            </clipPath>
          </defs>
          <foreignObject
            x="0"
            width="100%"
            height="100%"
            clip-path="url(#path)"
          >
            <div className="bgVid-container">
              <video className="bgVid" autoPlay muted loop>
                <source
                  src="https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-a-beautiful-vermont-road-1572327401402.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </foreignObject>
        </svg>
        <div className="contentOverlay">
          <h2>Get to know trees around in Vancouver</h2>
          <p>Get started now.</p>
          <Button
            size="lg"
            style={{ backgroundColor: "#90c33e", color: "#fff" }}
            variant=""
            href="/explore"
          >
            EXPLORE
          </Button>
        </div>
      </div>
    </>
  );
}

export default Hero;
