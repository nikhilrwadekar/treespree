import React,{Component} from "react";
import NeighbourhoodGraph from "./NeighbourhoodGraph";
import "./Graphview.css"
import TreeGraph from "./TreeGraph";

class Graphview extends Component{

    render(){
        return(
            <>
           <h2>Did You Know?</h2> 
           <div className="factsDiv">

           </div>
           <div>
               <button className="neighbourhoodBtn">
                   Neighbourhoods
               </button>
               <button className="treeBtn">
                   Trees
               </button>
               <div className="graphviewContainer">
                   <NeighbourhoodGraph />
               </div>
               <div className="graphviewContainer">
                   <TreeGraph />
               </div>
           </div>
           </>
        );
    }
}

export default Graphview;