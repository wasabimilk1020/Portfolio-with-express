//---회원가입 형식 체크---// (불필요한 리퀘스트 방지 및 사용자 편의를 위한 형식 체크)
//클로저로 감싸던지해서 리팩토링 더 해줘야 한다. 지금은 전역변수로 그냥 노출되어 있음.
//로그인이랑 회원가입 형식 체크해주는 함수 합칠 수 있으면 합치자.
var submit = document.getElementById('signUp_submit');

var userInput = document.getElementById('signUp_usr');
var emailInput = document.getElementById('signUp_email');
var pwdInput = document.getElementById('signUp_pwd');
var inputArr = [userInput, emailInput, pwdInput];

//정규표현식
var usrRegExp = /^\w+$/; 
var emailRegExp = /^\w+([-_.]?\w+)*@\w+(\.)\w+$/;
var pwdRegExp = /\s/;
var result = [];

function userName(userInput){
  //--no input check--//
  if(!userInput.value){
    //no input 한번만 표시하기 위한 조건문
    if(userInput.parentElement.children.length<3){
      userInput.parentElement.insertAdjacentHTML('beforeend','<span>no input</span>');
    }
    else{
      if(userInput.parentElement.children.length>2){
        userInput.parentElement.children[2].remove();
        userInput.parentElement.insertAdjacentHTML('beforeend', '<span>no input</span>');
      }
    }
    result.push(userInput.value);
    return 
  }
  else{ //--invalid input check--//
    var ckUser = userInput.value.match(usrRegExp);
    if (!ckUser) {
      if (userInput.parentElement.children.length < 3)
        userInput.parentElement.insertAdjacentHTML('beforeend', '<span>invalid username</span>');
      else{
        if(userInput.parentElement.children.length>2){
          userInput.parentElement.children[2].remove();
          userInput.parentElement.insertAdjacentHTML('beforeend', '<span>invalid username</span>');
        }
      }
    }
    else {
      if (userInput.parentElement.children.length > 2) 
        userInput.parentElement.children[2].remove();
    }
    result.push(ckUser);
    return 
  }
}
function email (emailInput){
  if(!emailInput.value){
    //no input 한번만 표시하기 위한 조건문
    if(emailInput.parentElement.children.length<3){
      emailInput.parentElement.insertAdjacentHTML('beforeend','<span>no input</span>');
    }
    else{
      if(emailInput.parentElement.children.length>2){
        emailInput.parentElement.children[2].remove();
        emailInput.parentElement.insertAdjacentHTML('beforeend', '<span>no input</span>');
      }
    }
    result.push(emailInput.value);
    return 
  }
  else{ //--invalid input check--//
    var ckEmail = emailInput.value.match(emailRegExp);
    if (!ckEmail) {
      if (emailInput.parentElement.children.length < 3)
        emailInput.parentElement.insertAdjacentHTML('beforeend', '<span>invalid email</span>');
      else{
        if(emailInput.parentElement.children.length>2){
          emailInput.parentElement.children[2].remove();
          emailInput.parentElement.insertAdjacentHTML('beforeend', '<span>invalid email</span>');
        }
      }
    }
    else {
      if (emailInput.parentElement.children.length > 2) 
        emailInput.parentElement.children[2].remove();
    }
    result.push(ckEmail);
    return 
  }
}

function pwd (pwdInput){
  if(!pwdInput.value){
    //no input 한번만 표시하기 위한 조건문
    if(pwdInput.parentElement.children.length<3){
      pwdInput.parentElement.insertAdjacentHTML('beforeend','<span>no input</span>');
    }
    else{
      if(pwdInput.parentElement.children.length>2){
        pwdInput.parentElement.children[2].remove();
        pwdInput.parentElement.insertAdjacentHTML('beforeend', '<span>no input</span>');
      }
    }
    result.push(pwdInput.value);
    return 
  }
  else{ //--invalid input check--//
    var ckPwd = pwdInput.value.match(pwdRegExp);
    if (ckPwd) {
      if (pwdInput.parentElement.children.length < 3)
        pwdInput.parentElement.insertAdjacentHTML('beforeend', '<span>invalid password</span>');
      else{
        if(pwdInput.parentElement.children.length>2){
          pwdInput.parentElement.children[2].remove();
          pwdInput.parentElement.insertAdjacentHTML('beforeend', '<span>invalid password</span>');
        }
      }
    }
    else {
      if (pwdInput.parentElement.children.length > 2) 
        pwdInput.parentElement.children[2].remove();
    }
    result.push(!ckPwd);
    return 
  }
}

submit.addEventListener('click',function(e){
  userName(userInput);
  email(emailInput);
  pwd(pwdInput);
  
  for (let i = 0; i < result.length; i++) {
    if (!result[i]) {
      e.preventDefault();
      result=[];
      break;
    }
  }
});