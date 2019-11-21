import React from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./PopUp.css";

// URL Default for getting a summary paragraph from Wiki's API
let wikiUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";
let wikiPictureUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&format=json&pithumbsize=500&titles=";

class PopUp extends React.Component {
  state = {
    trees: [],
    common_name: "",
    age: 12,
    value: "maple",
    data: "",
    population: 100,
    paragraph: null,
    genus_name: "",
    imageSrc: "",
    species_name: ""
  };

  constructor(props) {
    super(props);
    console.log("treessssssssssssss");
    this.getTrees();
    this.getImage();
  }

  getTrees() {
    axios.get("http://treespree.wmdd.ca/api/trees").then(response => {
      let trees = response.data;
      // this.setState({...this.state,trees: trees})

      //giving a fixed id
      let tree_id = 969;
      //filtering tree from api that match this id
      let found = trees.find(function(element) {
        return (element.tree_id = tree_id);
      });
      this.state.genus_name = found.genus_name;
      this.state.common_name = found.common_name_tree;
      this.state.species_name = found.species_name;
      //Setting state.common_name to tree's common name
      //  this.setState((prevstate)=>{
      //     return{
      //         common_name: found.common_name_tree
      //            }

      // });

      //using fetched common name in wikipedia URL
      //let search = found.genus_name;
      //temperary search keyword untill API is not getting fixed
      let search = "maple";
      // Append the search query to the link
      let searchUrl = wikiUrl + search;
      // Fetch data from constructed search URL
      fetch(searchUrl)
        .then(res => {
          // Return data in form of JSON
          return res.json();
        })
        .then(foundData => {
          this.setState({
            paragraph:
              // Take the returned JSON data, access the first property (regardless of the name), get that property's 'extract'
              // Store the extract in the current 'State'
              foundData.query.pages[Object.keys(foundData.query.pages)[0]]
                .extract
          });
        });
    });
  }

  getImage() {
    let searchPic = this.state.value;
    let imageUrl = wikiPictureUrl + searchPic;
    console.log("from get IMage()");
    fetch(imageUrl)
      .then(res => {
        // Return data in form of JSON
        return res.json();
      })
      .then(foundData => {
        let imageObj =
          foundData.query.pages[Object.keys(foundData.query.pages)[0]];
        this.setState({
          imageSrc: imageObj.thumbnail.source
        });
        console.log(this.state.imageSrc);
      });
  }

  render() {
    return (
      <div className="popUp">
        <h1>{this.state.common_name}</h1>

        <img src={this.state.imageSrc} alt="" className="SingleImage" />

        <div className="list">
          <ul>
            <li>Species</li>
            <li>{this.state.species_name}</li>
          </ul>
          <ul>
            <li>Genus</li>
            <li>{this.state.genus_name}</li>
          </ul>
          <ul>
            <li>Population</li>
            <li>{this.state.population}</li>
          </ul>
        </div>

        <div className="moreInfo">
          <h2> About </h2>
          {/* If state's 'paragraph' is not null and has any value, render the component */}
          {this.state.paragraph ? <p>{this.state.paragraph}</p> : ""}

          <input type="submit" value="Know More" />
        </div>
      </div>
    );
  }
}

export default PopUp;
