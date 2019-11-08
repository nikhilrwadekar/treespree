import React,{Component} from "react";
import NeighbourhoodGraph from "./NeighbourhoodGraph";
import "./Graphview.css"
import SelectOption from "./SelectOption";


class Graphview extends Component{

    render(){
        return(
            <>
           <h2>Did You Know?</h2> 
           <div className="factsDiv">
                
           </div>
           <div>
               <div className="graphviewContainer">
               <SelectOption />
                <NeighbourhoodGraph />
               </div>
           </div>
           </>
        );
    }
}

export default Graphview;