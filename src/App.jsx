import React from 'react';
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

import { ShoppingCartProvider } from "./context/CartContext";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ShoppingCartProvider>
      <Navbar />

      <Container maxW="6xl">
        <Products />
      </Container>

      </ShoppingCartProvider>

    </ChakraProvider>
  );
}

export default App;
