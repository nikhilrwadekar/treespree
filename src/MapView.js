import React from "react";

// Google Maps Import
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

// Street Trees Open Data
import * as treesData from "./data/StreetTrees_CityWide.json";

import "./MapView.css";

// const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

class MapView extends React.Component {
  componentDidMount() {
    // Bounds for North America
    let bounds = [(28.7, -127.5), (48.85, -55.9)];
    this.map.fitBounds(bounds);
  }

  render() {
    return (
      <div className="MapView">
        <h1>Map Here</h1>

        {/* Google Map Component */}
        <GoogleMap
          ref={ref => {
            this.map = ref;
          }}
          defaultZoom={10}
          defaultCenter={{ lat: 49.28273, lng: -123.120735 }}
        >
          <SearchBox>
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
          </SearchBox>
          <MarkerClusterer averageCenter gridSize={60}>
            {/* The Marker Loop for the Map */}
            {treesData.features.map(tree => (
              <Marker
                key={tree.properties.TREE_ID}
                position={{
                  lat: tree.geometry.coordinates[1],
                  lng: tree.geometry.coordinates[0]
                }}
              />
            ))}
          </MarkerClusterer>
        </GoogleMap>
      </div>
    );
  }
}

// Map Wrapper - Google Maps will NOT load without this.
const WrappedMap = withScriptjs(withGoogleMap(MapView));

export default WrappedMap;
