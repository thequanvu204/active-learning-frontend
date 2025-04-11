import { Button } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChangeUsername = () => {
  return (
    <DialogRoot placement="center" motionPreset="slide-in-bottom">
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
          Change username
        </Button>
      </DialogTrigger>
      <DialogContent bg="bg.emphasized" color="fg">
        <DialogHeader>
          <DialogTitle>Change username</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field.Root mb={4}>
            <Field.Label>Old username</Field.Label>
            <Input bg={"bg.muted"} border={"white"} placeholder=" " />
          </Field.Root>
          <Field.Root>
            <Field.Label>New username</Field.Label>
            <Input bg={"bg.muted"} border={"white"} placeholder=" " />
          </Field.Root>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild mt={1}>
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

export default ChangeUsername;
