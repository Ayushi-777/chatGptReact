import React, { useState } from 'react';
import axios from '../Api.js';
import { useNavigate } from 'react-router-dom';
import '../Login-Singup/Login1.css';
function SignupPage() {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState();
  const navigate = useNavigate();

  function SignupFun(e) {
    e.preventDefault();

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
        })
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
          <div class="txt_field">
            <input type="password" required onChange={e => setPassword(e.target.value)}></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="txt_field">
            <input type="password" required onChange={e => setconfirmPass(e.target.value)}></input>
            <span></span>
            <label>confirm Password?</label>
          </div>
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