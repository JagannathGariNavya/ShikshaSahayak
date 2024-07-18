import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialLogin = () => (
  <Box w="400px" p={8} mx="auto" mt={10} boxShadow="md">
    <Heading mb={6} textAlign="center">Login with Social Accounts</Heading>
    <Button as="a" href="http://localhost:5000/auth/google" leftIcon={<FaGoogle />} colorScheme="red" width="full" mt={4}>
      Login with Google
    </Button>
    <Button as="a" href="http://localhost:5000/auth/facebook" leftIcon={<FaFacebook />} colorScheme="blue" width="full" mt={4}>
      Login with Facebook
    </Button>
  </Box>
);

export default SocialLogin;
