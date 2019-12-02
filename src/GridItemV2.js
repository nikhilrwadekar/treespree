import React from "react";
import Popup from "reactjs-popup";
import "./GridItemV2.css";
import PopUpComponent from "./PopUp";

class GridItemV2 extends React.Component {
  state = {};

  render() {
    return (
      <Popup
        trigger={
          <div className="GridItemV2">
            {/* <a href={this.props.linkToPopUp}> */}
            <img
              className="GridItemV2-image"
              src={this.props.imageLink}
              alt=""
            />
            <p className="GridItemV2-title">{this.props.title.toLowerCase()}</p>
            {/* </a> */}
          </div>
        }
        modal
        closeOnDocumentClick
      >
        <PopUpComponent tree_name={this.props.title.toLowerCase()} />
        {/* TEST!! */}
      </Popup>
    );
  }
}

export default GridItemV2;
