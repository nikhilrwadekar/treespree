import React from "react";
import "./teamPage.css";

class TeamPage extends React.Component {
state={
  teamMembers: [
    {
      name: "Jasmine Kaur",
      Description: "PM | Front-end Developer",
      img: "/images/team-photos/Jasmine.jpg",
      github:"/images/team-photos/github-logo.png",
      gitlink:"https://github.com/jasminekaur95",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/jasmine-kaur-914656195/",
    },
    
    {
      name: "Nikhil Wadekar",
      Description: "Lead | Full-stack Developer",
      img: "/images/team-photos/Nikhil.jpg",
      github:"/images/team-photos/github-logo.png",
      gitlink:"https://github.com/nikhilrwadekar",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/nwadekar/",
    },
    {
      name: "Davinder Dhindsa",
      Description: "Lead Designer",
      img: "/images/team-photos/Davinder.jpg",
      github:"",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/davinder-singh-00b8ab197/",
    },
    {
      name: "Blandy Castro",
      Description: "Back-end Developer",
      img: "/images/team-photos/Blandy.jpg",
      github:"/images/team-photos/github-logo.png",
      gitlink:"https://github.com/BlandyC",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/blandy-castro-a43010199/",
    }
    ,
    {
      name: "Satnam Thandi",
      Description: "Back-end Developer",
      img: "/images/team-photos/Sam.jpg",
      github:"/images/team-photos/github-logo.png",
      gitlink:"https://github.com/ssingh124",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/satnam-singh-50b3ba194/",
    } ,
    {
      name: "Darshpreet Kaur",
      Description: "UI Designer",
      img: "/images/team-photos/Darshpreet.jpg",
      github:"",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/darshpreet-kaur-025664125",
    } ,
    {
      name: "Angel Augustine",
      Description: "QA | Front-end Developer",
      img: "/images/team-photos/Angel.jpg",
      github:"/images/team-photos/github-logo.png",
      gitlink:"https://github.com/AngelAugustine",
      linkdin:"/images/team-photos/linkdin-logo.png",
      link:"https://www.linkedin.com/in/angel-augustine-131219121/",
    } ,
  ]
}

createMember = () => {
  let member = []

  for (let i = 0; i <= 3; i++) {

    let children=[]
    children.push(<img src={this.state.teamMembers[i].img} alt={this.state.teamMembers[i].name} className="img_teamPage" />)
  
    let children1 = []
      children1.push(this.state.teamMembers[i].name)

    let children2 = []
      children2.push(this.state.teamMembers[i].Description)

      let github =[]
      github.push(<a href={this.state.teamMembers[i].gitlink}><img src={this.state.teamMembers[i].github} alt="github" className="img_git" /></a>)  
    
    let linkdin =[]
    linkdin.push(<a href={this.state.teamMembers[i].link}><img src={this.state.teamMembers[i].linkdin} alt="linkdin" className="img_link" /></a>)
  
     member.push(<div className="team-holder"><div className="img-holder">{children}</div>
     <div className="txt-holder"> <h5>{children1}</h5>
      <p>{children2}</p>
      {github}
      {linkdin}</div></div>)
    
    
  }
  return member
}

createMember_row2 = () => {
  let member = []

  for (let i = 4; i <7 ; i++) {

    let children=[]
    children.push(<img src={this.state.teamMembers[i].img} alt={this.state.teamMembers[i].name} className="img_teamPage" />)
  
    let children1 = []
      children1.push(this.state.teamMembers[i].name)

    let children2 = []
      children2.push(this.state.teamMembers[i].Description)

      let github =[]
      github.push(<a href={this.state.teamMembers[i].gitlink}><img src={this.state.teamMembers[i].github} alt="github" className="img_git" /></a>)  
    
    let linkdin =[]
    linkdin.push(<a href={this.state.teamMembers[i].link}><img src={this.state.teamMembers[i].linkdin} alt="linkdin" className="img_link" /></a>)
  
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
        <h1>Our Team</h1>
        <p>
        Our team wants to provide a refreshing experience to the users while exploring city trees across Vancouver. Our website will take users through a virtual walk around the city and provide comprehensive information about tree population, tree variants, and leaf illustrations.
        </p>
        <p>Our team consists of seven dedicated members who have expertise in design, visual graphics, content creation and software development. With the help of an extremely strong and innovative team, Treespree is catering to the personalized experience for users.</p>
        <p>Our team members are nature lovers and this has cultivated a strong passion for sharing enriching information with our community through TreeSpree. Our team’s vision is to partner with urban planners in order to develop plans and programs for the use of land in a sustainable way.</p>       
      </div>
      <div className="team-members">         
           {this.createMember()}                         
      </div>
      <div className="row2-members">         
           {this.createMember_row2()}                         
      </div>
        </div>
  );}
}

export default TeamPage;