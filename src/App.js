import React from "react";
import "./App.css";
import Popup from "reactjs-popup";
import Hero from "./Hero";
import Header from "./Header";
import "./App.css";
import Single from "./Single";
import Contact from "./Contact";
import Gridview from "./Gridview";
import Terms from "./Terms";
import Team from "./teamPage";
import Footer from "./Footer";
import WrappedMap from "./MapView";
import GridViewV2 from "./GridViewV2";
import Graphview from "./Graphview";
import PopUp from "./PopUp";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


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
   
 
<Router>
      <Route exact path="/">
      <Header />
        <Hero />

        <Popup trigger={<button> Open POP Up</button>} position="right center">
          <PopUp/>
        </Popup>

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


      </Route>
      
      <Route exact path="/single">
            <Header />
            <Single />
            <Footer />
      </Route>
      <Route exact path="/contact">
             <Header />
             <Contact />
             <Footer />
      </Route>
      <Route exact path="/termsAndCondition">
            <Header />
             <Terms />
             <Footer />
      </Route>
      <Route exact path="/team">
              <Header />
             <Team />
             <Footer />
      </Route>
      <Route exact path="/popUp">
           
             <PopUp />
             
      </Route>
</Router>

      </div>
    );
  }
}

export default App;


