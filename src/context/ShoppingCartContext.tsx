import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { debounce } from "lodash";

type ShoppingCartContextProps = {
  getItemsQuantity: (id: number) => number;
  addItemToCart: (id: number, price: number) => void;
  removeItem: (id: number) => void;
  clearCartItems: () => void; 
  cartItems: CartItemsProps[];
  searchTerm: string;
  cartItemsQuantity: number;
  inputSearchedTerm: (term: string) => void | ((e: string) => void);
  getTotalPrice: () => number; 
  getItemPrice: (id: number) => number};


export type CartItemsProps = {
  id: number;
  quantity: number;
  price: number; // Add a price field to the CartItemsProps type
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



  function getTotalPrice(): number {
       let totalPrice = 0;    
    cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    
    return totalPrice;
  }

  function addItemToCart(id: number, price: number) {
    setCartItems((currentItem: CartItemsProps[]) => {
      if (currentItem?.find((item) => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1, price: price,  }];
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

  function clearCartItems() {
    setCartItems([]);
  }

  function getItemPrice(id: number): number {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.price : 0;
  }

  const cartItemsQuantity = cartItems?.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  console.log('Gabb ',  cartItems)

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getTotalPrice,
        getItemPrice,
        getItemsQuantity,
        removeItem,
        addItemToCart,
        clearCartItems, // Expose the clearCartItems function
        cartItemsQuantity,
        searchTerm,
        inputSearchedTerm,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

