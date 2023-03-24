import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface SunsetSunriseChartProps {
  sunset: Date;
  sunrise: Date;
  currentTime: Date;
}

export const options = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
  },
  dataPoints: {
    show: false,
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.4,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = Array(24)
  .fill(0)
  .map((_, i) => `${i}:00`);
export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map((_, i) => i),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const SunsetSunriseChart = ({
  sunset,
  sunrise,
  currentTime,
}: SunsetSunriseChartProps) => {
  return <Line options={options} data={data} />;
};

export default SunsetSunriseChart;
