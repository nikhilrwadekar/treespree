import React from "react";
import "./Contact.css";


class Contact extends React.Component{



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
            this.setState({[nam]: val});
          }
          handleSubmit = () => {

            alert("Your age must be a number");



          }


    render()
    {
    return(
        <div className="ContactPage">
            <h1> CONTACT</h1>
             
            <form>
      <h1>Hello {this.state.name}{this.state.email}{this.state.message}</h1>
    
      <p>Name:</p>
      <input
        type='text'
        name='name'
        value={this.state.name}
        onChange={this.handleChange}
      /> 
        <p>Email:</p>
      <input
        type='email'
        name='email'
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


<textarea rows="4" cols="50" type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}></textarea>


      <br/>
      <br/>
      
        <input
          type="submit"
          name="Submit"
          value="Submit"
          onClick={this.handleSubmit}
        />
</form>

        </div>
        )
    }
}










export default Contact;