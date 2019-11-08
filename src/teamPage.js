import React from "react";
import "./teamPage.css";
import member1 from "./team-photos/Jasmine.jpg";
import member2 from "./team-photos/Angel.jpg";
import member3 from "./team-photos/Sam.jpg";
import member4 from "./team-photos/Blandy.jpg";
import member5 from "./team-photos/Nikhil.jpg";
import member6 from "./team-photos/Darshpreet.jpg";
import member7 from "./team-photos/Davinder.jpg";

function TeamPage() {
  return (
    <div className="teamPage">
      <div className="tp-header">
        <h1>Team</h1>
        <p>
          Get to know the group of developers and designers behind Treespree
          project.
        </p>
      </div>
      <div className="team-members">
        <div className="img-holder">
          <img src={member1} alt="Jazmin" className="img_teamPage" />
          <p>Jasmine </p>
          <p>Project Manager</p>
        </div>
        <div className="img-holder">
          <img src={member2} alt="Angel" className="img_teamPage" />
          <p>Angel</p>
          <p>Front-end Developer</p>
        </div>
        <div className="img-holder">
          <img src={member3} alt="Sam" className="img_teamPage" />
          <p>Sam</p>
          <p>Back-end Developer</p>
        </div>
        <div className="img-holder">
          <img src={member4} alt="Blandy" className="img_teamPage" />
          <p>Blandy</p>
          <p>Back-end Developer</p>
        </div>
        <div className="img-holder">
          <img src={member5} alt="Nikhil" className="img_teamPage" />
          <p>Nikhil</p>
          <p>Head Developer</p>
        </div>
        <div className="img-holder">
          <img src={member6} alt="Darshpreet" className="img_teamPage" />
          <p>Darshpreet</p>
          <p>Designer</p>
        </div>
        <div className="img-holder">
          <img src={member7} alt="Davinder" className="img_teamPage" />
          <p>Davinder</p>
          <p>UX expert</p>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
