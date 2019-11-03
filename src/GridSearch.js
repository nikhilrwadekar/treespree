import React from "react";
import "./GridSearch.css";
import { Button } from "./Button";
// import GridAdvancedSearch from "./GridAdvancedSearch";

class GridSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    alert("Hello! You're searching");
  }
  render() {
    return (
      <>
        <input type="search" id="grid-search" name="grid-search-field"></input>
        <Button label="Find Trees" bgColor="#33cccc" font="Times New Roman" />
        <Button label="Find Blah" bgColor="#aaa" font="Karla" />
        <Button label="Jasmine" classes="bg-color-pink" />
        <Button label="Find Trees" bgColor="red" />
      </>
    );
  }
}

export default GridSearch;
