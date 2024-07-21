import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar'; 
import LoginForm from './components/Loginpage';
import RegisterForm from './components/Signup';
import ForgotPassword from './components/forgotpassword';
import ChangePassword from './components/ChangePassword';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './pages/Footer';
import { NavBar } from './pages/NavBar';
import Contact from './components/Contact';
import DetailedProject from './pages/DetailedProject';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './privateRoutes/PrivateRoute';
// import { DonateNowButton } from './DonateNowButton';


// import Test from './test/test';
import { FundRaise } from './components/fundRaise';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={isLoggedIn ? <HomePage /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/login' element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<RegisterForm />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/detailedProject' element={<DetailedProject/>} />
        <Route path='/fundRaise' element={<FundRaise/>}/>
        <Route path='/dashboard' element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>}/>
      </Routes>
      <Footer />
      {/* <Test/> */}
    </div>
  );
};

export default App;