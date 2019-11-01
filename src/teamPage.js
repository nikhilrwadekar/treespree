import React from "react";
import "./teamPage.css";
import member from "./surprised.jpg";

function TeamPage() {
    return (
      <div className="teamPage">
       <h1>Team</h1>
       <p>Get to know the group of developers and designers behind Treespree project.</p>
       <div className="members">
       <img
        src={
            member
        }
        alt=""
        class="img_teamPage"
      />
       
       <img
        src={
            member
        }
        alt=""
        class="img_teamPage"
      />
       <img
        src={
            member
        }
        alt=""
        class="img_teamPage"
      />
       
       <img
        src={
            member
        }
        alt=""
        class="img_teamPage"
      />
       </div>
       
      </div>
    );
  }
  
  export default TeamPage;