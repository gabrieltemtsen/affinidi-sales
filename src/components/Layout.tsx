import { Box, Container } from "@chakra-ui/react";
import Header from "./Navbar";
import type { ChildernProps } from "@/types/types";
import Footer from "./Footer";

const Layout: React.FunctionComponent<ChildernProps> = ({ children }) => {
  return (
    <Box as="section">
      <Header />
      <Box as="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
