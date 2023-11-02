import axios from '../Api.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Login-Singup/Login1.css'
function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  function loginFun(e) {
    e.preventDefault();

    axios.post("/login",
      {
        email: email,
        password: password,
      },{withCredentials:true})
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", email);
          navigate('/home', );
        }
      })
      .catch((err) => {
        alert("Check again");
      })
  }



  return (
    <>
      <div class="center">
        <h1>Login</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text" required onChange={e => setEmail(e.target.value)}></input>
            <span></span>
            <label> Email </label>
          </div>
          <div class="txt_field">
            <input type="password" required onChange={e => setPassword(e.target.value)}></input>
            <span></span>
            <label>Password </label>
          </div>
          <div class="pass">Forgot Password?</div>
          <button class="login-button" onClick={loginFun}> Login </button>
          <div class="signup_link">
            Not a member? <a href="/signup">Signup</a>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage;