import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

class NeighbourhoodGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbourhoods: [],
      dataForGraph: [],
      filteredDataForGraph: [],
    };

    this.updateLegendRotation = this.updateLegendRotation.bind(this);
  }

  testFunction(passedNeighbourhoods) {
    let dataForGraph = [];
    let element = {};
    passedNeighbourhoods.map((neighbourhood) => {
      {
        let sum = 0;

        Object.getOwnPropertyNames(neighbourhood).forEach(function (
          val,
          idx,
          array
        ) {
          if (val == "neighbourhood") {
            element.neighbourhood = neighbourhood[val];
          } else if (val == "MAPLE") {
            element.MAPLE = neighbourhood[val];
          } else if (val == "ASH") {
            element.ASH = neighbourhood[val];
          } else if (val == "CHERRY") {
            element.CHERRY = neighbourhood[val];
          } else if (val == "PLUM") {
            element.PLUM = neighbourhood[val];
          } else if (val == "HORNBEAM") {
            element.HORNBEAM = neighbourhood[val];
          } else {
            sum = parseInt(neighbourhood[val]) + sum;
          }
        });
        element.OTHERS = sum;
      }
      dataForGraph.push(element);
      element = {};
    });

    this.setState({
      ...this.state,
      neighbourhoods: passedNeighbourhoods,
      dataForGraph: dataForGraph,
      filteredDataForGraph: dataForGraph,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Convert previous and current states into Strings for comparison
    let prevNeighbourhoods = JSON.stringify(prevProps.selectedNeighbourhoods);
    let currentNeighbourhoods = JSON.stringify(
      this.props.selectedNeighbourhoods
    );

    // If selection of neighbourhoods changes
    if (prevNeighbourhoods !== currentNeighbourhoods) {
      // Filter Graph Data based on selection
      let filteredDataForGraph = this.state.dataForGraph.filter(
        (neighbourhoodWithData) => {
          if (this.props.selectedNeighbourhoods)
            for (let selectedNeighbourhood of this.props
              .selectedNeighbourhoods) {
              if (
                neighbourhoodWithData.neighbourhood ===
                selectedNeighbourhood.label
              ) {
                return true;
              }
            }
        }
      );

      // If we have selections, render those
      if (filteredDataForGraph.length)
        this.setState({
          ...this.state,
          filteredDataForGraph,
        });
      // Reset the filter with all Graphs
      else
        this.setState({
          ...this.state,
          filteredDataForGraph: this.state.dataForGraph,
        });

      // IF CONDITION ENDS
    }
  }
  componentDidMount() {

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/neighbourhoods/neighbourhood-treetype-count`
      )
      .then((response) => {
        let neighbourhoods = response.data;
        this.testFunction(neighbourhoods);
      });

    this.updateLegendRotation();
    window.addEventListener("resize", this.updateLegendRotation);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateLegendRotation);
  }

  //viewport configuration
  // 'src/GridViewV2.js'
  updateLegendRotation() {
    let legendRotation,
      sliceLength,
      legendSpace,
      barPadding,
      windowWidth = window.innerWidth;
    if (windowWidth < 500) {
      legendRotation = -45;
      sliceLength = 3;
      legendSpace = 95;
      barPadding = 0.3;
    } else if (windowWidth >= 500 && windowWidth < 750) {
      legendRotation = -45;
      sliceLength = 4;
      legendSpace = 90;
      barPadding = 0.45;
    } else if (windowWidth >= 750) {
      legendRotation = 0;
      sliceLength = 5;
      legendSpace = 45;
      barPadding = 0.55;
    }
    this.setState({
      ...this.state,
      legendRotation,
      sliceLength,
      legendSpace,
      barPadding,
    });
  }

  render() {
    return (
      // Graph component developed with nivo library. https://nivo.rocks/bar
      // Nivo, an alternative to react d3, which provides server side rendering ability and fully declarative charts.
      <ResponsiveBar
        data={this.state.filteredDataForGraph.slice(0, this.state.sliceLength)}
        keys={["OTHERS", "HORNBEAM", "ASH", "PLUM", "CHERRY", "MAPLE"]}
        indexBy="neighbourhood"
        margin={{ top: 50, right: 120, bottom: 150, left: 100 }}
        padding={this.state.barPadding}
        groupMode="stacked"
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderRadius={4}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: this.state.legendRotation,
          legend: "Neighbourhoods",
          legendPosition: "middle",
          legendOffset: this.state.legendSpace,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Population",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        enableLabel={true}
        labelSkipWidth={25}
        labelSkipHeight={12}
        labelTextColor="#fff"
        legends={[
          {
            dataFrom: "keys",
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 106,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 28,
            itemsSpacing: 0,
            symbolSize: 20,
            itemDirection: "left-to-right",
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={10}
      />
    );
  }
}

export default NeighbourhoodGraph;
