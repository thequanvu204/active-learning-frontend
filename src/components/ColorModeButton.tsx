import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
    >
      {colorMode === "dark" ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
}
