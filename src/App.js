import React from "react";
import "./App.css";

// import Gridview from "./Gridview";
// import TeamPage from "./teamPage";

// Import all Components
import Hero from "./Hero";
import Header from "./Header";
import Footer from "./Footer";
import WrappedMap from "./MapView";
import GridViewV2 from "./GridViewV2";
import Graphview from "./Graphview";

// App Component
class App extends React.Component {
  state = {};

  // This 'lifecycle hook' or function will run BEFORE the component is rendered. Pretty useful to set data from external API into the state.
  componentWillMount() {}

  // If the component renders..
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Header />
        <Hero />
        <Graphview/>
        <GridViewV2 />
        {/* Pagination Goes Here */}
        <div style={{ width: "100vw", height: "100vh" }}>
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
