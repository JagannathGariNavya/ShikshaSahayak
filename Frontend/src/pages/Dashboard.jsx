import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Heading,
  Input as ChakraInput,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { getUserData, updatePassword, updateProject, getUsers } from '../components/dashboardApi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
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

      getUsers(token)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          toast({
            title: 'Failed to fetch users',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: 'No token found',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const token = localStorage.getItem('accessToken');

    if (token) {
      updatePassword(token, newPassword)
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
    }
  };

  const handleProjectUpdate = (e) => {
    e.preventDefault();
    const projectField = e.target.projectField.value;
    const token = localStorage.getItem('accessToken');

    if (token) {
      updateProject(token, { projectField })
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
    }
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the code to send the updated user data to the backend if needed
    setIsEditing(false);
    toast({
      title: 'User information updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (!user) return <Spinner size="xl" />;

  return (
    <Container maxW="container.md" p={4}>
      <Card className="mb-4">
        <CardBody>
          <Heading as="h3" size="lg" mb={4}>User Information</Heading>
          {!isEditing ? (
            <>
              <Text mb={2}>Name: {user.student_name}</Text>
              <Text mb={2}>Email: {user.student_email}</Text>
              <ChakraButton colorScheme="teal" onClick={() => setIsEditing(true)}>
                Edit Info
              </ChakraButton>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl id="student_name" isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <ChakraInput type="text" name="student_name" value={user.student_name} onChange={handleFieldUpdate} />
              </FormControl>
              <FormControl id="student_email" isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <ChakraInput type="email" name="student_email" value={user.student_email} onChange={handleFieldUpdate} />
              </FormControl>
              <ChakraButton colorScheme="teal" type="submit">
                Update Info
              </ChakraButton>
              <ChakraButton colorScheme="red" ml={4} onClick={() => setIsEditing(false)}>
                Cancel
              </ChakraButton>
            </form>
          )}
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <Heading as="h3" size="lg" mb={4}>Update Password</Heading>
          <form onSubmit={handlePasswordChange}>
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
          <form onSubmit={handleProjectUpdate}>
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
