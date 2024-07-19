// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/Loginpage';
import RegisterForm from './components/Signup';
import ForgotPassword from './components/forgotpassword';
import ChangePassword from './components/ChangePassword';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './pages/Footer';
import { NavBar } from './pages/NavBar';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <Routes>
        
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={isLoggedIn ? <HomePage/> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
