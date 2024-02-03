import { CartItemsProps, useShoppingCart } from "../context/CartContext";
import { Box, Button, Center, CircularProgress, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { data } from "../db/data";

const CartItems = ({ id, quantity }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { removeItem } = useShoppingCart();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      
      setProduct(data);
      setIsLoading(false);
    })();
  }, []);

  const item = product?.find((i) => i.id === id);
  return (
    <>
      {isLoading ? (
        <Center>
          <CircularProgress isIndeterminate color="blue.500" />
        </Center>
      ) : (
        <Box maxW="72" border="1px solid #eee" p="3" my="3">
          <Image
            src={item?.image}
            alt={item?.title}
            width={200}
            height={200}
            objectFit="contain"
          />
          <Text fontSize="xs" bg="blue.100" w="max" my="2" px="1" py="0.5">
            {item?.category}
          </Text>
          <Text fontSize="md" fontWeight="semibold" noOfLines={1}>
            {item?.title}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            $ {item?.price}
          </Text>
          <Button
            w="full"
            mt="2"
            colorScheme="red"
            onClick={() => removeItem(item?.id)}
          >
            Remove Product
          </Button>
        </Box>
      )}
    </>
  );
};

export default CartItems;