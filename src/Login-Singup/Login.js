import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Api.js';
import '../Login-Singup/Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear error messages when email or password changes
    setEmailError('');
    // setPasswordError('');
  }, [email]);
  useEffect(()=>{
    setPasswordError('')
  },[password]);

  function validateForm() {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  }

  function loginFun(e) {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post('/login', { email, password }, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('user', email);
            navigate('/home');
          }
        })
        .catch((err) => {
          alert('Check again');
        });
    }
  }

  return (
    <>
      <div className="center">
        <h1>Login</h1>
        <form method="post">
          <div className={`txt_field ${emailError && 'error'}`}>
            <input type="text" required onChange={(e) => setEmail(e.target.value)} />
            <span></span>
            <label>Email</label>
    
          </div>
          {emailError && <div className="error-message">{emailError}</div>}
          <div className={`txt_field ${passwordError && 'error'}`}>
            <input type="password" required onChange={(e) => setPassword(e.target.value)} />
            <span></span>
            <label>Password</label>
         
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
          <div className="pass">Forgot Password?</div>
          <button className="login-button" onClick={loginFun}>
            Login
          </button>
          <div className="signup_link">
            Not a member? <a href="/signup">Signup</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
