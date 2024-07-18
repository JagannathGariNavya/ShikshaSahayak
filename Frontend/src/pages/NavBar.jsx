import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Stack,
  Link,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Input,
  InputLeftElement,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import logo from '../../images/logo.png';

export function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDonateOpen, setDonateOpen] = useState(false);
  const [isFundraiserOpen, setFundraiserOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);

  const handleToggle = (menu) => {
    switch (menu) {
      case 'donate':
        setDonateOpen(!isDonateOpen);
        break;
      case 'fundraiser':
        setFundraiserOpen(!isFundraiserOpen);
        break;
      case 'about':
        setAboutOpen(!isAboutOpen);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      position="fixed"
      width="100%"
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      px={4}
      boxShadow="sm"
      zIndex="1000"
    >
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Image src={logo} alt="Logo" h="80px" mr={4} />
        </Box>
        <Box display={{ base: 'none', lg: 'flex' }} alignItems="center" flexWrap="wrap" flexGrow={1} justifyContent="space-around">
          <Menu>
            <MenuButton as={Link} href="#donate" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#f68631' }}>
              Donate <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="#fundDonateInfo">To Individual</MenuItem>
              <MenuItem as={Link} href="#fundDonateInfo">To Group</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Link} href="#fundraiser" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#f68631' }}>
              Fundraiser <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="#myself">Myself</MenuItem>
              <MenuItem as={Link} href="#individual">Individual</MenuItem>
              <MenuItem as={Link} href="#groups">Groups</MenuItem>
            </MenuList>
          </Menu>
          <Link href="#pricing" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#a6d248' }}>Pricing</Link>
          <Menu>
            <MenuButton as={Link} href="#about" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#a6d248' }}>
              About <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="#aboutInfo">About us</MenuItem>
              <MenuItem as={Link} href="#aboutInfo">Support</MenuItem>
              <MenuItem as={Link} href="#aboutInfo">Help</MenuItem>
              <MenuItem as={Link} href="#aboutInfo">FAQ's</MenuItem>
              <MenuItem as={Link} href="#aboutInfo">Contact Info</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Flex alignItems="center">
          <InputGroup size="sm" width="200px" mr={4} display={{ base: 'none', lg: 'flex' }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input type="search" placeholder="Search" />
          </InputGroup>
          <Button backgroundColor='#f68631' color='white' variant="solid" mx={2} height='35px' borderRadius="30px" fontWeight="500" fontSize="lg">Start a fundraiser</Button>
          <Box mx={2} display={{ base: 'none', lg: 'flex' }} alignItems="center">
            <Menu>
              <MenuButton as={IconButton} icon={<FaUser />} variant="outline" fontSize="lg" />
              <MenuList>
                <MenuItem as={Link} href="#login">Login</MenuItem>
                <MenuItem as={Link} href="#register">Register</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ base: 'flex', lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent bg="rgba(255, 255, 255, 0.8)" backdropFilter="blur(10px)">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <Stack as="nav" spacing={4}>
                  <Link href="#home" onClick={onClose}>Home</Link>
                  <Box>
                    <Button onClick={() => handleToggle('donate')} variant="link">
                      Donate <ChevronDownIcon />
                    </Button>
                    <Collapse in={isDonateOpen}>
                      <Stack pl={4} mt={2} spacing={1}>
                        <Link href="#fundDonateInfo" onClick={onClose}>To Individual</Link>
                        <Link href="#fundDonateInfo" onClick={onClose}>To Group</Link>
                      </Stack>
                    </Collapse>
                  </Box>
                  <Box>
                    <Button onClick={() => handleToggle('fundraiser')} variant="link">
                      Fundraiser <ChevronDownIcon />
                    </Button>
                    <Collapse in={isFundraiserOpen}>
                      <Stack pl={4} mt={2} spacing={1}>
                        <Link href="#myself" onClick={onClose}>Myself</Link>
                        <Link href="#individual" onClick={onClose}>Individual</Link>
                        <Link href="#groups" onClick={onClose}>Groups</Link>
                      </Stack>
                    </Collapse>
                  </Box>
                  <Link href="#pricing" onClick={onClose}>Pricing</Link>
                  <Box>
                    <Button onClick={() => handleToggle('about')} variant="link">
                      About <ChevronDownIcon />
                    </Button>
                    <Collapse in={isAboutOpen}>
                      <Stack pl={4} mt={2} spacing={1}>
                        <Link href="#aboutInfo" onClick={onClose}>About us</Link>
                        <Link href="#aboutInfo" onClick={onClose}>Support</Link>
                        <Link href="#aboutInfo" onClick={onClose}>Help</Link>
                        <Link href="#aboutInfo" onClick={onClose}>FAQ's</Link>
                        <Link href="#aboutInfo" onClick={onClose}>Contact Info</Link>
                      </Stack>
                    </Collapse>
                  </Box>
                  <InputGroup size="sm" width="200px" mt={4}>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.500" />
                    </InputLeftElement>
                    <Input type="search" placeholder="Search" />
                  </InputGroup>
                  <Link href="#start" onClick={onClose}>Start a fundraiser</Link>
                  <Link href="#login" onClick={onClose}>Login</Link>
                  <Link href="#register" onClick={onClose}>Register</Link>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      ) : null}
    </Box>
  );
}
