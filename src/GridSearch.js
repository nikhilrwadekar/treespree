import React from "react";
import "./GridSearch.css";
import { Button } from "./Button";
// import GridAdvancedSearch from "./GridAdvancedSearch";
import Axios from "axios";
import Suggestions from "./Suggestions.js";

const API_URL = "https://treespree.wmdd.ca/api/trees/types";

class GridSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    query: "",
    results: [],
  };

  getInfo = () => {
    Axios.get(`${API_URL}&prefix=${this.state.query}&limit=7`).then(
      ({ data }) => {
        this.setState({
          results: data.data,
        });
      }
    );
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.gridsearch.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  };

  render() {
    return (
      <>
        <form>
          <input
            type="search"
            placeholder="Search for"
            id="grid-search"
            name="grid-search-field"
            ref={(input) => (this.gridsearch = input)}
            onChange={this.handleInputChange}
          ></input>
          <Suggestions results={this.state.results} />
        </form>

        <Button label="Location" bgColor="#33cccc" font="Times New Roman" />
        {/* <Button label="Find Blah" bgColor="#aaa" font="Karla" /> */}
        {/* <Button label="Jasmine" classes="bg-color-pink" /> */}
        {/* <Button label="Find Trees" bgColor="red" /> */}
      </>
    );
  }
}

export default GridSearch;
