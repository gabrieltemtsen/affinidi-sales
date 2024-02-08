import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { debounce } from "lodash";

type ShoppingCartContextProps = {
  getItemsQuantity: (id: number) => number;
  addItemToCart: (id: number) => void;
  removeItem: (id: number) => void;
  cartItems: CartItemsProps[];
  searchTerm: string;
  cartItemsQuantity: number;
  inputSearchedTerm: (term: string) => void | ((e: string) => void);
};

export type CartItemsProps = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => useContext(ShoppingCartContext);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useLocalStorage<CartItemsProps[]>(
    "shopping-cart",
    []
  );

  const inputSearchedTerm = debounce((e) => {
    setSearchTerm(e); 
  }, 500);

  function getItemsQuantity(id: number) {
    return (
      cartItems?.find((currentItem) => currentItem.id === id)?.quantity || 0
    );
  }

  function addItemToCart(id: number) {
    setCartItems((currentItem) => {
      if (currentItem?.find((item) => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem?.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id: number) {
    setCartItems((currentItem) => currentItem.filter((item) => item.id !== id));
  }

  const cartItemsQuantity = cartItems?.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        removeItem,
        addItemToCart,
        cartItemsQuantity,
        searchTerm,
        inputSearchedTerm,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
