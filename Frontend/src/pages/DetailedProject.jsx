// src/components/DetailedProject.js

import React from 'react';
import { Box, Heading, Text, List, ListItem, Image, Stack, Flex, VStack, useTheme, Button, useBreakpointValue } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import '../pages/d.css'; // Import the custom CSS

const DetailedProject = () => {
  const project = JSON.parse(localStorage.getItem('selectedProject'));

  if (!project) {
    return <Box>No project selected</Box>;
  }

  const theme = useTheme();
  const orange = '#FFA500';  // Orange color
  const green = '#228B22';   // Green color

  return (
    <Flex
      direction={useBreakpointValue({ base: 'column', md: 'row' })}
      padding={5}
      maxW="container.xl"
      mx="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      className="detailed-project-container"
    >
      {/* Project Details Section */}
      <Box
        flex="2"
        p={5}
        borderRight={{ base: 'none', md: '1px solid #e2e8f0' }}
        className="project-details"
        borderRadius="md"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
      >
        <Heading as="h1" size="xl" color={orange} mb={6}>
          {project.donation_title}
        </Heading>
        <Text fontSize="lg" mb={6}>
          {project.donation_discription}
        </Text>
        <Stack spacing={4} mb={6}>
          <Text color={green} fontSize="lg">Raised: <strong>₹{project.current_amount}</strong></Text>
          <Text color={green} fontSize="lg">Target: <strong>₹{project.goal_amount}</strong></Text>
          <Text color={green} fontSize="lg">Created by: <strong>{project.student_name}</strong></Text>
          <Text color={green} fontSize="lg">Created on: <strong>{format(new Date(project.time_of_creation), 'dd/MM/yyyy')}</strong></Text>
          <Text color={green} fontSize="lg">Deadline: <strong>{format(new Date(project.donation_deadline), 'dd/MM/yyyy')}</strong></Text>
        </Stack>
        <Heading as="h3" size="lg" mb={4} color={orange}>
          Updates on Donation:
        </Heading>
        <List spacing={3} mb={6}>
          {project.updates_on_donation.map((update, index) => (
            <ListItem key={index} color={green} fontSize="md">{update}</ListItem>
          ))}
        </List>
        <Heading as="h3" size="lg" mb={4} color={orange}>
          Media Images:
        </Heading>
        <List spacing={3} mb={6}>
          {project.media_images.map((image, index) => (
            <ListItem key={index}>
              <Image
                src={`path_to_images/${image}`}
                alt={`Media ${index + 1}`}
                borderRadius="lg"
                boxSize="250px"
                objectFit="cover"
                transition="all 0.3s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </ListItem>
          ))}
        </List>
        <Heading as="h3" size="lg" mb={4} color={orange}>
          Current Donators:
        </Heading>
        <List spacing={3} mb={6}>
          {project.current_donators.map((donator) => (
            <ListItem key={donator._id} color={green} fontSize="md">
              {donator.name} - ₹{donator.amount}
            </ListItem>
          ))}
        </List>
        <Heading as="h3" size="lg" mb={4} color={orange}>
          Comments:
        </Heading>
        <List spacing={3} mb={6}>
          {project.comments.map((comment) => (
            <ListItem key={comment._id} color={green} fontSize="md">
              {comment.name}: {comment.messege}
            </ListItem>
          ))}
        </List>
        <Heading as="h3" size="lg" mb={4} color={orange}>
          Payment Options:
        </Heading>
        <List spacing={3} mb={6}>
          {project.payment_recive_option.map((option) => (
            <ListItem key={option._id} color={green} fontSize="md">
              {option.paymnet_recive_name}: {option.payment_recive_details}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Donation Section */}
      <Box
        flex="1"
        p={5}
        className="donation-section"
        borderRadius="md"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
      >
        <VStack spacing={6} align="center">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAElBMVEX///8AAAC7u7tnZ2ecnJwwMDCTUSInAAAEvklEQVR4nO2d65akIAyEFfT9X3nPaUmvxdTE4JXprvo3NJd8uMslRBwGSZIkSbpNuVVpu2BiLaSfbQ9Dam7ehRlbVYxK21mKZpY4bNfCdQmMV1AwghHMERiaeClMnjZFYTLLg3aXn1yY7dZzA4ybB3IiDM1D7aZKzc0fzgM5BfObBHMsD+QUzG/qBCb1D2OTCSgzmKIyvU+OpVj17MDkkciqPglmcmByK0xmWcbt1gUjmA+BaR4AeoZJRVb+JbQUl709w9DaPJ+HYAQjmC+G8dZmz8HAkFzDvH4qjmSjYM7iTmC8LUBRsTviN3sYxtucCUYwgvkcGO4DuADmZB9AICfCzCg0akmryjkwhw09CIOqYECCEYxguoWZ0qYoDHorECbT48NXS5XPY9xu3aqJwMRF55lEYZa/ZlYuEOfB1SNM9WQEIxjBPAMzN4obxRaaBhMoF1ZkRtoh6K+JJaIjBncX19i0W4IRzA0SjGDimrcjoTGSmu5n8ICWHl9aZeU3R1gZtj6zOt8amWj7RQdhAksO74nuWM4IRjB9wGBiXzA2Wjgw1WhGh7jifGCjkgVzeBSlHER97IDBbqAwbjVQG/UqUZ88qnroghGMYAQjmJ+JntCP5BmFMF64SZW46PCZZhzGO70QjGAE8+EwfY1mGGSdYA1OhZsVPHGcMTxwvSF4H3tOa9eFPdhpvZHAg05uaER00qRZaA9T3wl9eFR00twvwQhGMKfDUNcLfTsOYcwPTDEW16sNVXPAE0sV7ra6ebA0kMV99T5u6JUwvKMFIxjBfAVMYDQb74MZmFElMYcb5K6XdQjKMFnAyBotQU4e+Qjl7oDxfPuUl5aLuKgEI5gvhaGHiYdhytbagynxyYnuycExMEKBCV7btoU1vsvNcmLV1e1KLozXmfiyv9enKK+H/XvwSNU7XE3NMN5sKxjBCObDYZYW+aL5MRja4kirY0bRq1o8Bw7rErcT9us2mEEwghHM34ChRnUJgyHFOG/got+C/mzVvy4wQR56YocwtD03rjkCwx4F76kqEXLizLY3dsaYWLnQmYBgBCOYNhjylsRbNCfCVKHIBY2NZjYqQTk6llq7ECTNh8iztDRs7W73MC2HqnYJ7KEfPrXlEkxdDiWYUySYuhzqMRiMjOsEhlnhCkf6atXMYCKv0APMCImVoVfCVPsZwQhGMIJ5GMaLZIbl/f87l16yVTsePDKYDLc6WfOwsLd5hq72I1uACDBil7q3n6EXXkNbiB8UnAwT+PcpGMEchfms/zPuJURrozIGjGEtIPdt9XYYz3HumREwKu5qcp/eUZiGa8EFIxjBCOaPwpRJxLYAEJ+cMK55KY437dGtgwmmrpZjwL0w1DsTeE8zAoNkN8BQowQjGMGcB9Mwmt0IswRue6NZ9W0t+BRtBYNXWLOPz84JA7lPhfFiD+PzqhdjZJ2AxlwC03x0vhdm/1UtghGMYNpgAjldGLAUHSHIW/5oOAuN6HqY5mvBBSMYwXwOTJXlBhgvIBBC+DgMfsWQ3oCEDVYweODoBSJGYOLyzmfoRw5ogxUM5OBXtdBEwQhGMI/A8DPNMExVy0kwgTEZlZyCZS7hl09DObM7PgpHhmZJkiTpef0DtWpZgVh7bU8AAAAASUVORK5CYII="
            alt="Scanner"
            boxSize="200px"
            mb={6}
            transition="all 0.3s ease-in-out"
            _hover={{ transform: 'scale(1.1)' }}
          />
          <Text fontSize="2xl" color={orange} mb={4}>Current Fund: ₹{project.current_amount}</Text>
          <Text fontSize="2xl" color={orange} mb={6}>Goal Amount: ₹{project.goal_amount}</Text>
          <Link to="/donate">
            <Button colorScheme="orange" size="lg" fontSize="lg" _hover={{ bg: 'orange.600' }}>
              Donate Now
            </Button>
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default DetailedProject;
