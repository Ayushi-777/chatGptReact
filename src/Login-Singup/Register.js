import React, { useEffect, useState } from 'react';
import axios from '../Api.js';
import { useNavigate } from 'react-router-dom';
import '../Login-Singup/Login.css';
function SignupPage() {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassError, setconfirmPassError] = useState();
  const navigate = useNavigate();


  useEffect(()=>{
    setEmailError('');
  },[email])
  
  useEffect(()=>{
    setPasswordError('')
  },[password])
useEffect(()=>{
  setconfirmPassError('')
},[confirmPass])
  function SignupFun(e) {
    e.preventDefault();



    function validateForm() {
      let isValid = true;


      if (!email) {
        setEmailError('Email is required');
        isValid = false;
      }
      if (!password) {
        setPasswordError('Password is required')
      }
      if (!confirmPass) {
        setconfirmPassError('confirm password is required')
      }
  return isValid;
    }
   
    if(validateForm()){

      let isValid = true;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Password validation (at least 8 characters)
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }
    if (password !== confirmPass) {
      alert("Password not matching");
      return;
    }
    else {
      console.log("Email:", email);

     
      axios.post("/Signup",
        {
          email: email,
          password: password,

        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("user", email);
            navigate('/login');

          }

        })
        .catch((err) => {
          alert("Check again");
        });
      }
    }

   
  }

  return (
    <>
      <div class="center">
        <h1>Signup</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text" required onChange={e => setEmail(e.target.value)}></input>
            <span></span>
            <label>Username</label>
          </div>
          {emailError && <div className='error-message'>{emailError} </div>}

          <div class="txt_field">
            <input type="password" required onChange={e => setPassword(e.target.value)}></input>
            <span></span>
            <label>Password</label>
          </div>
          {passwordError && <div className='error-message'>{passwordError}</div>}
          
          <div class="txt_field">
            <input type="password" required onChange={e => setconfirmPass(e.target.value)}></input>
            <span></span>
            <label>confirm Password?</label>
          </div>
          {confirmPassError &&<div className='error-message'>{confirmPassError}</div>}

          <button onClick={SignupFun} className='login-button'> signup </button>
          <div class="login_link">
            Already signed up? <a href="/login">Login</a>
          </div>
        </form>
      </div>

    </>
  )
}

export default SignupPage;