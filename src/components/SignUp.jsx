import React, {Component} from "react";
import "../../public/stylesheets/signUp.css";
import {Link, Redirect, withRouter} from "react-router-dom";
import axios from "axios";

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state={
      // value result 이렇게 두개로 나눠야만 하나??
      usrInput:'',
      usrValue:'',
      emailInput:'',
      emailValue:'',
      pwdInput:'',
      pwdValue:'',
    }
  }

  usrInputCheck(){
    if(this.state.usrInput === ''){
      this.setState({
        usrValue:"no Input",
      })
      return false;
    }
    else{
      let usrRegExp = /^\w+$/; 
      let ckUser = this.state.usrInput.match(usrRegExp);
      if(!ckUser){
        this.setState({
          usrValue:"Invalid Input!"
        });
        return false; 
      }
      else{
        this.setState({
          usrValue:""
        }) 
        return true;
      }
    }
  }

  emailInputCheck(){
    if(this.state.emailInput === ''){
      this.setState({
        emailValue:"no Input",
      })
      return false;
    }
    else{
      let emailRegExp = /^\w+([-_.]?\w+)*@\w+(\.)\w+$/;
      let ckEmail = this.state.emailInput.match(emailRegExp);
      if (!ckEmail) {
        this.setState({
          emailValue:"Invalid Input!"
        }); 
        return false;

      }
      else{
        this.setState({
          emailValue:"",
        });
        return true;
      }
    }
  }

  pwdInputCheck(){
    if(this.state.pwdInput === ''){
      this.setState({
        pwdValue:"no Input",
      })
      return false;
    }
    else{
      var pwdRegExp = /\s/;
      var ckPwd = this.state.pwdInput.match(pwdRegExp);
      if (ckPwd) {
        this.setState({
          pwdValue:"Invalid Input!"
        });
        return false;
      }
      else{
        this.setState({
          pwdValue:""
        })
        return true;
      }
    }
  }
  
  render(){
    return (
      <section className='signUp-container'>
        <h1>여기 허전함</h1>
        <form method='post' autoComplete="off" className='signUp_box' onSubmit={(e)=>{
          e.preventDefault();
          
          if(this.usrInputCheck() && this.emailInputCheck() && this.pwdInputCheck()){
            let body = {
              usr:this.state.usrInput,
              email:this.state.emailInput,
              pwd:this.state.pwdInput
            }
            axios.post("/auth/signUp-process",body).then(res =>{
              if(!res)
                console.log("실패");
              else
                this.props.history.push("/main"); 
            });
          }
          else{
            this.usrInputCheck(); 
            this.emailInputCheck();
            this.pwdInputCheck();
          }
          
        }}>
          <div className='input-area'>
            <label htmlFor='signUp_usr'>Username</label>
            <input type='text' id='signUp_usr' className='textBox' onChange={(e)=>{
              this.setState({
                usrInput:e.target.value
              })
            }}/>
            <span>{this.state.usrValue}</span>
          </div>
          {/* Username */}

          <div className='input-area'>
            <label htmlFor='signUp_email'>Email</label>
            <input type='text' id='signUp_email' className='textBox' onChange={(e)=>{
              this.setState({
                emailInput:e.target.value
              })
            }}/>
          <span>{this.state.emailValue}</span>
          </div>
          {/* Email */}

          <div className='input-area'>
            <label htmlFor='signUp_pwd'>Password</label>
            <input type='password' id='signUp_pwd' className='textBox' onChange={(e)=>{
              this.setState({
                pwdInput:e.target.value
              })
            }}/>
          <span>{this.state.pwdValue}</span>
          </div>
          {/* Password */}

          <div className='input-area'>
            <input type='submit' value='Sign Up' id='signUp_submit' className='textBox' />
            {/* <span>{errMsg}</span> */}
            {/* 중복된 아이디에 관한 에러 메세지 여기 표시해줘야 한다. */}
          </div>
        </form>
        <div id='signUp_signIn'>
          {/* <span>Already have an account?</span><Link to='/signIn'> Sign in</Link> */}
        </div>
      </section>
    );
  }
}
//입력 값 검사하는 else 부분 완성해야 한다.
export default withRouter(SignUp);