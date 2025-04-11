import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js/auto";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { Chart } from "react-chartjs-2";
import { useColorModeValue } from "../ui/color-mode";
import { Box, Heading } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface ComparisonChartProps {
  labels: number[];
  scores: number[];
  realConsumptions: number[];
  trendScores: number[];
  transitionPoint: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  labels,
  scores,
  realConsumptions,
  trendScores,
  transitionPoint,
}) => {
  const bgColor = useColorModeValue("bg.subtle", "bg.subtle");
  const textColor = useColorModeValue("black", "white");
  const gridColor = useColorModeValue("gray.300", "whiteAlpha.400");

  const annotations: Record<string, AnnotationOptions> = {
    transitionLine: {
      type: "line",
      xMin: transitionPoint,
      xMax: transitionPoint,
      borderColor: "red",
      borderWidth: 2,
      borderDash: [5, 5],
      label: {
        content: "Transition Init → Active Learning",
        display: true,
        position: "end",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        color: textColor,
      },
    },
  };

  const data: ChartData<"bar" | "line", number[], number> = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Actual Consumption",
        data: realConsumptions,
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        borderColor: "green",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Actual Consumption Model Score",
        data: scores,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        type: "line",
        label: "Trendline Consumption Model Score",
        data: trendScores,
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
      annotation: {
        annotations,
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
        Score & Consumption Comparison
      </Heading>
      <Chart type="bar" data={data} options={options} />
    </Box>
  );
};

export default ComparisonChart;
