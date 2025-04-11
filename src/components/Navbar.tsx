import { Flex, Button, Image, Box } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";
import logo_dark from "../assets/logo.png";
import logo_light from "../assets/logo_i.png";

export default function Navigationbar() {
  const location = useLocation();
  const { colorMode } = useColorMode();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      bg="bg.muted"
      p={4}
      align="center"
      justify="space-between"
      zIndex="1000"
      height={"60px"}
    >
      <Image
        src={colorMode === "light" ? logo_light : logo_dark}
        zIndex={100}
        height={"40px"}
        alignItems={"flex-start"}
      ></Image>
      <Box>
        <ColorModeButton />

        <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            variant="ghost"
            size="md"
            color={isActive("/dashboard") ? "blue.400" : "fg"}
            _hover={{ color: "blue.500" }}
          >
            Dashboard
          </Button>
        </NavLink>

        <NavLink to="/input" style={{ textDecoration: "none" }}>
          <Button
            variant="ghost"
            size="md"
            color={isActive("/input") ? "blue.400" : "fg"}
            _hover={{ color: "blue.500" }}
          >
            Algorithm
          </Button>
        </NavLink>

        <AccountMenu />
      </Box>
    </Flex>
  );
}
