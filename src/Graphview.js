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
        <div className="factsDiv"></div>
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
