import React, { Component } from "react";
// import "./Gridview.css";
import GridItemLocation from "./GridItemLocation";
// import GridSearch from "./GridSearch";
class GridViewLocation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
      <div className="Gridviewlocation">
          <h2>Neighbourhoods</h2>
          <ul className="Gridview-items-locations">
            {/* {console.log(this.props.gridItemArray)} */}
            {this.props.gridItemLocationArray.map(grid => (
              <GridItemLocation
                
                name={grid.neighbourhood_name}
                // count={Math.round(Math.random() * 10000)}
              />
            ))}
          </ul>
        </div>
        

        
      </>
    );
  }
}

export default GridViewLocation;
