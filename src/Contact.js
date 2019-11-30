import React from "react";
import "./Contact.css";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  handleSubmit = () => {
    alert("Your age must be a number");
  };

  render() {
    return (
      <div className="contact-image-form">
        <div className="contact-section">
          <div className="contact-image">
            <img src="/images/contact-image/leaf.jpg" alt="Maple Leaf" />
          </div>
          <div className="ContactPage">
            <h1> CONTACT</h1>
            <p className="welcome-message">
              Thank you for visiting our website. Feel free to talk to us or
              send us a message.
            </p>

            <form>
              <p>Name:</p>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <p>Message:</p>
              {/* <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
          
        /> */}

              <textarea
                rows="4"
                cols="50"
                type="text"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
              ></textarea>

              <br />
              <br />

              <input
                type="submit"
                name="Submit"
                value="Submit"
                onClick={this.handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
