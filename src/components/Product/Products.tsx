import React from 'react';
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Box, Center, CircularProgress, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "./SingleProduct";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

const Products: React.FunctionComponent = () => {
  const { searchTerm } = useShoppingCart();
  const storeAPIUrl: string = process.env.NEXT_PUBLIC_FAKE_STORE_API as string

  const { data, isLoading } = useQuery<Product[]>(["products"], () => {
    return fetch(storeAPIUrl).then((res) =>
      res.json()
    );
  });

  return (
    <Box mt="32">
      {isLoading && (
        <Center>
          <CircularProgress isIndeterminate color="blue.500" />
        </Center>
      )}
      <SimpleGrid columns={[1, 2, 2, 2, 3]} spacing={10} my="10">
        {data
          ?.filter((product: Product) => {
            if (
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return product;
            }
          })
          .map(({ id , image, title, price, description }) => {
            return (
              <SingleProduct
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
