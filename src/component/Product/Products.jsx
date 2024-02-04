import { useShoppingCart } from "../../context/CartContext";
import { Box, Center, CircularProgress, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import OneProduct from "./OneProduct";
import { useState } from "react";
import { data } from "../../db/data";

const Products = () => {
  const { searchTerm } = useShoppingCart();
 const [isLoading, setIsLoading] = useState(false);

  return (
    <Box mt="32">
      {isLoading && (
        <Center>
          <CircularProgress isIndeterminate color="blue.500" />
        </Center>
      )}
      <SimpleGrid columns={[1, 2, 2, 2, 3]} spacing={10} my="10">
        {data
          ?.filter((product) => {
            if (
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
              || product.category.toLowerCase().includes(searchTerm.toLowerCase())
              || product.country.toLowerCase().includes(searchTerm.toLowerCase())

            ) {
              return product;
            }
          })
          .map(({ id, image, title, price, description }) => {
            return (
              <OneProduct
                key={id}
                id={id}
                image={image}
                title={title}
                description={description}
                price={price}
              />
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Products;