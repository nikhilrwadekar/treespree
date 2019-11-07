import React from "react";
// Get styles for Button component from Button.css
import "./Button.css";

// Define a new component Button that will inherit React's Component class! :D
export class Button extends React.Component {
  constructor(props) {
    // Get all props from React Component class
    super(props);
  }
  render() {
    return (
      <button
        // Get styles from props and assign them in inline fashion
        style={{
          backgroundColor: this.props.bgColor,
          fontFamily: this.props.font
        }}
        // Assign Classes defined by props 'classes'
        className={this.props.classes}
      >
        {/* Set the Button text to the one defined by props 'label' */}
        {this.props.label}
      </button>
    );
  }
}

Button.defaultProps = {
  // Default props values, in case they are not defined whenever used.
  font: "Karla",
  label: "Explore",
  classes: ""
};

// Export the Button class by default when being imported by other classes or whatever.
export default Button;
