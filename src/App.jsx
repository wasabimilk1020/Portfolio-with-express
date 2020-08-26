import React, {Component, useEffect, useState} from "react";
import "../public/stylesheets/reset.css";
import Main from "./components/Main.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from './components/SignIn.jsx';
import {BrowserRouter, Route, Redirect, Link, Prompt} from "react-router-dom";
import HistorySample from './components/HistorySample.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Profile from './components/Profile.jsx';

// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state={
//       name:"eunsu",
//     }

//   }
//   componentDidMount(){
//     console.log("Did Mount");
//   }
//   componentDidUpdate(){
//     console.log("Did Update");
//   }
//   render(){
//     return(
//       <>
//         <h1>{this.state.name}</h1>
//         <button type="text" value="changeName" onClick={()=> this.setState({name:"kim"})}/>
//       </>
//       // <BrowserRouter>
//       //   <Link to="/signIn">signIn</Link>
//       //   <Route exact path="/"><SignUp></SignUp></Route>
//       //   <Route path="/signIn"><SignIn></SignIn></Route>
//       //   {/* 이 아래 Main컴포넌트를 그냥은 못들어가게 만들자 */}
//       //   <Route path="/main"><Main></Main></Route>
//       // </BrowserRouter>
//     );
//   }
// }

// const App = () => {
//   return (
//     <BrowserRouter>
//       <ul>
//         <li>
//           <Link to="/">홈</Link>
//         </li>
//         <li>
//           <Link to="/about">소개</Link>
//         </li>
//         <li>
//           <Link to="/profiles">프로필 목록</Link>
//         </li>
//         <li>
//           <Link to="/history">예제</Link>
//         </li>
//       </ul>
//       <hr />
//       <Route path="/" exact={true} component={Home} />
//       <Route path="/about" component={About} />
//       <Route path="/profiles" component={Profile} />
//       <Route path="/history" component={HistorySample} />
//     </BrowserRouter>
//   );
// };

class App extends Component{
  render(){
    return(
      <div>kim</div>
    );
  }
}
export default App

// 회원가입에 성공 해서 req.user정보가 생성되서 받아와진다.
//그럼 이게 있을때만 Main컴포넌트로 리다이렉트되게 만들자.

//리액트 라우터가 history API를 사용하는거면 처음에 html 페이지 받으면 history에 컴포넌트 페이지가 다 등록이 되나??

