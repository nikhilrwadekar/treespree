import React from "react";
import "./teamPage.css";

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
          <img src= "/images/team-photos/Jasmine.jpg" alt="Jazmin" className="img_teamPage" />
          <p>Jasmine </p>
          <p>Project Manager</p>
        </div>
        <div className="img-holder">
          <img src="/images/team-photos/Angel.jpg" alt="Angel" className="img_teamPage" />
          <p>Angel</p>
          <p>Front-end Developer</p>
        </div>
        <div className="img-holder">
          <img src="/images/team-photos/Sam.jpg" alt="Sam" className="img_teamPage" />
          <p>Sam</p>
          <p>Back-end Developer</p>
        </div>
        <div className="img-holder">
          <img src="/images/team-photos/Blandy.jpg" alt="Blandy" className="img_teamPage" />
          <p>Blandy</p>
          <p>Back-end Developer</p>
        </div>
        <div className="img-holder">
          <img src="/images/team-photos/Nikhil.jpg" alt="Nikhil" className="img_teamPage" />
          <p>Nikhil</p>
          <p>Head Developer</p>
        </div>
        <div className="img-holder">
          <img src="/images/team-photos/Darshpreet.jpg"alt="Darshpreet" className="img_teamPage" />
          <p>Darshpreet</p>
          <p>Designer</p>
        </div>
        <div className="img-holder">
          <img src="/images/team-photos/Davinder.jpg" alt="Davinder" className="img_teamPage" />
          <p>Davinder</p>
          <p>UX expert</p>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
