import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import SocialLogin from './components/SocialLogin';
import OTPLogin from './components/OTPLogin';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  const [isAuth, setAuth] = useState(false);

  return (
    <ChakraProvider>
      <Navbar isAuth={isAuth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/social-login" element={<SocialLogin />} />
        <Route path="/otp-login" element={<OTPLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
