import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../../public/stylesheets/signIn.css";


class SignIn extends Component{
  constructor(props){
    super(props);
    this.state={
      emailInput:'',
      emailValue:'',
      pwdInput:'',
      pwdValue:'',
    }
  }
  emailInputCheck(e){
    if(this.state.emailInput === ''){
      this.setState({
        emailValue:"no Input",
      })
      return e.preventDefault();
    }
    else{
      this.setState({
        emailValue:"",
      });
    }
  }

  pwdInputCheck(e){
    if(this.state.pwdInput === ''){
      this.setState({
        pwdValue:"no Input",
      })
      return e.preventDefault();
    }
    else{
      this.setState({
        pwdValue:""
      })
    }
  }

  render(){
    return (
      <main id="wrap">
        <form className='signIn_box' action='/auth/signIn-process' method='post' autoComplete="off" onSubmit={(e)=>{
          this.emailInputCheck(e);
          this.pwdInputCheck(e);
        }}>
          <h1>Login</h1>
          <div className='input-area'>
            <input type='email' name='email' id='signIn-email' placeholder='Email' onChange={(e)=>{
              this.setState({
                emailInput:e.target.value
              })
            }}/>
          <span>{this.state.emailValue}</span>
          </div>
          
          <div className='input-area'>
            <input type='password' name='pwd' id='signIn-pwd' placeholder="Password" onChange={(e)=>{
              this.setState({
                pwdInput:e.target.value
              })
            }}/>
            <span>{this.state.pwdValue}</span>
          </div>
          
          <input type='submit' value='Login' id='login' />
          <Link to="/main">임시버튼</Link>
          {/* <span><%=invalMsg.error[0]%></span> */}
        </form>
      </main>
    );
  }
}

export default SignIn;