import { Text, Box, Center, Stack, Flex, Badge } from "@chakra-ui/react";
import Navigationbar from "@/components/Navbar";
import ActivityTable from "@/components/DashboardDataTable";
import DashboardStats from "@/components/DashboardStats";
import { useColorMode } from "@/components/ui/color-mode";
import { getDecodedTokenValue } from "@/utils/token.util";
import { use, useEffect, useState } from "react";
import DashboardDataTable from "@/components/DashboardDataTable";
import { getDashboardData } from "@/services/userData.service";
import { DashboardData } from "@/types/ApiResponses";

export default function Landingpage() {
  const { colorMode } = useColorMode();
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const decodedRole = getDecodedTokenValue("role");
    setRole(decodedRole === "admin" ? "admin" : "user");

    const decodedUsername = getDecodedTokenValue("user_name");
    setUsername(decodedUsername !== null ? String(decodedUsername) : "");

    async function fetchDashboardData() {
      try {
        const response = await getDashboardData();

        if ("data" in response) {
          setDashboardData(response.data);
        } else {
          throw new Error(response.error || "No data received from server");
        }
      } catch (err) {
        console.error("Fehler beim Laden der Dashboard-Daten:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navigationbar />
      <Center bg="bg" minH="100vh" alignItems={"flex-start"} py={24}>
        <Stack gap={6} maxW="900px" w="full">
          {}
          <Box>
            <Flex flexDir={"row"} gap={4}>
              <Text fontSize="3xl" fontWeight="bold">
                Welcome, {username}!{" "}
              </Text>
              <Badge
                size={"lg"}
                variant={"outline"}
                color={
                  role === "admin"
                    ? colorMode === "light"
                      ? "blue.600"
                      : "blue.500"
                    : colorMode === "light"
                      ? "green.600"
                      : "green.500"
                }
                alignSelf={"center"}
              >
                {role === "admin" ? "Administrator" : "Basic User"}
              </Badge>
            </Flex>
          </Box>

          {}
          {/* <Box boxShadow="lg" rounded="lg" p={6} bg="bg.subtle" w="100%">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Dashboard Overview
            </Text>
            <DashboardStats />
          </Box> */}

          {}
          <Box
            boxShadow="lg"
            rounded="lg"
            p={6}
            bg="bg.subtle"
            w="100%"
            flex="1"
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Last Activities
            </Text>
            <DashboardDataTable dashboardData={dashboardData} />
          </Box>
        </Stack>
      </Center>
    </>
  );
}
