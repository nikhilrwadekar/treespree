import React from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Single.css";
import tree from "./tree.jpg";

// URL Default for getting a summary paragraph from Wiki's API
let wikiUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";
let wikiPictureUrl="https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&format=json&pithumbsize=500&titles=";

class Single extends React.Component{
    state = {
        trees: [],
        common_name:'',
        age:12,
        value: "maple",
        data: "",
        population:100,
        paragraph: null,
        genus_name:'',
        neighbourhood:'',
        tree_diameter:'',
        imageSrc:''
      }
    
    constructor(props) {
        super(props);
        console.log("treessssssssssssss")
        this.getTrees();
        this.getImage();
     
    }

    getTrees() {
        axios.get("http://treespree.wmdd.ca/api/trees").then(response => {
        let trees = response.data;
        // this.setState({...this.state,trees: trees})

        //giving a fixed id
        let tree_id=969;
        //filtering tree from api that match this id
        let found = trees.find(function (element)
         {
            return element.tree_id = tree_id;
                
          });
          this.state.genus_name=found.genus_name;
          this.state.common_name=found.common_name_tree;
          this.state.neighbourhood=found.neighbourhood_name;
          this.state.tree_diameter=found.tree_diameter;
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
                foundData.query.pages[Object.keys(foundData.query.pages)[0]].extract
                 });
            });
      
        })





    }

 getImage()
 {
    let searchPic = this.state.value;
    let imageUrl = wikiPictureUrl + searchPic;
    console.log("from get IMage()")
    fetch(imageUrl)
    .then(res => {
    // Return data in form of JSON
    return res.json();
    })
    .then(foundData => {
        
    let imageObj=foundData.query.pages[Object.keys(foundData.query.pages)[0]];
    this.setState({
        imageSrc:imageObj.thumbnail.source
           });
           console.log(this.state.imageSrc)
        })
 }






    render()
    {
    return(
        

        <div className="singlePage">
            <h1>{this.state.common_name}</h1>
           
           
            <img src={this.state.imageSrc} alt="" className="SingleImage"/>
      
        <fieldset> 
        <legend>General Info:</legend>
            <p>Genus Name:{this.state.genus_name}</p>
            <p>Age:{this.state.age}</p>
            <p> Population: {this.state.population}</p>
            <p> Tree Diameter: {this.state.tree_diameter}</p>
            

            </fieldset>


            <div className="others">
                <div className="location">
            
                    Find More Trees in
                    <div> {this.state.neighbourhood}</div>
                 </div>
                <div className="shop">
                    Shop for Palm Products
            </div>


            </div>
            <div className="moreInfo">
                <h2> More Info:  </h2>
                 {/* If state's 'paragraph' is not null and has any value, render the component */}
                 {this.state.paragraph ? <p>{this.state.paragraph}</p> : ""}
            </div>



        </div>
        )
    }
}










export default Single;