import React from "react";
import axios from "axios";
import "./Single.css";

let wikiUrl =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exchars=1000&explaintext&redirects=1&titles=";
let wikiPictureUrl="https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&format=json&pithumbsize=500&titles=";

class Single extends React.Component{
    state = {
        trees: [],
        common_name:'',
        value: "maple",
        data: "",
        population:100,
        paragraph: null,
        genus_name:'',
        tree_name:'',
        imageSrc:''
      }
    
    constructor(props) {
              
        super(props);
        this.getImage= this.getImage.bind(this);
  
        console.log("treessssssssssssss")
        this.getTrees();
        this.getImage();
     
    }

    getTrees() {
        axios.get("http://treespree.wmdd.ca/api/trees").then(response => {
        let trees = response.data;
        // this.setState({...this.state,trees: trees})

        //giving a fixed id
        let tree_id=125;
        //filtering tree from api that match this id
        let found = trees.find(function (element)
         {
            return element.tree_id == tree_id;
                
          });
          
          //Setting state.common_name to tree's common name
         this.setState((prevstate)=>{
            return{
                genus_name:found.genus_name,
                species_name:found.species_name,
                common_name:found.common_name_tree,
                tree_name:found.absolute_common_name,
                population:found.common_name_tree_count
            }
            });   
      
           
            let search = "Maple";
            let searchUrl = wikiUrl + search;
            fetch(searchUrl)
           .then(res => {
            return res.json();
            })
            .then(foundData => {
            this.setState({
              paragraph: foundData.query.pages[Object.keys(foundData.query.pages)[0]].extract
                 });
            });
      
        })





    }

 getImage()
 {
   
    let searchPic = "MAPLE";
    let b=searchPic.toLowerCase();
    let imageUrl = wikiPictureUrl + b;
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
           
           <div className="banner">
           <div className="image">
            <img src={this.state.imageSrc} alt="" className="SingleImage"/>
            </div>


            <div className="info">
            <h1>{this.state.common_name}</h1>
       
            <div className="list">
            <ul>
                <li>
                        Species
                    </li>
                    <li>
                    {this.state.species_name}
                    </li>
                </ul>
                <ul>
                <li>
                        Genus
                    </li>
                    <li>
                    {this.state.genus_name}
                    </li>
                </ul>
                <ul>
                <li>
                        Population
                    </li>
                    <li>
                    {this.state.population}
                    </li>
                </ul>



                </div>
            

          


            <div className="others">
                <div className="location">
              
                    <div>
                        
                        </div>
                        <div>
                       <a href="/"> Find One Near Me</a>
                        </div>
               
                     </div>
                <div className="shop">
                         <div>
                        
                        </div>
                        <div>
                        Shop Products

                        </div>
            </div>
            </div>

            </div>


              </div>
            <div className="moreInfo">
                <h3> ABOUT </h3>
                 {/* If state's 'paragraph' is not null and has any value, render the component */}
                 {this.state.paragraph ? <p>{this.state.paragraph}</p> : ""}
            </div>



        </div>
        )
    }
}










export default Single;