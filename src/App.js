import React, { Component } from "react";
import Hero from "./Hero";
import Header from "./Header";
import Gridview from "./Gridview";
import "./App.css";
import mapleleaf from "./mapleleaf.jpg";

// import WrappedMap from "./MapView";

// const treeArray = [
//   {name: 'Maple', count: 34},
//   {name: 'Ash', count: 46},
//   {name: 'Cherry', count: 84},
//   {name: 'Plum', count: 54}
// ];

class App extends Component {
  state = {
    searchQuery: null,
    gridview: [
      { name: "Maple", count: 34, url: mapleleaf },
      { name: "Ash", count: 46, url: mapleleaf },
      { name: "Cherry", count: 84, url: mapleleaf },
      { name: "Plum", count: 54, url: mapleleaf }
    ]
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Hero />
        <Gridview
          gridview={this.state.gridview}
          // // gridview={this.state.gridview.filter(gridItem => {
          // //   return gridItem.name.includes(this.state.searchQuery);
          // // })
          // }
        />
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Hero />
//       <Gridview />
//       <div style={{ width: "100vw", height: "100vh" }}>
{
  /* <WrappedMap
          // Add &key=API_KEY when you get one to get out of DEV mode.
          isMarkerShown={false}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        /> */
}

//       </div>
//     </div>
//   );
// }

export default App;
