import React from "react";
import "./Gridview.css";
import mapleleaf from "./mapleleaf.jpg";

function Gridview() {
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

export default Gridview;
