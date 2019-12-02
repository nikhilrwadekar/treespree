import React from "react";
import Popup from "reactjs-popup";
import "./GridItemV2.css";
import PopUpComponent from "./PopUp";

class GridItemV2 extends React.Component {
  state = {};

  render() {
    return (
      <>
        {this.props.windowSize !== "s" && this.props.windowSize !== "xs" && (
          <Popup
            trigger={
              <div className="GridItemV2">
                <img
                  className="GridItemV2-image"
                  src={this.props.imageLink}
                  alt=""
                />
                <p className="GridItemV2-title">
                  {this.props.title.toLowerCase()}
                </p>
                {/* </a> */}
              </div>
            }
            modal
            closeOnDocumentClick
          >
            <PopUpComponent tree_name={this.props.title.toLowerCase()} />
          </Popup>
        )}

        {(this.props.windowSize === "s" || this.props.windowSize === "xs") && (
          <div className="GridItemV2">
            <a href={this.props.linkToPopUp}>
              <img
                className="GridItemV2-image"
                src={this.props.imageLink}
                alt=""
              />
              <p className="GridItemV2-title">
                {this.props.title.toLowerCase()}
              </p>
            </a>
          </div>
        )}
      </>
    );
  }
}

export default GridItemV2;
