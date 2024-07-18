import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Link, useToast, VStack, HStack, Divider, Text } from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../pages/api';

const LoginForm = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setAuth(true);
      toast({
        title: "Login successful.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate('/profile');
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Unable to login.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  const handleSocialLogin = (provider) => {
    // Logic for social login (e.g., redirect to OAuth provider)
    console.log(`Login with ${provider}`);
  };

  const handleOtpLogin = () => {
    navigate('/otp-login');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Box w="400px" p={8} mx="auto" mt={10} boxShadow="md">
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" w="full" mb={4}>Login</Button>
      </form>
      <VStack spacing={4}>
        <HStack w="full">
          <Divider />
          <Text>or</Text>
          <Divider />
        </HStack>
        <Button colorScheme="teal" w="full" leftIcon={<FaGoogle />} onClick={() => handleSocialLogin('Google')}>Login with Google</Button>
        <Button colorScheme="teal" w="full" leftIcon={<FaFacebook />} onClick={() => handleSocialLogin('Facebook')}>Login with Facebook</Button>
        <Button variant="link" onClick={handleOtpLogin}>Login with OTP</Button>
        <Button variant="link" onClick={handleForgotPassword}>Forgot Password?</Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
