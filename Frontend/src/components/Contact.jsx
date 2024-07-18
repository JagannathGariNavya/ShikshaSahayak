import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';

const Contact = () => {
  const form = useRef();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm('service_qqoak2d', 'template_54vo3sp', form.current, '8n4ZAqKngGKpmq7ZR')
      .then(
        () => {
          toast({
            title: 'Success!',
            description: 'Your message has been sent successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          form.current.reset(); // Reset the form fields after successful submission
        },
        (error) => {
          toast({
            title: 'Error',
            description: `Failed to send message. ${error.text}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className="contact-page">
      <Box className="contact-page-overlay" p="6" rounded="md" bg="white" boxShadow="md" textAlign="center">
        <Box mb="4">
          <Box as="h2" fontSize="2xl" fontWeight="bold" color="teal.500">
            Contact Us for Support
          </Box>
          <Box fontSize="lg" color="gray.600" mt="2">
            We're here to help! Please fill out the form below and we'll get back to you as soon as possible.
          </Box>
        </Box>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="from_name" placeholder="Your Name" />
          </FormControl>
          <FormControl id="email" isRequired mt="4">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="from_email" placeholder="Your Email" />
          </FormControl>
          <FormControl id="message" isRequired mt="4">
            <FormLabel>Message</FormLabel>
            <Textarea name="message" resize="vertical" placeholder="Your Message" />
          </FormControl>
          <Button type="submit" colorScheme="teal" mt="4" isLoading={loading} loadingText="Sending...">
            Send
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Contact;
