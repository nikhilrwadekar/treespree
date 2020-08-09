import Select from "react-select";
import makeAnimated from "react-select/animated";
import React, { Component } from "react";
import Axios from "axios";

class SelectOption extends Component {
  state = {
    // Selected Options Array
    selectedOption: [],

    // Dropdown List - Neighbourhoods
    options: [],
  };

  componentWillMount() {
    // API Call
    Axios.get("https://treespree.wmdd.ca/api/neighbourhoods").then(
      (Response) => {
        // Get neighbourhoods and map them
        let optionsMapped = Response.data.map((neighbourhood) => {
          return {
            label: neighbourhood.neighbourhood_name,
            value: neighbourhood.neighbourhood_name,
          };
        });

        // Map Them
        this.setState({
          ...this.state,
          options: optionsMapped,
        });
      }
    );
  }

  // Handle change for 'Select'
  handleChange = (selectedOption) => {
    // Update the state with SelectedOption(s)
    this.setState({ ...this.state, selectedOption: selectedOption });

    // CallBack Function
    this.props.callbackFunction(selectedOption);

    console.log(`Option selected:`, selectedOption);
  };
  render() {
    return (
      <>
        <Select
          isMulti
          onChange={this.handleChange.bind(this)}
          options={this.state.options}
          components={makeAnimated()}
          placeholder="Select more than one neighbourhood(s).."
        />
      </>
    );
  }
}

export default SelectOption;
