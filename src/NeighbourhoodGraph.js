import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

class NeighbourhoodGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbourhoods: [],
      dataForGraph: []
    };
  }

  testFunction(passedNeighbourhoods) {
    let dataForGraph = [];
    let element = {};
    passedNeighbourhoods.map(neighbourhood => {
      {
        let sum = 0;

        Object.getOwnPropertyNames(neighbourhood).forEach(function(
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
      dataForGraph: dataForGraph
    });
  }

  componentWillUpdate() {
    console.log("COMPONENT DID UPDATE");

    let dataForGraph = this.state.dataForGraph;
    let updatedDataForGraph = [];
    // < 5 logic
    if (this.props.selectedNeighbourhoods.length) {
      updatedDataForGraph = dataForGraph.filter(
        neighbourhoodItem =>
          neighbourhoodItem.neighbourhood ==
          this.props.selectedNeighbourhoods[0].value
      );
      console.log(updatedDataForGraph);
    }

    // BROKEN LOGIC
    // this.setState({
    //   ...this.state,
    //   dataForGraph: updatedDataForGraph
    // });
  }
  componentDidMount() {
    console.log("COMPONENT DID MOUNT");

    axios
      .get(
        "http://treespree.wmdd.ca/api/neighbourhoods/neighbourhood-treetype-count"
      )
      .then(response => {
        let neighbourhoods = response.data;
        this.testFunction(neighbourhoods);
        // console.log(dataForGraph);
      });
  }

  render() {
    return (
      <ResponsiveBar
        data={this.state.dataForGraph.slice(0, 5)}
        keys={["OTHERS", "HORNBEAM", "ASH", "PLUM", "CHERRY", "MAPLE"]}
        indexBy="neighbourhood"
        margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
        padding={0.55}
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
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: "fries"
            },
            id: "dots"
          },
          {
            match: {
              id: "sandwich"
            },
            id: "lines"
          }
        ]}
        borderRadius={4}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "neighbourhoods",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "population",
          legendPosition: "middle",
          legendOffset: -40
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#80ff80"
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={10}
      />
    );
  }
}

export default NeighbourhoodGraph;
