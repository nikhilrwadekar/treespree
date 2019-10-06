import React from "react";

// Google Maps Import
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

// Street Trees Open Data
import * as treesData from "./data/StreetTrees_ArbutusRidge.json";

import "./MapView.css";

function MapView() {
  return (
    <div className="MapView">
      <h1>Map Here</h1>

      {/* Google Map Component */}
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 49.28273, lng: -123.120735 }}
      >
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
      </GoogleMap>
    </div>
  );
}

// Map Wrapper - Google Maps will NOT load without this.
const WrappedMap = withScriptjs(withGoogleMap(MapView));

export default WrappedMap;
