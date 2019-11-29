/* global google */

import React from "react";
import axios from "axios";
import PopUp from "./PopUp";
// import ReactDOMServer from "react-dom/server";

// Google Maps Import
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  StreetViewPanorama,
  OverlayView,
  InfoWindow,
  Polygon
} from "react-google-maps";

// Import CSS
import "./MapView.css";
import { Button } from "react-bootstrap";

// Import InfoBox
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

// Import SearchBox
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

// Declare the Component itself
class MapView extends React.Component {
  state = {
    trees: [],
    defaultZoom: 18,
    isMapView: true
  };
  constructor(props) {
    super(props);
  }

  // After the component is mounted..
  componentDidMount() {
    // Set Data Layer
    axios
      .get(
        "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/vancouver.geojson"
      )
      .then(response => {
        // this.map.addGeoJson(data);
        this.setState({ ...this.state, geoJSON: response.data });
      });
    // https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/vancouver.geojson

    // this.map.loadGeoJson(
    //   "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/vancouver.geojson"
    // );
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
  handleMapUpdate() {
    // Current Zoom Level
    let currentZoomLevel = this.map.getZoom();

    // Get current trees bound by current view from API..
    if (currentZoomLevel >= 18) {
      console.log("You're zoomed in enough! Updating Trees on map..");
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
    } else if (currentZoomLevel < 18) {
      // this.map.data.addGeoJson(this.state.geoJSON);

      this.setState({
        trees: []
      });
    }
    console.log("Current Zoom:" + currentZoomLevel);
  }

  //
  onBoundsChanged() {
    console.log("Map Bounds Changed!");
  }

  // StreeView Handler! :D - Special Thanks to https://codepen.io/moutono/pen/KjZpZB
  streetViewHandler = (coordinates, tree) => {
    console.log("StreetView Handler has run!");
    // Create Street View
    let panorama = this.map.getStreetView();
    panorama.setPosition(coordinates);
    // panorama.setPov({
    //   heading: 34,
    //   pitch: 10
    // });
    panorama.setVisible(true);

    let streetViewInfowindow = new google.maps.InfoWindow({
      content: `<div class="streetViewInfo">
      <p>Name: <h3>${tree.common_name_tree.toLowerCase()}</h3></p>
      
      <p>Genus: <h4>${tree.genus_name.toLowerCase()}</h4></p>
      <p>Species: <h4>${tree.species_name.toLowerCase()}</h4></p>
      <p>Population: <h5>${tree.common_name_tree_count}</h5></p></div>
      `,
      pixelOffset: new google.maps.Size(0, -25)
    });

    streetViewInfowindow.setPosition(coordinates);
    streetViewInfowindow.open(panorama);
  };

  onIdle() {
    console.log("Now Idle..");
    this.handleMapUpdate();
    console.log(this.state.streetView);
  }

  // CITE THIS!!!!!
  showInfo(a) {
    console.log(this);
    // If Tree ID is new, update the current InfoWindow index, else set it to null to toggle!
    if (this.state.showInfoIndex !== a) this.setState({ showInfoIndex: a });
    else this.setState({ showInfoIndex: null });
    // console.log(this.map.getStreetView().setVisible(true));
  }

  render() {
    return (
      <div className="MapView">
        {/* Google Map Component - centered to Vancouver */}
        <GoogleMap
          ref={ref => {
            this.map = ref;
          }}
          // defaultOptions={{}}
          defaultZoom={18}
          // zoom={this.state.defaultZoom}
          defaultCenter={{ lat: 49.2258331, lng: -123.1078227 }}
          // Pass this.map instead of this as you need to bind map's this
          onZoomChanged={this.handleMapUpdate.bind(this)}
          onIdle={this.onIdle.bind(this)}

          // streetView={}
        >
          {/* <MarkerClusterer averageCenter gridSize={60}> */}
          {/* The Marker Loop for the Map */}
          {this.state.trees.map(tree => (
            <div>
              {/* Marker for the Marker Clusterer */}
              <Marker
                icon={
                  new google.maps.MarkerImage(
                    `/png/leaves/${tree.absolute_common_name.toLowerCase()}.png`,
                    null,
                    null,
                    null,
                    new google.maps.Size(50, 50)
                  )
                }
                key={tree.tree_id}
                position={{
                  lat: tree.tree_latitude,
                  lng: tree.tree_longitude
                }}
                title={tree.common_name}
                onClick={() => {
                  this.showInfo(tree.tree_id);
                  console.log("Marker Clicked!");
                  if (
                    this.map.getStreetView().getVisible() &&
                    this.state.showInfoIndex === tree.tree_id
                  )
                    this.streetViewHandler(
                      {
                        lat: tree.tree_latitude,
                        lng: tree.tree_longitude
                      },
                      tree
                    );
                }}
              >
                {/* InfoBox for the Marker */}
                {this.state.isMapView &&
                  this.state.showInfoIndex == tree.tree_id && (
                    <InfoWindow
                      defaultPosition={
                        new window.google.maps.LatLng(
                          tree.tree_latitude,
                          tree.tree_longitude
                        )
                      }
                      options={{
                        closeBoxURL: ``,
                        enableEventPropagation: true,
                        pixelOffset: new google.maps.Size(0, -50)
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: `white`,
                          opacity: 1,
                          padding: `12px`,
                          borderRadius: "10px",
                          width: "500px"
                        }}
                      >
                        <div className="mapView-PopUp">
                          <PopUp tree_id={tree.tree_id} />
                        </div>

                        {/* Render Street View with the current Co-ordinates! */}
                        <Button
                          onClick={this.streetViewHandler.bind(
                            this,
                            {
                              lat: tree.tree_latitude,
                              lng: tree.tree_longitude
                            },
                            tree
                          )}
                        >
                          Virtual Tour
                        </Button>
                      </div>
                    </InfoWindow>
                  )}
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
