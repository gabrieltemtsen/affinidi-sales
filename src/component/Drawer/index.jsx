import { useShoppingCart } from "../../context/CartContext";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
} from "@chakra-ui/react";
import { Box, 
  Button, Center, CircularProgress, ModalCloseButton, ModalFooter,
  FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent,
   ModalBody, ModalHeader, Text, Image, useDisclosure } from "@chakra-ui/react";
   import React, { useEffect, useState, useContext, useRef } from "react";
   import CartItems from "../CartItems";
import UserContext from '../../context/UserContext';



const DrawerComponent = ({ isOpen, onClose, drawerHeader }) => {
  const { profile } = useContext(UserContext);

  const drawerDisclosure = useDisclosure();
  const modalDisclosure = useDisclosure();
  const { cartItems } = useShoppingCart();
  const btnRef = useRef();
  const [opened, setOpened] = useState(false);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const handleProfile = () => { console.log('Gabu',profile); };
  handleProfile()
  const [userData, setUserData] = useState({
    firstName: profile?.givenName || '',
    lastName: profile?.familyName || '', 
    email: profile?.email || '',
    phone: profile?.phoneNumber || '', 
    address: profile?.streetAddress || '', 
    postalCode: profile?.postalCode || '',
    city: profile?.locality || '', 
    country: profile?.country || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // clearCart();
  };

  const handler = () => {
    modalDisclosure.onOpen();
  };
  useEffect(() => {
    // Update userData when profile changes
    if (!userData.firstName) {
      setUserData({
        firstName: profile?.givenName || '',
        lastName: profile?.familyName || '', 
        email: profile?.email || '',
        phone: profile?.phoneNumber || '', 
        address: profile?.streetAddress || '', 
        postalCode: profile?.postalCode || '',
        city: profile?.locality || '', 
        country: profile?.country || ''
      });
    }
  }, [profile]);


  const renderCheckoutModal = () => {
    return (

      <><Button onClick={handler}>Checkout</Button><Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checkout Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input value={userData.firstName} onChange={handleChange} 
            required  />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input value={userData.firstName} onChange={handleChange} 
            required  />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input value={userData.phone} onChange={handleChange} 
            required  />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input value={userData.address} onChange={handleChange} 
            required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Postal Code</FormLabel>
              <Input value={userData.postalCode} onChange={handleChange} 
            required  />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>City</FormLabel>
            <Input value={userData.city} onChange={handleChange} 
            required  />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel> Country</FormLabel>
            <Input value={userData.country} onChange={handleChange} 
            required  />
          </FormControl>
          </ModalBody>

        

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              proceed
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>
    )
  }

  return (
    
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent w="30em" mx="auto" roundedLeft="lg">
        <DrawerCloseButton mt="2" />
        <DrawerHeader>{drawerHeader}</DrawerHeader>

        <DrawerBody>
          <Grid templateColumns="repeat(2, 1fr)">
            {cartItems?.map((item) => (
              <CartItems {...item} key={item.id} />
            ))}
          </Grid>
          <>
          {renderCheckoutModal()}
          </>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;