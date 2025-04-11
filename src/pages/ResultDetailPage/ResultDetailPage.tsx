import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigationbar from "@/components/Navbar";
import {
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { UserResult } from "@/types/UserResult";
import ComparisonChart from "@/components/charts/ComparisonChart";
import ConsumptionChart from "@/components/charts/ConsumptionChart";

const ResultDetailPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserResult | null>(null);

  useEffect(() => {
    fetch("/pseudo-backend.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const userResult = jsonData.users.find(
          (user: UserResult) => user.user_id === Number(id)
        );
        setUserData(userResult || null);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [id]);

  if (!userData)
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <>
      <Navigationbar />
      <Box maxW="8xl" mx="auto" pt={"80px"} px={6} overflowY={"none"}>
        <Heading size="xl" mb={4}>
          Model Results for {userData.name}
        </Heading>

        <HStack gap={4} align="stretch">
          <Box bg="bg.muted" p={4} borderRadius="lg" boxShadow="sm" flex="1">
            <Heading size="md" mb={2}>
              Input File
            </Heading>
            <Stack gap={1}>
              <Text textStyle={"fg"}>
                <strong>Name:</strong> {userData.input_file.name}
              </Text>
              <Text textStyle={"fg"}>
                <strong>Uploaded:</strong>{" "}
                {new Date(userData.input_file.timestamp).toLocaleString()}
              </Text>
              <Text textStyle={"fg"}>
                <strong>File Size:</strong> {userData.input_file.size_kb} KB
              </Text>
              <Text textStyle={"fg"}>
                <strong>Format:</strong> {userData.input_file.format}
              </Text>
            </Stack>
          </Box>

          <Box bg="bg.muted" p={4} borderRadius="lg" boxShadow="sm" flex="1">
            <Heading size="md" mb={2}>
              Export File
            </Heading>
            <Stack gap={1}>
              <Text textStyle={"fg"}>
                <strong>Name:</strong> {userData.export_file.name}
              </Text>
              <Text textStyle={"fg"}>
                <strong>Generated on:</strong>{" "}
                {new Date(userData.export_file.timestamp).toLocaleString()}
              </Text>
              <Text textStyle={"fg"}>
                <strong>Size:</strong> {userData.export_file.size_kb} KB
              </Text>
              <Text textStyle={"fg"}>
                <strong>Format:</strong> {userData.export_file.format}
              </Text>
            </Stack>
          </Box>
        </HStack>

        <Box bg="bg.muted" p={4} borderRadius="lg" boxShadow="sm" mt={6}>
          <Heading size="md" mb={2}>
            Model Results
          </Heading>
          <HStack gap={1}>
            <Text>
              <strong>Number of Iterations:</strong>{" "}
              {userData.model_results.iterations}
            </Text>
            <Text>
              <strong>Average Score:</strong>{" "}
              {userData.model_results.average_score.toFixed(2)}
            </Text>
            <Text>
              <strong>Transition Point:</strong>{" "}
              {userData.model_results.transition_point} Iteration
            </Text>
          </HStack>

          <HStack gap={4} mt={4}>
            <Box bg="bg.muted" p={3} borderRadius="md" boxShadow="sm" w="100%">
              <ComparisonChart
                labels={Array.from(
                  { length: userData.model_results.iterations },
                  (_, i) => i + 1
                )}
                scores={userData.model_results.scores}
                realConsumptions={userData.model_results.real_consumptions}
                trendScores={userData.model_results.trend_scores || []}
                transitionPoint={userData.model_results.transition_point}
              />
            </Box>

            <Box bg="bg.muted" p={3} borderRadius="md" boxShadow="sm" w="100%">
              <ConsumptionChart
                labels={Array.from(
                  { length: userData.model_results.iterations },
                  (_, i) => i + 1
                )}
                realConsumptions={userData.model_results.real_consumptions}
                trendConsumptions={
                  userData.model_results.trend_consumptions || []
                }
              />
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default ResultDetailPage;
