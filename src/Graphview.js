import React, { Component } from "react";
import NeighbourhoodGraph from "./NeighbourhoodGraph";
import "./Graphview.css";
import SelectOption from "./SelectOption";

class Graphview extends Component {
  state = {
    selectedNeighbourhoods: [],
    selectionStatement: (
      <p>
        <b>Pick your neighbourhood to get started!</b>
      </p>
    )
  };

  getSelectedNeighbourhoods(selectedOptions) {
    let selectedLength = selectedOptions ? selectedOptions.length : 0;
    let selectionStatement;
    switch (selectedLength) {
      case 0:
        selectionStatement = (
          <p>
            <b>Pick your neighbourhood to get started!</b>
          </p>
        );
        break;
      case 1:
        selectionStatement = (
          <p>
            Select <b>one more</b> to start comparing!
          </p>
        );
        break;
      case 2:
        selectionStatement = (
          <p>
            Isn't this <b>cool</b>? Try one more!
          </p>
        );
        break;
      case 3:
        selectionStatement = (
          <p>
            You're the <b>best</b>!
          </p>
        );
        break;
      case 4:
        selectionStatement = (
          <p>Okay, we were just being nice. You need to slow down.</p>
        );
        break;
      case 5:
        selectionStatement = <p>Okay, now stop.</p>;
        break;
      case 6:
        selectionStatement = <p>We don't do that here.</p>;
        break;
      default:
        selectionStatement = <p>.. really?</p>;
    }

    // If selectedOptions go back to zero; set it to an empty Array else set it what it is.
    if (selectedOptions != null)
      this.setState({
        ...this.state,
        selectedNeighbourhoods: selectedOptions,
        selectionStatement
      });
    else
      this.setState({
        ...this.state,
        selectedNeighbourhoods: [],
        selectionStatement
      });
  }
  render() {
    return (
      <div className="GraphView">
        <h2>Did You Know?</h2>
        <div className="factsDiv">
          <p className="factParagraph">
            In 2011, Vancouver adopted the goal of becoming the greenest city by
            2020. As a result Vancouver's city tree population has been
            increased drastically.
          </p>
          <p className="factParagraph">
            Get to know the city tree population by neighbourhoods.
          </p>

          {this.state.selectionStatement}
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
      </div>
    );
  }
}

export default Graphview;
