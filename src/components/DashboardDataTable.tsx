import { Table, Badge, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DashboardData } from "@/types/ApiResponses";
import { formatDate } from "@/utils/date.util";

export default function DashboardDataTable({
  dashboardData,
}: {
  dashboardData: DashboardData[];
}) {
  const navigate = useNavigate();
  return (
    <Box flex="1" w="100%" minH="100%">
      <Table.Root
        key={"DashboardDataTable"}
        size="md"
        variant={"outline"}
        width={"100%"}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Username</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader>File Name</Table.ColumnHeader>
            <Table.ColumnHeader>Training Size</Table.ColumnHeader>
            <Table.ColumnHeader>Batch Size</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dashboardData
            .filter((data: DashboardData) => data.date !== null)
            .map((data: DashboardData, index: number) => (
              <Table.Row key={index}>
                <Table.Cell>{data.username}</Table.Cell>
                <Table.Cell>{formatDate(data.date)}</Table.Cell>
                <Table.Cell>{data.file_name}</Table.Cell>
                <Table.Cell>{data.training_size}</Table.Cell>
                <Table.Cell>{data.batch_size}</Table.Cell>
                <Table.Cell>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => navigate(`/results/${index + 1}`)}
                  >
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
