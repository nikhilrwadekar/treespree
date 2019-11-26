import React from "react";
import GridViewV2 from "./GridViewV2";
import WrappedMap from "./MapView";
import Switch, { Item } from "react-switchable";
import "react-switchable/dist/main.css";

class GridMapView extends React.Component {
  state = {
    activeOption: 1
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
        {/* https://codesandbox.io/s/react-switchable-alvarobernalg-lp823 */}

        <Switch
          name="mapOptions"
          onItemChanged={index => {
            this.setState({
              ...this.state,
              activeOption: index
            });
          }}
          arrowSelection
        >
          <Item value="1">GRID</Item>
          <Item value="2">MAP</Item>
        </Switch>
        {/* Component Toggler ENDS */}

        {this.state.activeOption == 1 && <GridViewV2 />}
        {/* Map View Starts */}
        {this.state.activeOption == 2 && (
          <div style={{ width: "100%", height: "800px" }}>
            <WrappedMap
              // Add &key=API_KEY when you get one to get out of DEV mode.
              isMarkerShown={false}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&v=3.exp&libraries=geometry,places`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={
                <div style={{ height: "80vh", minHeight: "600px" }} />
              }
            />
          </div>
        )}
        {/* Map View Ends */}
      </>
    );
  }
}

export default GridMapView;
