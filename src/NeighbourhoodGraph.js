import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

class NeighbourhoodGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbourhoods: []
    };
  }

  componentWillMount() {
    axios.get("http://treespree.wmdd.ca/api/neighbourhoods").then(response =>{
        let neighbourhoods = response.data;
        // let neighbourhood_tree_counts = neighbourhoods.map(neighbourhood => neighbourhood.neighbourhood_tree_count)
        // let neighbourhood_names = neighbourhoods.map(neighbourhood => neighbourhood.neighbourhood_name)
        this.setState({
            ...this.state,
            neighbourhoods: neighbourhoods,
            // neighbourhood_tree_counts: neighbourhood_tree_counts,
            // neighbourhood_names: neighbourhood_names
        })
    })
  }
  render() {
    return (
        <ResponsiveBar
        data={this.state.neighbourhoods.slice(0,5)}
        keys={["neighbourhood_tree_count"]}
        indexBy="neighbourhood_name"
        margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
        padding={0.25}
        groupMode="grouped"
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
        legends={[
          
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  }
}

export default NeighbourhoodGraph;
