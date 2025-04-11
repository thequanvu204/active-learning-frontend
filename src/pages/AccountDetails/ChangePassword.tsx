import { useState } from "react";
import { Button, Field, Box } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordValidation } from "@/components/PasswordValidation";

import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "@/components/ui/dialog";

const ChangePassword = () => {
  const [value1, setValue1] = useState(""); // Altes Passwort
  const [newPassword, setNewPassword] = useState(""); // Neues Passwort

  return (
    <DialogRoot placement="center" motionPreset="slide-in-bottom" size={"lg"}>
      <DialogTrigger asChild>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          color={"white"}
          bg={"blue.900"}
          _hover={{
            bg: "black",
          }}
          _focus={{
            bg: "blue.900",
          }}
        >
          Change password
        </Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent bg="bg.emphasized" color="fg">
        <DialogHeader>
          <DialogTitle textStyle={"xl"}>Change password</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field.Root mb={4}>
            <Field.Label>Old password</Field.Label>
            <PasswordInput
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              bg={"bg.muted"}
              color={"fg"}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>New password</Field.Label>
            <PasswordInput
              bg={"bg.muted"}
              color={"fg"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Hier wird `PasswordValidation` korrekt eingebunden */}
            <Box width={"100%"}>
              <PasswordValidation password={newPassword} />
            </Box>
          </Field.Root>
        </DialogBody>
        <DialogFooter mt={0}>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              color="black"
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button bg="blue.900" color="white" _hover={{ bg: "black" }}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ChangePassword;
