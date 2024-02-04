import {
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import DrawerComponent from "../Drawer";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useShoppingCart } from "../../context/CartContext";

const OneProduct = ({ id, image, title, description, price }) => {
  const { isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { addItemToCart, removeItem, getItemsQuantity } = useShoppingCart();


  return (
    <Box key={id} maxW="lg" border="1px solid #eee" rounded="md" p="3">
      <Image src={image} alt={title} width="300" height="300" />
      <Heading noOfLines={1} fontSize="xl" mt="2">
        {title}
      </Heading>
      <Text noOfLines={2} my="2">
        {description}
      </Text>
      <Text mb="2" fontSize="2xl" fontWeight="bold">
        ${price}
      </Text>
      {getItemsQuantity(id) === 0 ? (
        <Button
          leftIcon={<FaPlus />}
          colorScheme="messenger"
          w="full"
          //
          onClick={() => {
            addItemToCart(id);
            toast({
              title: `${title} Added`,
              description: "products successfully added",
              status: "success",
              position: "bottom",
              variant: "subtle",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          Add Product
        </Button>
      ) : (
        <Button
          leftIcon={<FaMinus />}
          w="full"
          colorScheme="red"
          onClick={() => {
            removeItem(id);
            toast({
              title: `${title} Removed`,
              description: "products successfully removed",
              status: "error",
              position: "bottom",
              variant: "subtle",
              duration: 5000,
              OneProduct,
              isClosable: true,
            });
          }}
        >
          Remove from Cart
        </Button>
      )}

      {/* Drawer*/}
      <DrawerComponent isOpen={isOpen} onClose={onClose} drawerHeader="Cart" />
    </Box>
  );
};

export default OneProduct;