import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
import axios from '../pages/api';

const OTPLogin = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const toast = useToast();

  const requestOtp = async () => {
    try {
      await axios.post('/api/auth/request-otp', { mobile });
      setOtpSent(true);
      toast({
        title: "OTP sent.",
        description: "Check your mobile for the OTP.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Unable to send OTP.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('/api/auth/verify-otp', { mobile, otp });
      toast({
        title: "OTP verified.",
        description: "You are now logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // Handle post-login logic here (e.g., redirect, set auth state)
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Invalid OTP.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  return (
    <Box w="400px" p={8} mx="auto" mt={10} boxShadow="md">
      <Heading mb={6} textAlign="center">OTP Login</Heading>
      <FormControl id="mobile" mb={4} isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <Input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </FormControl>
      {otpSent ? (
        <>
          <FormControl id="otp" mb={4} isRequired>
            <FormLabel>OTP</FormLabel>
            <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" w="full" onClick={verifyOtp}>Verify OTP</Button>
        </>
      ) : (
        <Button colorScheme="teal" w="full" onClick={requestOtp}>Request OTP</Button>
      )}
    </Box>
  );
};

export default OTPLogin;
