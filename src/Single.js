import React from "react";
import axios from "axios";
import "./Single.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
// ref for font awsome https://www.npmjs.com/package/@fortawesome/react-fontawesome
// Refference for Wikipedia API https://www.mediawiki.org/wiki/API:Main_page
// Wikipedia API url for fetching image or picture for trees
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
    tree_id: 602,
    imageClass: "SingleImage",
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let treespreeAPIQuery = "";
    //setting Api for wikipedia search, based on if id is getting passed or name
    if (this.props.match.params.tree_id) {
      treespreeAPIQuery = `https://treespree.wmdd.ca/api/trees/id/${this.props.match.params.tree_id}`;
    } else if (this.props.match.params.tree_name) {
      treespreeAPIQuery = `https://treespree.wmdd.ca/api/trees/name/${this.props.match.params.tree_name}`;
    }

    //Getting information from TreeSpree API and passing it to states
    // Reference https://www.npmjs.com/package/axios
    axios.get(treespreeAPIQuery).then((response) => {
      let tree = response.data;
      //Setting state values
      this.setState((prevstate) => {
        return {
          genus_name: tree[0].genus_name,
          species_name: tree[0].species_name,
          common_name: tree[0].common_name_tree,
          tree_name: tree[0].absolute_common_name_tree.toLowerCase(),
          population: tree[0].common_name_tree_count,
        };
      });
      //building search URL for Text from wikipedia
      let search = this.state.tree_name;
      let searchUrl = wikiUrl + search;

      //fetching information from Wikipedia
      // Ref https://reactjs.org/docs/faq-ajax.html
      fetch(searchUrl)
        .then((res) => {
          return res.json();
        })
        .then((foundData) => {
          this.setState({
            paragraph:
              foundData.query.pages[Object.keys(foundData.query.pages)[0]]
                .extract,
          });
        });

      //making two search URl for getting picture from wikipedia
      let searchUrl1 = wikiPictureUrl + this.state.genus_name.toLowerCase();
      let searchUrl2 = wikiPictureUrl + this.state.tree_name.toLowerCase();

      // fetching Picture from wikipedia API using genus name
      fetch(searchUrl1)
        .then((res) => {
          return res.json();
        })
        .then((foundData) => {
          let imageObj =
            foundData.query.pages[Object.keys(foundData.query.pages)[0]];

          //checking if results for picture from wikipedia, using genus name is undefined
          if (imageObj.thumbnail == undefined) {
            //if results are undefined using genus name it will use alsolute commom name for fetching image
            fetch(searchUrl2)
              .then((res) => {
                return res.json();
              })
              // ref for object.keys https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
              .then((foundData) => {
                let imageObj =
                  foundData.query.pages[Object.keys(foundData.query.pages)[0]];
                // setting image URL to image Src
                this.setState({
                  imageSrc: imageObj.thumbnail.source,
                });
              })
              //catch block for handling errors in fetching image from wikipedia
              .catch((err) => {
                this.setState({
                  // it will set image src to the tree leaf image
                  imageSrc: `${window.location.protocol}\/\/${window.location.host}/png/leaves/${this.state.tree_name}.png`,
                  imageClass: "errorImage",
                });
              });
          }
          //Use tree absolute name for searching picture on wikipedia if searching with genus name returns undefined
          else {
            this.setState({
              imageSrc: imageObj.thumbnail.source,
            });
          }
        });
    });
  }

  render() {
    return (
      <div className="singlePage">
        <div className="banner">
          <div className={this.state.imageClass}>
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
                <div>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <a href="/explore/2">Find One Near Me</a>
                </div>
              </div>
              <div className="shop">
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faShoppingBag} />
                </div>
                <div>
                  <a href="/shop">Shop Products</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="moreInfo">
          <h2> About </h2>

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
