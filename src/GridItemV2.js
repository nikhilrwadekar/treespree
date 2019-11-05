import React from "react";
import "./GridItemV2.css";

class GridItemV2 extends React.Component {
  state = {
    leafLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Leaf_icon_15.svg/72px-Leaf_icon_15.svg.png"
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getDatafromTreeSpreeAPI();
  }

  getDatafromTreeSpreeAPI() {
    fetch("http://treespree.wmdd.ca/api/trees/names")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ treeCommonNames: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="GridItemV2">
        <a href={this.props.linkToPopUp}>
          <img className="GridItemV2-image" src={this.props.imageLink} alt="" />
          <p className="GridItemV2-title">{this.props.title.toLowerCase()}</p>
        </a>
      </div>
    );
  }
}

export default GridItemV2;
