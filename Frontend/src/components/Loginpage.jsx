import React, { useState } from 'react';
import axios from './api';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setError('');
      setIsLoggedIn(true);
      setSuccessMessage('Successfully logged in!');
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to home page after login
      }, 2000); // Show the success message for 2 seconds
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <Box maxW="sm" mx="auto"mb='10' p="6" boxShadow="md" borderRadius="md" bg="white">
      {successMessage ? (
        <Text fontSize="2xl" color="green.500">{successMessage}</Text>
      ) : (
        <>
          <Text fontSize="2xl">Login</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password" mt="4" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              {error && <Text color="red.500">{error}</Text>}
              <Button type="submit" colorScheme="teal">Login</Button>
            </VStack>
          </form>
          <br />
          <p>Create an Account <Text color="blue" as={Link} to="/signup" size="md">Signup</Text></p>
          <p><Text color="blue" as={Link} to="/forgotpassword" size="md">Forgot Password</Text></p>
        </>
      )}
    </Box>
  );
};

export default LoginForm;
