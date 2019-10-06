import React from "react";
import Hero from "./Hero";
import "./App.css";
import WrappedMap from "./MapView";

function App() {
  return (
    <div className="App">
      <Hero />
      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          // Add &key=API_KEY when you get one to get out of DEV mode.
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </div>
  );
}

export default App;
