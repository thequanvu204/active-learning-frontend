import { Button, Avatar } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";

const AccountMenu = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant="ghost"
          size="md"
          _hover={{ backgroundColor: "transparent" }}
          _expanded={{ backgroundColor: "transparent" }}
        >
          <Avatar.Root
            color={colorMode === "light" ? "black" : "white"}
            css={{
              backgroundColor:
                colorMode === "light"
                  ? "var(--chakra-colors-blue-300)"
                  : "var(--chakra-colors-blue-700)",
            }}
          >
            <Avatar.Fallback />
          </Avatar.Root>
        </Button>
      </MenuTrigger>
      <MenuContent divideY={"1px"}>
        <MenuItem
          value="new-txt-a"
          cursor={"pointer"}
          onClick={() => navigate("/account-details")}
        >
          Manage Account
        </MenuItem>
        <MenuItem value="export-a" color={"red"} onClick={() => navigate("/")}>
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default AccountMenu;
