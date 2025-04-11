import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

// Chart.js Plugins registrieren
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ConsumptionChartProps {
  labels: number[];
  realConsumptions: number[];
  trendConsumptions: number[];
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({
  labels,
  realConsumptions,
  trendConsumptions,
}) => {
  const bgColor = useColorModeValue("bg.subtle", "bg.subtle");
  const textColor = useColorModeValue("black", "white");
  const gridColor = useColorModeValue("gray", "gray");

  const data = {
    labels,
    datasets: [
      {
        label: "Actual Consumption",
        data: realConsumptions,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Trendline Consumption",
        data: trendConsumptions,
        borderColor: "red",
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        titleColor: textColor,
        bodyColor: textColor,
        backgroundColor: bgColor,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="sm" w="100%">
      <Heading size="md" mb={3} color={textColor}>
        Actual Consumption Over Iterations
      </Heading>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ConsumptionChart;
