import React from "react";
import "./GridItem.css";

class GridItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="GridItem">
        <a href="#">
          <img src={this.props.imageSrc} className="GridItem-leaf-image" />

          <p className="GridItem-name">{this.props.name}</p>
        </a>
        <p className="GridItem-count">{this.props.count}</p>
      </li>
    );
  }
}

export default GridItem;
