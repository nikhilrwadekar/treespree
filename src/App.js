import React from "react";
import "./App.css";
import Hero from "./Hero";
import Header from "./Header";
import "./App.css";
import Single from "./Single";
import Shop from "./Shop";
import Contact from "./Contact";
import Terms from "./Terms";
import Team from "./teamPage";
import Footer from "./Footer";
import GridMapView from "./GridMapView";
import Graphview from "./Graphview";
import Newsletter from "./Newsletter";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

        <Router>
          <Route exact path="/">
            <Hero />
            <Graphview />
            {/* Newsletter Component Here */}
            <Newsletter />
          </Route>

          <Route exact path="/explore">
            <GridMapView />
          </Route>

          {/* Link for Directly opening Map View */}
          <Route exact path="/explore/:activeOption" component={GridMapView} />

          {/* Single Component accessed with Tree ID (Sent from Map View) */}
          <Route exact path="/tree/id/:tree_id" component={Single} />
          {/* Single Component accessed with Tree Name (Sent from Map Grid View) */}
          <Route exact path="/tree/name/:tree_name" component={Single} />

          <Route exact path="/contact">
            <Contact />
          </Route>

          <Route exact path="/termsAndCondition">
            <Terms />
          </Route>

          <Route exact path="/shop">
            <Shop />
          </Route>

          <Route exact path="/shopv2">
            <ShopV2 />
          </Route>

          <Route exact path="/team">
            <Team />
          </Route>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
