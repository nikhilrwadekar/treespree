import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { throwStatement } from "@babel/types";


class NeighbourhoodGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      neighbourhoods: [],
      cart:[],
      // Add all Absolutely Common Names FIRST
      absolutelyCommonNames: [
        "DOVE",
        "PEACH",
        "LABURNUM",
        "SPINDLE",
        "PAGODA",
        "PLANE",
        "STRAWBERRY",
        "MONKEY PUZZLE",
        "GOLDENRAIN",
        "RUBBER",
        "ANGELICA",
        "SILK",
        "CHESTNUT",
        "CHERRY",
        "HORNBEAM",
        "LILAC",
        "EMPRESS",
        "EPAULETTE",
        "MAPLE",
        "ASH",
        "FIR",
        "DOGWOOD",
        "PLUM",
        "CEDAR",
        "LINDEN",
        "BIRCH",
        "APPLE",
        "OAK",
        "HAWTHORN",
        "PEAR",
        "HEMLOCK",
        "LOCUST",
        "TUPELO",
        "REDWOOD",
        "SWEETGUM",
        "ELM",
        "FILBERT",
        "WALNUT",
        "HOLLY",
        "SNOWBELL",
        "HONEYLOCUST",
        "BOXELDER",
        "SERVICEBERRY",
        "WILLOW",
        "BEECH",
        "CYPRESS",
        "IRONWOOD",
        "TULIP",
        "SEQUOIA",
        "ACACIA",
        "PINE",
        "ARBORVITAE",
        "BUTTERNUT",
        "WHITEBEAM",
        "CATALPA",
        "ZELKOVA",
        "MAGNOLIA",
        "COTTONWOOD",
        "CHOKECHERRY",
        "FALSE CYPRESS",
        "SPRUCE",
        "HACKBERRY",
        "GUM",
        "WINGNUT",
        "ALDER",
        "MANGLETIA",
        "REDBUD",
        "JUNIPER",
        "CRYPTOMERIA",
        "SUMAC",
        "BASSWOOD",
        "SHARON",
        "HEAVEN",
        "CHITALPA",
        "AVONDALE",
        "BUCKEYE",
        "STEWARTIA",
        "LAUREL",
        "YELLOWWOOD",
        "MADRONE",
        "ARBUTUS",
        "LARCH",
        "PALM",
        "POPLAR",
        "HAZELNUT",
        "NANNYBERRY",
        "MULBERRY",
        "FIG",
        "COFFEETREE",
        "SOURWOOD",
        "YEW",
        "CORKTREE",
        "NUT",
        "GINKGO",
        "GOLDENCHAIN",
        "BUCKTHORN",
        "ELDER",
        "APRICOT",
        "CASCARA",
        "GLORYBOWER",
        "ASPEN",
        "BERRY",
        "ARALIA",
        "KATSURA"
      ]
    };
  }

  componentWillMount() {
    let cart=[];
    axios
      .get(
        "http://treespree.wmdd.ca/api/neighbourhoods/neighbourhood-treetype-count"
      )
      .then(response => {
        let neighbourhoods = response.data;
        // let neighbourhood_tree_counts = neighbourhoods.map(neighbourhood => neighbourhood.neighbourhood_tree_count)
        // let neighbourhood_names = neighbourhoods.map(neighbourhood => neighbourhood.neighbourhood_name)
        let element = {};
        neighbourhoods.map(neighbourhood => {{
          let sum=0;
          Object.getOwnPropertyNames(neighbourhood).forEach(
            function (val, idx, array) {

              if(val=="neighbourhood"){
                  element.neighbourhood=neighbourhood[val];
                  // console.log(element.neighbourhood);
                }else
              if(val=="MAPLE"){
                element.MAPLE=neighbourhood[val];
                // console.log(element.MAPLE);
              }else
              if(val=="ASH"){
                element.ASH=neighbourhood[val];
                // console.log(element.ASH);
              }else
              if(val=="CHERRY"){
                element.CHERRY=neighbourhood[val];
                // console.log(element.CHERRY);
              }else
              if(val=="PLUM"){
                element.PLUM=neighbourhood[val];
                // console.log(element.PLUM);
              }else
              if(val=="HORNBEAM"){
                element.HORNBEAM=neighbourhood[val];
                // console.log(element.HORNBEAM);
              }else{
                sum=parseInt(neighbourhood[val])+sum;
              }
            
            }
          );
          element.OTHERS=sum;
        }
          cart.push(element);
          element={};
        })
        console.log(cart);

        this.setState({
          ...this.state,
          neighbourhoods: neighbourhoods,
          cart: cart
          // neighbourhood_tree_counts: neighbourhood_tree_counts,
          // neighbourhood_names: neighbourhood_names
        });
      });
  }
  render() {

    return (
      <ResponsiveBar
        // data={this.state.neighbourhoods.slice(0, 5)}
        // keys={this.state.absolutelyCommonNames.slice(0, 40)}
        data={this.state.cart.slice(0,5)}
        keys={['OTHERS','HORNBEAM','ASH','PLUM','CHERRY','MAPLE']}
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
