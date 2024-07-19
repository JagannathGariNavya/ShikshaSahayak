import React, { useState } from 'react';
import { Box, Flex, VStack, Text, Button } from '@chakra-ui/react';
import '../styles/home.css';
import pic from '../../images/kids.jpg';
import kids from '../../images/charity.jpg'

export const HomePage = () => {
  const [selectedContent, setSelectedContent] = useState('EDUCATE');

  const content = {
    'START FREE FUNDING': (
      <VStack align="flex-start" spacing="2">
       <Text>Your donations directly fund the education of underprivileged students.</Text>
<Text>Every contribution helps provide essential resources like books, uniforms, and tuition fees.</Text>
<Text>With your support, we can ensure that no child is deprived of education due to financial constraints.</Text>
<Text>By funding education, you are not only helping individuals but also contributing to the betterment of society.</Text>
<Text>Together, we can create a future where every child has the opportunity to learn and grow.</Text>
<Text>Your generosity helps bridge the gap between potential and opportunity. Invest in education today to empower the leaders of tomorrow.</Text>

      </VStack>
    ),
    'EDUCATE': (
  <VStack align="flex-start" spacing="2">
    <Text>Education is a powerful tool that can transform lives and uplift communities.</Text>
    <Text>By contributing to our cause, you are helping to provide essential resources like books, uniforms, and tuition fees for underprivileged students.</Text>
    <Text>Your support ensures that financial constraints do not hinder a child's opportunity to learn and grow.</Text>
    <Text>Every donation helps create a brighter future for students who are the first in their families to pursue higher education.</Text>
    <Text>We do not expect any monetary return; your generosity is the true reward as it brings hope and opportunity to those in need.</Text>
    <Text>Together, we can make a significant impact and empower the next generation through education.</Text>
  </VStack>
),
'ENHANCE': (
  <VStack align="flex-start" spacing="2">
    <Text>Enhancing the quality of education is vital for the overall development of students.</Text>
    <Text>Your contributions help us improve school facilities and provide better learning environments.</Text>
    <Text>We focus on providing additional resources like extracurricular activities, mentorship programs, and skill-building workshops.</Text>
    <Text>Funds also support rural girls, helping them gain confidence and become self-sufficient.</Text>
    <Text>With your help, we collaborate with junior colleges and schools to ensure students from poor backgrounds receive quality education.</Text>
    <Text>Together, we can ensure that students not only pursue their education but also excel in it, leading to professional success.</Text>
  </VStack>
),
    'EMPLOYMENT': (
  <VStack align="flex-start" spacing="2">
    <Text>Today's students, supported by your donations, are tomorrow's employees and leaders.</Text>
    <Text>By helping students raise funds, you enable them to pursue education and build successful careers.</Text>
    <Text>Many of our beneficiaries are first-time graduates in their families, coming from villages and small towns.</Text>
    <Text>Your contributions help educate rural girls, preventing early marriages and making them self-sufficient and employable.</Text>
    <Text>With education, these students gain the skills and knowledge needed for professional success.</Text>
    <Text>Join us in creating a future where every student, with the support of generous donors like you, becomes a valuable member of the workforce.</Text>
  </VStack>
)
,
  };

  return (
    <div className="home-page">
      <div id="home">
        <img src={pic} alt="kids" />
        <h1>This is What We Do</h1>
      </div>
      <div className="description">
        <p>
          Students from all backgrounds deserve access to quality education and opportunities. Unfortunately, many are deprived of these due to financial constraints. ShikshaSahayak is dedicated to creating a supportive environment where students can thrive academically. Our platform enables students to raise the necessary funds for their education through community donations. By contributing to ShikshaSahayak, you can help ensure that bright students, regardless of their economic status, can pursue their dreams. With your support, these students can focus on their studies, excel in their educational pursuits, and ultimately break the cycle of poverty for their families. Join us in empowering the next generation of scholars and making a lasting impact on their lives.
        </p>
      </div>
      <Flex w="100%" justify="center">
        <Flex border="1px solid #9fc74a" borderRadius="md" boxShadow="lg" p="4" bg="white" width='100%' ml='20' mr='20' >
          <VStack align="flex-start" spacing="4" mt="16">
            {Object.keys(content).map((key) => (
              <Button
                key={key}
                variant={selectedContent === key ? 'solid' : 'outline'}
                backgroundColor='#f8852f'
                color='white'
                w="100%"
                onClick={() => setSelectedContent(key)}
              >
                {key}
              </Button>
            ))}
          </VStack>
          <Box ml="8" p="4" borderLeft="1px solid #9fc74a" minWidth="300px" minHeight="200px">
            <Text fontSize="lg" mb="4">
              {selectedContent}
            </Text>
            {content[selectedContent]}
          </Box>
        </Flex>
      </Flex>

      <div id="char">
        <h3>"Investing in education is the most powerful way to create a brighter future. Your support can change a life, and through that life, change the world."</h3>
        <img src={kids} alt="kids"/>
      </div>
    </div>

  );
};