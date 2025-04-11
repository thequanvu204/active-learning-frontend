import { HStack, Icon, Stat, Flex } from "@chakra-ui/react";
import { CiImport, CiExport } from "react-icons/ci";

export default function DashboardStats() {
  return (
    <Flex gap={4} dir="column" width={"100%"}>
      <Stat.Root borderWidth="1px" p="4" rounded="md">
        <HStack justify="space-between">
          <Stat.Label>Exports this month</Stat.Label>
          <Icon color="fg.muted">
            <CiExport />
          </Icon>
        </HStack>
        <Stat.ValueText>26</Stat.ValueText>
      </Stat.Root>
      <Stat.Root borderWidth="1px" p="4" rounded="md">
        <HStack justify="space-between">
          <Stat.Label>Imports this month</Stat.Label>
          <Icon color="fg.muted">
            <CiImport />
          </Icon>
        </HStack>
        <Stat.ValueText>37</Stat.ValueText>
      </Stat.Root>
    </Flex>
  );
}
