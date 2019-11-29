import React from "react";
import "./Newsletter.css";
import { Button, Form } from "react-bootstrap";
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
        <h3>Get green event notifications and news updates from Treespree.</h3>
        <div className="subscribe-form">
          {/* <form>
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
          </form> */}

          <Form>
            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control type="email" placeholder="jennie@example.com" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
