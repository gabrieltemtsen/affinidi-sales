
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Container,
  Input,
  Heading,
  InputGroup,
  InputLeftElement,
    Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth';
import { useShoppingCart } from "../context/CartContext";
import { FaBolt, FaShoppingCart, FaSearch } from "react-icons/fa";
import DrawerComponent from "./Drawer";

import React, { useRef,useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';


export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setProfile } = useContext(UserContext);

  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: `${process.env.BASE_URL}/api/affinidi-auth/complete`
  });
  

  const { inputSearchedTerm } = useShoppingCart();
  const drawerRef = useRef();

  const [localProfile, setLocalProfile] = useState(null);

  useEffect(() => {
  // Convert objects to strings to compare them
  const currentProfileStr = JSON.stringify(profile);
  const localProfileStr = JSON.stringify(localProfile);

  // Only update if the stringified versions differ
  if (currentProfileStr !== localProfileStr) {
    setLocalProfile(profile);
    setProfile(profile); // assuming setProfile comes from a context and is stable
  }
}, [profile])




  const logout = () => {
    handleLogout();
    window.location.href = "/";
  };

  const renderLoginState = () => {
    if (isLoading) {
      return <p>Loading..</p>;
    }

    if (error) {
      alert(error)
      console.log(error)
      return (
        <div>
          <Text fontSize={'12px'}>Unable to load user data. Please try again later.</Text>
        </div>
      );
    }
    if (profile) {
        return (
          <Flex>
             <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={profile?.picture}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'xl'}
                      src={profile?.picture}
                    />
                  </Center>
                  <Center>
                    <Text mt={2} fontSize={'20px'} fontWeight={600}>{profile.givenName}</Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem justifyContent={'center'} fontSize={'18px'} >Account Settings</MenuItem>
                  <MenuItem justifyContent={'center'} fontSize={'18px'}  onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
          </Flex>
        );
      }
  
  return (
    <>
    <Flex  justifyContent={'center'}>
    <AffinidiLoginButton 
    authInitUrl={`${process.env.BASE_URL}/api/affinidi-auth/init`}
    containerStyles={{
    margin: '5px',
    padding: '5px',
  }}
  buttonStyles={{
    backgroundColor: 'navy',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
    border: 'none',
    fontSize: '12px',
    borderRadius: '5px',
    padding: '19px',
    cursor: 'pointer',
    width: '109px',
  }}/>
    </Flex>
    </>
  );
    };

   
  return (
    <>
      <>
    <Box
      as="nav"
      py="6"
      fontSize="3xl"
      borderBottom="1px solid #eee"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="2"
      bg="white"
    >
      <Container maxW="6xl">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize={'18px'}>AFFINIDI-SALES</Heading>

          {/* search option  */}
          <InputGroup mx="10px" maxW="15em">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>

            <Input
              placeholder="Search"
              size="md"
              variant="filled"
              onChange={(e) => inputSearchedTerm(e.target.value)}
            />
          </InputGroup>
          {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button> */}

          {/* Cart option  */}
          <Flex fontSize="4xl" alignItems="center" justifyContent="center">
            <Button ref={drawerRef} onClick={onOpen}>
              <FaShoppingCart fontSize="20px" />
            </Button>
          </Flex>

          {renderLoginState()}
        </Flex>
      </Container>
    </Box>

    {/* Drawer option  */}
    <DrawerComponent
      isOpen={isOpen}
      onClose={onClose}
      drawerHeader="Your Cart"
    />
  </>
    </>
  )
}