//--로그인 input checker--//

var submit = document.getElementById('login');
  var emailInput = document.getElementById('signIn-email');
  var pwdInput = document.getElementById('signIn-pwd'); 
  var result=[];

  function email(emailInput){
    if(!emailInput.value){
      //no input 한번만 표시하기 위한 조건문
      if(emailInput.parentElement.children.length<2){
        emailInput.parentElement.insertAdjacentHTML('beforeend','<span>no input</span>');
      }
      else{
        if(emailInput.parentElement.children.length>1){
          emailInput.parentElement.children[1].remove();
          emailInput.parentElement.insertAdjacentHTML('beforeend', '<span>no input</span>');
        }
      }
      result.push(emailInput.value);
      return 
    }
    else{
      if(emailInput.parentElement.children.length>1)
        emailInput.parentElement.children[1].remove();
        
        result.push(emailInput.value);
        return;
    }
    
  }

  function pwd(pwdInput){
    if(!pwdInput.value){
      //no input 한번만 표시하기 위한 조건문
      if(pwdInput.parentElement.children.length<2){
        pwdInput.parentElement.insertAdjacentHTML('beforeend','<span>no input</span>');
      }
      else{
        if(pwdInput.parentElement.children.length>1){
          pwdInput.parentElement.children[1].remove();
          pwdInput.parentElement.insertAdjacentHTML('beforeend', '<span>no input</span>');
        }
      }
      result.push(pwdInput.value);
      return 
    }
    else{
      if(pwdInput.parentElement.children.length>1)
        pwdInput.parentElement.children[1].remove();
        result.push(pwdInput.value);
        return;
    }
    
  }

  submit.addEventListener('click',function(e){
  
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