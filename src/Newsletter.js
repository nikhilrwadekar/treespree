import React from "react";
import "./Newsletter.css";

function Newsletter() {
  return (
    <div className="newsletter">
      <div className="img">
        <img
          src="/svg/graphics/newslettergraphic.svg"
          alt="Newsletter"
          className="newsletter-graphic"
        />
      </div>

      <div className="newsletter-text">
        <h2>Sign up for our newsletter</h2>
        <h3>Get green events notifications and news updates from Treespree.</h3>
        <div className="subscribe-form">
          <form>
            <input
              type="email"
              name="email"
              placeholder="jennie@example.com"
              className="input-email"
            ></input>
            <input
              type="submit"
              value="Subscribe"
              className="subscribe"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
