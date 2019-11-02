import React from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Single.css";
import tree from "./tree.jpg";

// URL Default for getting a summary paragraph from Wiki's API
let wikiUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";


class Single extends React.Component{
    state = {
        trees: [],
        common_name:'',
        age:12,
        value: "acer",
        data: "",
        paragraph: null
    }
    
    constructor(props) {
        super(props);
        console.log("treessssssssssssss")
        this.getTrees();
     
    }

    getTrees() {
        axios.get("http://treespree.wmdd.ca/api/trees").then(response => {
        let trees = response.data;
        // console.log(trees)
        // this.setState({...this.state,trees: trees})
        let tree_id=969;
        let found = trees.find(function (element) {
            return element.tree_id = tree_id;
                
          });
         this.setState((prevstate)=>{
            return{
                common_name: found.common_name_tree
                   }
                 
        });   
        
        
    
   
        let search = found.genus_name;
        // Append the search query to the link
        let searchUrl = wikiUrl + search;
    console.log(searchUrl)
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




    render()
    {
    return(
        

        <div className="singlePage">
            <h1>Tree Common Name</h1>
           
           
            <img src={ tree }  alt="" className="SingleImage"/>
      
        <fieldset> 
        <legend>General Info:</legend>
            <p>Comman Name:{this.state.common_name}</p>
            <p>Age:{this.state.age}</p>
            <p> Population: </p>

            </fieldset>


            <div className="others">
                <div className="location">
            
                    Find One Near Me
                </div>
                <div className="shop">
                    Shop for Palm Products
            </div>


            </div>
              {/* If state's 'paragraph' is not null and has any value, render the component */}
        {this.state.paragraph ? <p>{this.state.paragraph}</p> : ""}



        </div>
        )
    }
}










export default Single;