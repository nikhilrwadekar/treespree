import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { throwStatement } from "@babel/types";

class NeighbourhoodGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neighbourhoods: [],
      // Add all Absolutely Common Names FIRST
      absolutelyCommonNames: [
        "PEACH",
        "LABURNUM",
        "PLANE",
        "DOVE",
        "SPINDLE",
        "GOLDENRAIN",
        "MONKEY PUZZLE",
        "PAGODA",
        "STRAWBERRY",
        "RUBBER",
        "ANGELICA",
        "EMPRESS",
        "EPAULETTE",
        "SILK",
        "CHESTNUT",
        "MAPLE",
        "ASH",
        "CHERRY",
        "HORNBEAM",
        "LILAC",
        "FIR",
        "DOGWOOD",
        "PLUM",
        "CEDAR",
        "LINDEN",
        "APPLE",
        "OAK",
        "HAWTHORN",
        "BIRCH",
        "PEAR",
        "HEMLOCK",
        "LOCUST",
        "TUPELO",
        "REDWOOD",
        "SWEETGUM",
        "ELM",
        "FILBERT",
        "WALNUT",
        "APPLE",
        "HOLLY",
        "SNOWBELL",
        "HONEYLOCUST",
        "BOXELDER",
        "SERVICEBERRY",
        "WILLOW",
        "BEECH",
        "CYPRESS",
        "TULIP",
        "IRONWOOD",
        "PINE",
        "ARBORVITAE",
        "BUTTERNUT",
        "SEQUOIA",
        "WHITEBEAM",
        "CATALPA",
        "ACACIA",
        "ZELKOVA",
        "MAGNOLIA",
        "FALSE CYPRESS",
        "SPRUCE",
        "COTTONWOOD",
        "HACKBERRY",
        "CHOKECHERRY",
        "GUM",
        "WINGNUT",
        "ALDER",
        "MANGLETIA",
        "REDBUD",
        "SUMAC",
        "BASSWOOD",
        "JUNIPER",
        "CRYPTOMERIA",
        "HEAVEN",
        "CHITALPA",
        "SHARON",
        "BUCKEYE",
        "STEWARTIA",
        "AVONDALE",
        "LAUREL",
        "YELLOWWOOD",
        "POPLAR",
        "MADRONE",
        "ARBUTUS",
        "LARCH",
        "PALM",
        "MULBERRY",
        "HAZELNUT",
        "NANNYBERRY",
        "SOURWOOD",
        "YEW",
        "FIG",
        "CORKTREE",
        "NUT",
        "COFFEETREE",
        "GINKGO",
        "GOLDENCHAIN",
        "BUCKTHORN",
        "ELDER",
        "CASCARA",
        "APRICOT",
        "ASPEN",
        "GLORYBOWER",
        "BERRY",
        "ARALIA",
        "KATSURA"
      ]
    };
  }

  componentWillMount() {
    axios
      .get(
        "http://treespree.wmdd.ca/api/neighbourhoods/neighbourhood-treetype-count"
      )
      .then(response => {
        let neighbourhoods = response.data;
        // let neighbourhood_tree_counts = neighbourhoods.map(neighbourhood => neighbourhood.neighbourhood_tree_count)
        // let neighbourhood_names = neighbourhoods.map(neighbourhood => neighbourhood.neighbourhood_name)
        this.setState({
          ...this.state,
          neighbourhoods: neighbourhoods
          // neighbourhood_tree_counts: neighbourhood_tree_counts,
          // neighbourhood_names: neighbourhood_names
        });
      });
  }

  render() {
    return (
      <ResponsiveBar
        data={this.state.neighbourhoods.slice(0, 10)}
        keys={this.state.absolutelyCommonNames.slice(0, 50)}
        indexBy="neighbourhood"
        margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
        padding={0.25}
        layout="horizontal"
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
