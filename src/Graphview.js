import React, { Component } from "react";
import NeighbourhoodGraph from "./NeighbourhoodGraph";
import "./Graphview.css";
import SelectOption from "./SelectOption";

class Graphview extends Component {
  state = {
    selectedNeighbourhoods: []
  };

  getSelectedNeighbourhoods(selectedOptions) {
    this.setState({
      ...this.state,
      selectedNeighbourhoods: selectedOptions
    });
  }
  render() {
    return (
      <>
        <h2>Did You Know?</h2>
        <div className="factsDiv">
          <p className="factParagraph">
            In 2011, Vancouver adopted the goal of becoming the greenest city by 2020. As a result Vancouver's city tree population has been increased drastically.
          </p>
          <p className="factParahraph">
            Get to know the city tree population by neighbouhoods.
          </p>
          </div>
        <div>
          <div className="graphviewContainer">
            <SelectOption
              callbackFunction={this.getSelectedNeighbourhoods.bind(this)}
            />
            <NeighbourhoodGraph
              selectedNeighbourhoods={this.state.selectedNeighbourhoods}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Graphview;
