import React from "react";
import "./GridViewV2.css";
import GridItemV2 from "./GridItemV2";

class GridViewV2 extends React.Component {
  state = {
    leafLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Leaf_icon_15.svg/72px-Leaf_icon_15.svg.png",
    treeCommonNames: [],
    limitPerPage: 12
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
        this.setState({ ...this.state, treeCommonNames: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="GridViewV2">
        {this.state.treeCommonNames
          .slice(0, this.state.limitPerPage)
          .map(treeCommonName => {
            return (
              <GridItemV2
                imageLink={this.state.leafLink}
                title={treeCommonName.common_name}
                linkToPopUp={"/tree/" + treeCommonName.common_name_id}
              />
            );
          })}
      </div>
    );
  }
}

export default GridViewV2;
