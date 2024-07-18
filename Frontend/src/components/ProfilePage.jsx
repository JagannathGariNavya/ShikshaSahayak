import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/profile', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setError('Failed to fetch profile. Please try again.');
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (error) {
    return (
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>Profile</Heading>
        <Alert status="error" rounded="md">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>Profile</Heading>
        <Text>No user data available.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>Profile</Heading>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
    </Box>
  );
};

export default ProfilePage;
