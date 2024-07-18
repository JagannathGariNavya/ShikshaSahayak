import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';

const Navbar = ({ isAuth, setAuth }) => {
  const handleLogout = async () => {
    await axios.post('http://localhost:5000/auth/logout');
    setAuth(false);
  };

  return (
    <Flex as="nav" justify="space-between" p={4} bg="teal.500" color="white">
      <Text fontSize="xl"><Link to="/">Home</Link></Text>
      <Box>
        {!isAuth ? (
          <>
            <Button as={Link} to="/login" mr={4} colorScheme="teal" variant="outline">Login</Button>
            <Button as={Link} to="/register" colorScheme="teal" variant="outline">Register</Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/profile" mr={4} colorScheme="teal" variant="outline">Profile</Button>
            <Button onClick={handleLogout} colorScheme="teal" variant="outline">Logout</Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
