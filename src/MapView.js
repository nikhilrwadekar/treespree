/* global google */

import React from "react";
import axios from "axios";

// Google Maps Import
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

// Import CSS
import "./MapView.css";

// Import InfoBox
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

// Import SearchBox
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

// Import Marker Clusterer
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

// Declare the Component itself
class MapView extends React.Component {
  state = {
    trees: []
  };
  constructor(props) {
    super(props);
  }

  // After the component is mounted..
  componentDidMount() {
    // Call the treeSpree API
  }

  getTreeDataAndStoreInState(boundingBox) {
    axios
      .get(
        `http://treespree.wmdd.ca/api/trees?bbtlx=${boundingBox.NorthWestX}&&bbtly=${boundingBox.NorthWestY}&&bbbrx=${boundingBox.SouthEastX}&&bbbry=${boundingBox.SouthEastY}`
      )
      .then(res => {
        const trees = res.data;
        this.setState({ trees: trees });
      });
  }

  // On Zoom Change function (Handler)
  handleZoomChanged() {
    // zoomChanged && zoomLevel && bounds!

    // Current Zoom Level
    let currentZoomLevel = this.map.getZoom();

    // If Current Zoom Level is >= 18 &
    // Get current trees bound by current view from API..

    // Code Courtesy: Stackoverflow - User: Mario Rossi
    if (currentZoomLevel >= 20) {
      // Derive NE and SW
      let NE = this.map.getBounds().getNorthEast();
      let SW = this.map.getBounds().getSouthWest();

      // Bounding Box
      let boundingBox = {
        NorthWestX: NE.lat(),
        NorthWestY: SW.lng(),
        SouthEastX: SW.lat(),
        SouthEastY: NE.lng()
      };
      // Point is in bounding box
      console.log("Ready to pull data!");
      console.log(boundingBox);

      this.getTreeDataAndStoreInState(boundingBox);
    } else {
      this.setState({
        trees: []
      });
    }
    console.log("Zoom Changed!:" + currentZoomLevel);
  }

  render() {
    return (
      <div className="MapView">
        {/* Google Map Component - centered to Vancouver */}
        <GoogleMap
          ref={ref => {
            this.map = ref;
          }}
          defaultZoom={10}
          defaultCenter={{ lat: 49.28273, lng: -123.120735 }}
          // Pass this.map instead of this as you need to bind map's this
          onZoomChanged={this.handleZoomChanged.bind(this)}
        >
          {/* <SearchBox>
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`
              }}
            />
          </SearchBox> */}
          {/* <MarkerClusterer averageCenter gridSize={60}> */}
          {/* The Marker Loop for the Map */}
          {this.state.trees.map(tree => (
            <div>
              {/* Marker for the Marker Clusterer */}
              <Marker
                // icon={{
                //   url: `/svg/leaves/${tree.absolute_common_name}.svg`,
                //   scale: 0.5
                // }}
                key={tree.tree_id}
                position={{
                  lat: tree.tree_latitude,
                  lng: tree.tree_longitude
                }}
                title={tree.common_name}
              >
                {/* InfoBox for the Marker */}
                <InfoBox
                  defaultPosition={
                    new window.google.maps.LatLng(
                      tree.tree_latitude,
                      tree.tree_longitude
                    )
                  }
                  options={{ closeBoxURL: ``, enableEventPropagation: true }}
                >
                  <div
                    style={{
                      backgroundColor: `yellow`,
                      opacity: 0.75,
                      padding: `12px`
                    }}
                  >
                    <div
                      style={{
                        fontSize: `16px`,
                        fontColor: `#08233B`,
                        fontFamily: "Karla"
                      }}
                    >
                      <a
                        style={{
                          fontSize: `14px`,
                          textTransform: "capitalize",
                          fontStyle: "italic"
                        }}
                        href={`/tree/id/${tree.tree_id}`}
                      >
                        {/* .toLowerCase() */}
                        {tree.common_name}
                      </a>
                    </div>
                  </div>
                </InfoBox>
              </Marker>
            </div>
          ))}
          {/* </MarkerClusterer> */}
        </GoogleMap>
      </div>
    );
  }
}

// Map Wrapper - Google Maps will NOT load without this.
const WrappedMap = withScriptjs(withGoogleMap(MapView));

export default WrappedMap;
