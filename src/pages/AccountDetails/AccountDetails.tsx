"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  VStack,
  Stack,
  Input,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import Navigationbar from "@/components/Navbar";
import { getAccountDetails } from "@/services/userData.service";
import { AccountDetails, AccountDetailsResponse } from "@/types/ApiResponses";
import { getDecodedTokenValue } from "@/utils/token.util";

const isAccountDetails = (
  account: AccountDetailsResponse
): account is AccountDetails => {
  return (account as AccountDetails).email !== undefined;
};

export default function Daten() {
  const [account, setAccount] = useState<AccountDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userID = getDecodedTokenValue("user_id");

        if (!userID || typeof userID !== "number") {
          throw new Error("No valid user ID found in token.");
        }

        const response = await getAccountDetails(userID);

        if ("error" in response) {
          throw new Error(response.error);
        }

        setAccount(response);
      } catch (err) {
        setError(
          `Fehler beim Laden der Account-Daten: ${(err as Error).message}`
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <Stack gap="4" maxW="xl">
          <Skeleton height="200px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </Stack>
      );
    }

    if (error) {
      return (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      );
    }

    if (!account || !isAccountDetails(account)) {
      return (
        <Text color="red.500" textAlign="center">
          Fehler: Ungültige Account-Daten.
        </Text>
      );
    }

    return (
      <>
        <Box
          boxShadow="sm"
          rounded="lg"
          p={6}
          bg={"bg.subtle"}
          textAlign="center"
        >
          <VStack gap={4}>
            <Avatar size="xl" name={account.email} />
            <Text fontSize="xl" fontWeight="bold" textStyle="fg">
              @{account.userID}
            </Text>
            <Text fontSize="md" color="fg.info">
              {account.email}
            </Text>
          </VStack>
        </Box>

        <Box boxShadow="lg" rounded="lg" p={6} bg="bg.subtle">
          <Flex justifyContent="space-between" alignItems="center" gap={4}>
            <Input disabled flex={1} placeholder="********" />
            <Box>
              <ChangePassword />
            </Box>
          </Flex>
        </Box>

        <Box boxShadow="lg" rounded="lg" p={6} bg="bg.subtle">
          <Flex justifyContent="space-between" alignItems="center" gap={4}>
            <Input disabled flex={1} placeholder={`@${account.userID}`} />
            <Box>
              <ChangeUsername />
            </Box>
          </Flex>
        </Box>
      </>
    );
  };

  return (
    <>
      <Navigationbar />
      <Center py={10} bg="bg" minH="100vh">
        <Stack gap={6} maxW="600px" w="full">
          {renderContent()}
        </Stack>
      </Center>
    </>
  );
}
