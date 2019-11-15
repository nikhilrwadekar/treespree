import React from "react";
import "./teamPage.css";

class TeamPage extends React.Component {
state={
  teamMembers: [
    {
      name: "Jasmine Kaur",
      Description: "Project Manager",
      img: "/images/team-photos/Jasmine.jpg",
    },
    {
      name: "Blandy Castro",
      Description: "Back-end Developer",
      img: "/images/team-photos/Blandy.jpg",
    },
    {
      name: "Satnam Thandi",
      Description: "Back-end Developer",
      img: "/images/team-photos/Sam.jpg",
    } ,
    {
      name: "Darshpreet Kaur",
      Description: "Designer",
      img: "/images/team-photos/Darshpreet.jpg",
    } ,
    {
      name: "Angel Augustine",
      Description: "QA",
      img: "/images/team-photos/Angel.jpg",
    },
    {
      name: "Davinder Dhindsa",
      Description: "Designer",
      img: "/images/team-photos/Davinder.jpg",
    },
    {
      name: "Nikhil Wadekar",
      Description: "Front-end Developer",
      img: "/images/team-photos/Nikhil.jpg",
    }
  ]
}

createMember = () => {
  let member = []

  for (let i = 0; i < 7; i++) {

    let children=[]
    children.push(<img src={this.state.teamMembers[i].img} alt="Jazmin" className="img_teamPage" />)
  
    let children1 = []
      children1.push(this.state.teamMembers[i].name)

    let children2 = []
      children2.push(this.state.teamMembers[i].Description)

      member.push(<div className="img-holder">{children}
      <p>{children1}</p>
      <p>{children2}</p></div>)
  }
  return member
}



  render(){
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
           {this.createMember()}                         
      </div>
        </div>
  );}
}

export default TeamPage;
