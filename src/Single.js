import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Single.css";
import tree from "./tree.jpg";

// URL Default for getting a summary paragraph from Wiki's API
let wikiUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";


class Single extends React.Component{
    render()
    {
    return(
        <div className="singlePage">
            <h1>Tree Common Name</h1>
           
           
        <img src={ tree }  alt="" class="SingleImage"/>
      
        <fieldset> 
        <legend>General Info:</legend>
            Comman Name:
      
            Age:
            Population:

            </fieldset>


            <div class="others">
                <div class="location">
            
                    Find One Near Me
                </div>
                <div class="shop">
                    Shop for Palm Products
            </div>


            </div>




        </div>
        )
    }
}










export default Single;