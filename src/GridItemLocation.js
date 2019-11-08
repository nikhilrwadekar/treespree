import React from "react";
// import "./GridItem.css";

class GridItemLocation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="GridItemLocation">
        
          {/* <img src={this.props.imageSrc} className="GridItem-leaf-image" /> */}

          <p className="GridItem-location-name">{this.props.name}</p>
        
        {/* <p className="GridItem-count">{this.props.count}</p> */}
      </li>
    );
  }
}

export default GridItemLocation;
