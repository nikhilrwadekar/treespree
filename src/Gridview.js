import React, { Component } from "react";
import "./Gridview.css";
import mapleleaf from "./mapleleaf.jpg";
import GridItem from "./GridItem";
import GridSearch from "./GridSearch";
class Gridview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(q)
    return (
      <>
        <div>
          <GridSearch />
        </div>

        <div className="grid-view">
          <ul className="grid-images">
            {this.props.gridview.map(grid => (
              <GridItem
                imageSrc={grid.url}
                name={grid.name}
                count={grid.count}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Gridview;
