import React, { Component } from "react";
import "./Gridview.css";
import GridItem from "./GridItem";
import GridSearch from "./GridSearch";

class Gridview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Gridview">
        <h2>Grid View</h2>

        <div className="grid-images">
          <img src={mapleleaf} alt="" className="grid-view" />

          <img src={mapleleaf} alt="" className="grid-view" />

          <img src={mapleleaf} alt="" className="grid-view" />

          <img src={mapleleaf} alt="" className="grid-view" />
        </div>
      </div>
    );
  }
}

export default Gridview;
