import React from "react";
import "./Contact.css";


// Refference for contact page https://reactjs.org/docs/forms.html

class Contact extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
    // binding handleChange function with this.
    this.handleChange = this.handleChange.bind(this);
  }
  

//function that handles changes in input field and assign values to state
  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    // setting all value from contact page to state(where name is the field name(email) or value(ss@gmail.com) conatins value )
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="contact-image-form">
        <div className="contact-section">
          <div className="contact-image">
            <img src="/images/contact-image/leaf.jpg" alt="Maple Leaf" />
          </div>
          <div className="ContactPage">
            <h1> CONTACT</h1>
            <p>
              Thank you for visiting our website. Feel free to send us a message.
            </p>

            <form action="/submit" method="POST">
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
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
