import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Input as ChakraInput,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  useToast,
  Container,
  Card,
  CardBody,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { getUserData, updatePassword, updateProject } from '../components/dashboardApi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(''); // Set your token here
  const toast = useToast();

  useEffect(() => {
    getUserData(token)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        toast({
          title: 'Failed to fetch user data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [token]);

  const handlePasswordChange = (values) => {
    updatePassword(token, values.newPassword)
      .then(() => {
        toast({
          title: 'Password updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Failed to update password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleProjectUpdate = (values) => {
    updateProject(token, values)
      .then(() => {
        toast({
          title: 'Project updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Failed to update project',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  if (!user) return <Spinner size="xl" />;

  return (

      <Container maxW="container.md" p={4}>
        <Card className="mb-4">
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>User Information</Heading>
            <Text mb={2}>Name: {user.student_name}</Text>
            <Text>Email: {user.student_email}</Text>
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>Update Password</Heading>
            <form onSubmit={(e) => {e.preventDefault(); handlePasswordChange({newPassword: e.target.newPassword.value});}}>
              <FormControl id="newPassword" isRequired mb={4}>
                <FormLabel>New Password</FormLabel>
                <ChakraInput type="password" name="newPassword" />
              </FormControl>
              <ChakraButton colorScheme="teal" type="submit">
                Update Password
              </ChakraButton>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>Update Project</Heading>
            <form onSubmit={(e) => {e.preventDefault(); handleProjectUpdate({projectField: e.target.projectField.value});}}>
              <FormControl id="projectField" isRequired mb={4}>
                <FormLabel>Project Field</FormLabel>
                <ChakraInput type="text" name="projectField" />
              </FormControl>
              <ChakraButton colorScheme="teal" type="submit">
                Update Project
              </ChakraButton>
            </form>
          </CardBody>
        </Card>
      </Container>

  );
};

export default Dashboard;
