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
      <>
        <div>
          <GridSearch />
        </div>

        <div className="Gridview">
          <ul className="Gridview-items">
            {/* {console.log(this.props.gridItemArray)} */}
            {this.props.gridItemArray.map(grid => (
              <GridItem
                imageSrc={"http://lorempixel.com/200/200/nature/"}
                name={grid.absolute_common_name_tree}
                count={Math.round(Math.random() * 10000)}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Gridview;
