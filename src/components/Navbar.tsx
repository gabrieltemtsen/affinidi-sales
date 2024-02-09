import { useShoppingCart } from "@/context/ShoppingCartContext";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaBolt, FaShoppingCart, FaSearch } from "react-icons/fa";
import DrawerComponent from "./Drawer";
import { useAuthentication } from "@/lib/hooks/use-authentication";
import { useLocalContent } from "@/lib/hooks/use-local-content";
import { signOut } from "next-auth/react";
import { profile } from "console";
import { clientLogin } from "@/lib/auth/client-login";
const Header: React.FunctionComponent = () => {
  const { inputSearchedTerm } = useShoppingCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = useRef(null);
  const { user, isAuthenticated, isLoading } = useAuthentication();
  const { country } = useLocalContent();
  const [profile, setProfile] = useState<any>([]);


  const logout = async() => {
    await signOut();
  };

  const renderLoginState = () => {
    if (isLoading) {
      return <p>Loading..</p>;
    }

    // if (error) {
    //   console.log(error)
    //   return (
    //     <div>
    //       <Text fontSize={'12px'}>Unable to load user data.</Text>
    //     </div>
    //   );
    // }
    if (isAuthenticated && user) {
        return (
          <Flex>
             <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={user?.picture}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'xl'}
                      src={user?.picture}
                    />
                  </Center>
                  <Center>
                    <Text mt={2} fontSize={'20px'} fontWeight={600}>{user?.firstName}</Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem justifyContent={'center'} fontSize={'18px'} >Account Settings</MenuItem>
                  <MenuItem justifyContent={'center'} fontSize={'18px'}  onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
          </Flex>
        );
      }
  
  return (
    <>
    <Flex  justifyContent={'center'}>
   <Button onClick={clientLogin}>
    Login with Affinidi
   </Button>
    </Flex>
    </>
  );
    };






  return (
    <>
      <Box
        as="nav"
        py="6"
        background={'blue.700'}
        fontSize="3xl"
        borderBottom="1px solid #eee"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="2"
      >
        <Container maxW="6xl">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color={'white'}  fontSize={'20px'}>AFFINIDI-SALES</Heading>

            {/* search option  */}
            <InputGroup mx="10px" maxW="20em">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.500" />
              </InputLeftElement>

              <Input
                placeholder="Search"
                size="md"
                variant="filled"
                onChange={(e) => inputSearchedTerm(e.target.value)}
              />
            </InputGroup>

            {/* Cart option  */}
            <Flex fontSize="4xl" alignItems="center" justifyContent="center">
              <Button ref={drawerRef} onClick={onOpen}>
                <FaShoppingCart fontSize="24px" />
              </Button>
            </Flex>

            {renderLoginState()}
          </Flex>
        </Container>
      </Box>

      {/* Drawer option  */}
      <DrawerComponent
        isOpen={isOpen}
        onClose={onClose}
        drawerHeader="Your Cart"
      />
    </>
  );
};

export default Header;
