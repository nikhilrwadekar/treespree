import React, { Component } from "react";
import Hero from "./Hero";
import Header from "./Header";
import Gridview from "./Gridview";
import "./App.css";
import TeamPage from "./teamPage";
import Footer from "./Footer";
import WrappedMap from "./MapView";
import Axios from "axios";
import Gridviewlocation from "./GridViewLocation";

class App extends React.Component {
  // If componentDidMount - Do this.. (Lifecycle Hook)
  componentDidMount() {
    // When the App component is mounted, call the TreeSpree API, get the data and store it in the state
    // Storing it in the state as 'dataFromTreespreeAPI'

    Axios.get("http://treespree.wmdd.ca/api/trees/types")
      .then(response => {
        // Store the API data in a local variable absoluteCommonNames
        let absoluteCommonNames = response.data;

        // Assign it to the state variable - 'dataFromTreespreeAPI'
        this.setState({
          // Retain the original state with a spread operator.. otherwise the other state variables will be lost.
          ...this.state,
          dataFromTreespreeAPI: absoluteCommonNames
        });
      })
      .catch(error => {
        console.log(error);
      });

    Axios.get("http://treespree.wmdd.ca/api/neighbourhoods")
      .then(response => {
        // Store the API data in a local variable absoluteCommonNames
        let neighbourhoodNames = response.data;

        // Assign it to the state variable - 'dataFromTreespreeAPI'
        this.setState({
          // Retain the original state with a spread operator.. otherwise the other state variables will be lost.
          ...this.state,
          neighbourhoodsFromTreespreeAPI: neighbourhoodNames
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderGridView() {
    return <Gridview gridItemArray={this.state.dataFromTreespreeAPI} />;
  }

  renderGridViewLocation() {
    return (
      <Gridviewlocation
        gridItemLocationArray={this.state.neighbourhoodsFromTreespreeAPI}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      dataFromTreespreeAPI: [],
      neighbourhoodsFromTreespreeAPI: []
    };
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Hero />

        {/* Showing all the trees based on absolutely common names */}
        {this.state.dataFromTreespreeAPI.length ? (
          this.renderGridView()
        ) : (
          <span>Loading Grid View...</span>
        )}

        {/* Showing all the neighbourhoods */}
        {this.state.neighbourhoodsFromTreespreeAPI.length ? (
          this.renderGridViewLocation()
        ) : (
          <span>Loading Locations...</span>
        )}
        <div style={{ width: "100vw", height: "100vh" }}>
          <TeamPage />
          <WrappedMap
            // Add &key=API_KEY when you get one to get out of DEV mode.
            isMarkerShown={false}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
