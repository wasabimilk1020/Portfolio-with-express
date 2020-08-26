import React, {Component} from "react";
import "../../public/stylesheets/main.css";
import "../../public/javascripts/fontawsome/all.min.js";


class Main extends Component{
  render(){
    return(
      <>
        <header>
        <div className="container">
          <div className="header-menu">
            {/* <span><%=username%><span> / <a href='/auth/signOut'> Sign Out</a> */}
          </div>
          <div className="header-tit">
            <h1>Portfolio</h1>
          </div>   
        </div>      
        </header>
        <main>
          <div className="container">
            <div className="main">
              <ul>
                <li><a href="#" className="list-item"><i className="far fa-id-card"></i><span>About</span></a></li>            
                <li><a href="/topics/skills" className="list-item"><i className="far fa-chart-bar"></i><span>Skill</span></a></li>            
                <li><a href="/topics/projects" className="list-item"><i className="fas fa-laptop-code"></i><span>Project</span></a></li>            
                <li><a href="#" className="list-item"><i className="far fa-envelope"></i><span>Contact</span></a></li>            
              </ul>  
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Main;