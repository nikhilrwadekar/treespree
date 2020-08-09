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
  Polygon,
} from "react-google-maps";

// Import CSS
import "./MapView.css";
import { Button } from "react-bootstrap";

// Import SearchBox
const {
  SearchBox,
} = require("react-google-maps/lib/components/places/SearchBox");

// Declare the Component itself
class MapView extends React.Component {
  state = {
    trees: [],
    zoom: 18,
    isMapView: true,
    center: { lat: 49.2259162, lng: -123.10982159999999 },
  };
  constructor(props) {
    super(props);
  }

  //
  componentWillMount() {}
  // After the component is mounted..
  componentDidMount() {
    // Set Data Layer
    axios
      .get(
        "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/vancouver.geojson"
      )
      .then((response) => {
        // this.map.addGeoJson(data);
        this.setState({ ...this.state, geoJSON: response.data });
      });

    // Get Location
    navigator.geolocation.getCurrentPosition(
      (success) => {
        let mapCenter = {
          lat: success.coords.latitude,
          lng: success.coords.longitude,
        };

        this.setState({
          ...this.state,
          center: mapCenter,
        });
      },
      (error) => {}
    );
  }

  getTreeDataAndStoreInState(boundingBox) {
    axios
      .get(
        `https://treespree.wmdd.ca/api/trees?bbtlx=${boundingBox.NorthWestX}&&bbtly=${boundingBox.NorthWestY}&&bbbrx=${boundingBox.SouthEastX}&&bbbry=${boundingBox.SouthEastY}`
      )
      .then((res) => {
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
      // Derive NE and SW
      let NE = this.map.getBounds().getNorthEast();
      let SW = this.map.getBounds().getSouthWest();

      // Bounding Box
      let boundingBox = {
        NorthWestX: NE.lat(),
        NorthWestY: SW.lng(),
        SouthEastX: SW.lat(),
        SouthEastY: NE.lng(),
      };
      // Point is in bounding box

      this.getTreeDataAndStoreInState(boundingBox);
    } else if (currentZoomLevel < 18) {
      // this.map.data.addGeoJson(this.state.geoJSON);

      this.setState({
        trees: [],
      });
    }
  }

  //
  onBoundsChanged() {}

  // StreeView Handler! :D - Special Thanks to https://codepen.io/moutono/pen/KjZpZB
  streetViewHandler = (coordinates, tree) => {
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
      pixelOffset: new google.maps.Size(0, -25),
    });

    streetViewInfowindow.setPosition(coordinates);
    streetViewInfowindow.open(panorama);
  };

  onIdle() {
    this.handleMapUpdate();
  }

  // https://github.com/tomchentw/react-google-maps/issues/753
  showInfo(a) {
    // If Tree ID is new, update the current InfoWindow index, else set it to null to toggle!
    if (this.state.showInfoIndex !== a) this.setState({ showInfoIndex: a });
    else this.setState({ showInfoIndex: null });
    //
  }

  // Function from https://tomchentw.github.io/react-google-maps/
  onPlacesChanged() {
    let placeCenter = {
      lat: this.searchBox.getPlaces()[0].geometry.location.lat(),
      lng: this.searchBox.getPlaces()[0].geometry.location.lng(),
    };

    this.setState({
      ...this.state,
      center: placeCenter,
    });
  }

  render() {
    return (
      <div className="MapView">
        {/* Google Map Component - centered to Vancouver */}
        <GoogleMap
          ref={(ref) => {
            this.map = ref;
          }}
          // defaultOptions={{}}
          zoom={this.state.zoom}
          // zoom={this.state.defaultZoom}
          center={this.props.center ? this.props.center : this.state.center}
          // Pass this.map instead of this as you need to bind map's this
          onZoomChanged={this.handleMapUpdate.bind(this)}
          onIdle={this.onIdle.bind(this)}

          // streetView={}
        >
          <SearchBox
            ref={(ref) => {
              this.searchBox = ref;
            }}
            // bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_RIGHT}
            onPlacesChanged={this.onPlacesChanged.bind(this)}
          >
            <input
              type="text"
              placeholder="Search for a place.."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `50px`,
                marginTop: `27px`,
                marginRight: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `18px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </SearchBox>
          {/* <MarkerClusterer averageCenter gridSize={60}> */}
          {/* The Marker Loop for the Map */}
          {this.state.trees.map((tree) => (
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
                  lng: tree.tree_longitude,
                }}
                title={tree.common_name}
                onClick={() => {
                  this.showInfo(tree.tree_id);
                  this.setState({
                    ...this.state,
                    zoom: 20,
                  });

                  if (
                    this.map.getStreetView().getVisible() &&
                    this.state.showInfoIndex === tree.tree_id
                  )
                    this.streetViewHandler(
                      {
                        lat: tree.tree_latitude,
                        lng: tree.tree_longitude,
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
                        pixelOffset: new google.maps.Size(0, -50),
                      }}
                      onCloseClick={() => {
                        this.showInfo(tree.tree_id);
                        this.setState({ ...this.state, zoom: 18 });
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: `white`,
                          opacity: 1,
                          padding: `12px`,
                          borderRadius: "10px",
                          width: "500px",
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
                              lng: tree.tree_longitude,
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
