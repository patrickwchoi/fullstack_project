import bagon from '../../assets/bagon.jpg';
import mern from '../../assets/singed_screenshot_splash.png';
import './MyProjects.css';

const MyProjects = () => {
  const openBagon = ()=>{
    window.open('https://patrickwchoi.github.io/javascript_project_AA/', '_blank');
  }
  const openSinged = ()=>{
    window.open('https://singed.onrender.com/', '_blank');
  }

  return (
    <div className="myprojects">
      <div className="JS-project project">
        <img src={bagon} onClick={openBagon} className="hover"/>
        <div className="project-text">
          <h2 className="hover" onClick={openBagon}>Bagon Adventures</h2>
          <h4>Bagon Adventures is a browser-based game made with vanilla Javascript and HTML Canvas</h4>
        </div>
      </div>
      <div className="MERN-project project">
        <img src={mern} onClick={openSinged} className="hover"></img>
        <div className="project-text">
          <h2 className="hover" onClick={openSinged}>Singed</h2>
          <h4>Singed is a group project with 3 other contributors for a web application that recommends users dishes and restaurants. Built using the MERN  stack.</h4>
        </div>
      </div>
    </div>
  )

}

export default MyProjects;