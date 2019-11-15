import React from "react";
import GridViewV2 from "./GridViewV2";
import WrappedMap from "./MapView";

class GridMapView extends React.Component {
  state = {
    gridViewIsActive: true,
    mapViewIsActive: false
  };

  // This 'lifecycle hook' or function will run BEFORE the component is rendered. Pretty useful to set data from external API into the state.
  componentWillMount() {}

  // If the component renders..
  componentDidMount() {}

  toggleMapGrid() {
    this.setState({
      gridViewIsActive: !this.state.gridViewIsActive,
      mapViewIsActive: !this.state.mapViewIsActive
    });
  }

  render() {
    return (
      <>
        {/* Component Toggler STARTS */}
        <button onClick={this.toggleMapGrid.bind(this)}>TOGGLE</button>
        {/* Component Toggler ENDS */}

        {this.state.gridViewIsActive && <GridViewV2 />}
        {/* Map View Starts */}
        {this.state.mapViewIsActive && (
          <div style={{ width: "100%", height: "800px" }}>
            <WrappedMap
              // Add &key=API_KEY when you get one to get out of DEV mode.
              isMarkerShown={false}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&v=3.exp&libraries=geometry,places`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            />
          </div>
        )}
        {/* Map View Ends */}
      </>
    );
  }
}

export default GridMapView;
