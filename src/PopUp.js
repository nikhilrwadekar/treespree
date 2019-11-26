import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./PopUp.css";
import Spinner from "react-bootstrap/Spinner";
// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=
let wikiUrl =
  "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&summary=&origin=*&titles=";
let wikiPictureUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&format=json&pithumbsize=500&titles=";

class PopUp extends React.Component {
  state = {};

  componentDidMount() {
    let treespreeAPIQuery, linkToSingleView;

    // If ID is passed in props
    if (this.props.tree_id) {
      treespreeAPIQuery = `http://treespree.wmdd.ca/api/trees/id/${this.props.tree_id}`;
      linkToSingleView = `/tree/id/${this.props.tree_id}`;
    } else if (this.props.tree_name) {
      //Else if the NAME is passed in props
      treespreeAPIQuery = `http://treespree.wmdd.ca/api/trees/name/${this.props.tree_name}`;
      linkToSingleView = `/tree/name/${this.props.tree_name}`;
    }

    if (linkToSingleView) {
      this.setState({
        ...this.state,
        linkToSingleView
      });
    }

    // Get Data from API
    axios.get(treespreeAPIQuery).then(response => {
      let tree = response.data;
      console.log(response.data);

      //Storing tree data in state
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

          if (imageObj.thumbnail === undefined) {
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

  render() {
    return (
      <div className="popUp">
        <h3>{this.state.common_name}</h3>

        {this.state.imageSrc ? (
          <img
            src={this.state.imageSrc}
            style={{
              width: this.props.tree_id ? "200px" : "400px",
              height: this.props.tree_id ? "200px" : "300px",
              objectFit: "cover"
            }}
            alt=""
            className="SingleImage"
          />
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

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
          <h5>ABOUT</h5>

          {/* If state's 'paragraph' is not null and has any value, render the component */}
          {this.state.paragraph ? (
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.paragraph.substring(0, 299) + "..."
              }}
            ></div>
          ) : (
            ""
          )}

          <Button
            // className="PopUp-know-more"
            href={this.state.linkToSingleView}
            variant="success"
          >
            KNOW MORE
          </Button>
        </div>
      </div>
    );
  }
}

export default PopUp;
