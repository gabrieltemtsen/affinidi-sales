import React, { useRef } from 'react';
import { useShoppingCart } from "@/context/ShoppingCartContext";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
} from "@chakra-ui/react";
import CartItemInDrawer from "../CartItemInDrawer";

interface DrawerComponentProps {
  isOpen: boolean;
  onClose: () => void;
  drawerHeader: string;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ isOpen, onClose, drawerHeader }) => {
  const { cartItems } = useShoppingCart();
  const btnRef = useRef<HTMLButtonElement>(null);

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
              <CartItemInDrawer {...item} key={item.id} />
            ))}
          </Grid>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
