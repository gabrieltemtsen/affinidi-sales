import React, {useState} from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './component/Navbar';
import Products from "./component/Product/Products";
import { Container } from "@chakra-ui/react";
import UserContext from './context/UserContext';

import { ShoppingCartProvider } from "./context/CartContext";

function App() {
  const [userProfile, setUserProfile] = useState(null);
  return (
    <UserContext.Provider value={{ profile: userProfile, setProfile: setUserProfile }}>

    <ChakraProvider theme={theme}>
      <ShoppingCartProvider>
      <Navbar />

      <Container maxW="6xl">
        <Products />
      </Container>

      </ShoppingCartProvider>

    </ChakraProvider>
    </UserContext.Provider>

  );
}

export default App;
