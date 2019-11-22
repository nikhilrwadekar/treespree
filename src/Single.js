import React from "react";
import axios from "axios";
import "./Single.css";
import Popup from "reactjs-popup";
import Pops from "./PopUp.js";
 

let wikiUrl =
  "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&origin=*&titles=";
let wikiPictureUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&format=json&pithumbsize=500&titles=";

class Single extends React.Component {
  state = {
    trees: [],
    common_name: "",
    value: "maple",
    data: "",
    population: 100,
    paragraph: null,
    genus_name: "",
    tree_name: "",
    imageSrc: "",
    tree_id: 602
  };

  constructor(props) {
    super(props);
    // this.getImage = this.getImage.bind(this);

    // this.getTrees();
    // this.getImage();
  }

  componentDidMount() {
    let treespreeAPIQuery = "";

    if (this.props.match.params.tree_id) {
      treespreeAPIQuery = `http://treespree.wmdd.ca/api/trees/id/${this.props.match.params.tree_id}`;
    } else if (this.props.match.params.tree_name) {
      treespreeAPIQuery = `http://treespree.wmdd.ca/api/trees/name/${this.props.match.params.tree_name}`;
    }

    axios.get(treespreeAPIQuery).then(response => {
      let tree = response.data;
      console.log(response.data);

      //Setting state.common_name to tree's common name
      this.setState(prevstate => {
        return {
          genus_name: tree[0].genus_name,
          species_name: tree[0].species_name,
          common_name: tree[0].common_name_tree,
          tree_name: tree[0].absolute_common_name_tree.toLowerCase(),
          population: tree[0].common_name_tree_count
        };
      });

      let search = this.state.tree_name;
      let searchUrl = wikiUrl + search;
      fetch(searchUrl)
        .then(res => {
          return res.json();
        })
        .then(foundData => {
          console.log(foundData);
          this.setState({
            paragraph:
              foundData.query.pages[Object.keys(foundData.query.pages)[0]]
                .extract
          });
        });

      console.log(this.state.tree_name);

      // let searchPic = this.state.tree_name ;
      // let b = searchPic.toLowerCase();
      // let imageUrl = wikiPictureUrl + b;

      let searchUrl1 = wikiPictureUrl + this.state.genus_name.toLowerCase();
      let searchUrl2 = wikiPictureUrl + this.state.tree_name.toLowerCase();

      fetch(searchUrl1)
        .then(res => {
          // Return data in form of JSON
          return res.json();
        })
        .then(foundData => {
          let imageObj =
            foundData.query.pages[Object.keys(foundData.query.pages)[0]];

          if (imageObj.thumbnail == undefined) {
            fetch(searchUrl2)
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
              });
          } else {
            this.setState({
              imageSrc: imageObj.thumbnail.source
            });
          }

          console.log(this.state.imageSrc);
        });
    });
  }

  //   componentDidMount() {
  //     console.log(this.props.match.params.tree_id)
  //     console.log(this.props.match.params.tree_name)
  //   }

  render() {
    return (
      <div className="singlePage">
        <div className="banner">
          <div className="image">
            <img src={this.state.imageSrc} alt="" className="SingleImage" />
          </div>

          <div className="info">
            <h1>{this.state.common_name}</h1>

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

            <div className="others">
              <div className="location">
                <div></div>
                <div>
                  <a href="/"> Find One Near Me</a>
                </div>
              </div>
              <div className="shop">
                <div></div>
                <div>Shop Products</div>
              </div>
            </div>
          </div>
        </div>
        <div className="moreInfo">
          <h3> ABOUT </h3>
        

          
          {/* If state's 'paragraph' is not null and has any value, render the component */}
          {this.state.paragraph ? (
            <div
              dangerouslySetInnerHTML={{ __html: this.state.paragraph }}
            ></div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Single;
