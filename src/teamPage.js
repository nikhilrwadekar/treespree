import React from "react";
import "./teamPage.css";

class TeamPage extends React.Component {
state={
  teamMembers: [
    {
      name: "Jasmine Kaur",
      Description: "Project Manager | Front-end Developer",
      img: "/images/team-photos/Jasmine.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    },
    {
      name: "Blandy Castro",
      Description: "Back-end Developer",
      img: "/images/team-photos/Blandy.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    },
    {
      name: "Satnam Thandi",
      Description: "Back-end Developer",
      img: "/images/team-photos/Sam.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    } ,
    {
      name: "Darshpreet Kaur",
      Description: "UI-Designer",
      img: "/images/team-photos/Darshpreet.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    } ,
    {
      name: "Angel Augustine",
      Description: "QA | Front-end Developer",
      img: "/images/team-photos/Angel.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    },
    {
      name: "Davinder Dhindsa",
      Description: "UX-Designer",
      img: "/images/team-photos/Davinder.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    },
    {
      name: "Nikhil Wadekar",
      Description: "Full-stack Developer",
      img: "/images/team-photos/Nikhil.jpg",
      github:"/images/team-photos/github-logo.png",
      linkdin:"/images/team-photos/linkdin-logo.png",
    }
  ]
}

createMember = () => {
  let member = []

  for (let i = 0; i < 7; i++) {

    let children=[]
    children.push(<img src={this.state.teamMembers[i].img} alt={this.state.teamMembers[i].name} className="img_teamPage" />)
  
    let children1 = []
      children1.push(this.state.teamMembers[i].name)

    let children2 = []
      children2.push(this.state.teamMembers[i].Description)

    let github =[]
    github.push(<img src={this.state.teamMembers[i].github} alt="github" className="img_git" />)
    
    let linkdin =[]
    linkdin.push(<img src={this.state.teamMembers[i].linkdin} alt="linkdin" className="img_link" />)
  
    member.push(<div className="team-holder"><div className="img-holder">{children}</div>
   <div className="txt-holder"> <h5>{children1}</h5>
    <p>{children2}</p>
    {github}
    {linkdin}</div></div>)
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
