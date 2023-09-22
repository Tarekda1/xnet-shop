import { FC } from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    x: {
      type: "category", // Use 'category' for categorical X-axis data
      title: {
        display: true,
        text: "Categories",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Values",
      },
    },
  },
};

interface ChartProps {
  data: any;
  options?: any;
}

const MyChart: FC<ChartProps> = ({ data }) => <Bar data={data} />;

export default MyChart;
