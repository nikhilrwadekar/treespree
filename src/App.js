import React from "react";
import Hero from "./Hero";
import Header from "./Header";
import Gridview from "./Gridview";
import "./App.css";
import TeamPage from "./teamPage";
import Footer from "./Footer";
// import WrappedMap from "./MapView";
// import Axios from "axios";
import Graphview from "./Graphview";


function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Hero /> */}
      {/* <Gridview /> */}
      <div style={{ width: "100vw", height: "100vh" }}>

      {/* <TeamPage /> */}
        {/* <WrappedMap
          // Add &key=API_KEY when you get one to get out of DEV mode.
          isMarkerShown={false}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        /> */}
      </div>
      <Graphview/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
