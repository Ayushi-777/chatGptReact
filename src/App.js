import LoginPage from './Login-Singup/Login';
import SignupPage from './Login-Singup/Register';
// import './Login-Singup/Login.css';
import Home from './components/Home';
// import  from './';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

   return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;