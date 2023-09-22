// src/components/PieChart.tsx
import React, { FC } from "react";
import { Pie } from "react-chartjs-2";

interface PieProps {
  data: any;
  options?: any;
}

const PieChart: FC<PieProps> = ({ data }) => {
  // Sample data for a pie chart
  //   const data = {
  //     labels: ["Category A", "Category B", "Category C"],
  //     datasets: [
  //       {
  //         data: [30, 40, 30],
  //         backgroundColor: ["red", "green", "blue"],
  //       },
  //     ],
  //   };

  const options = {
    title: {
      display: true,
      text: "Pie Chart Example",
    },
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={data} options={{}} />
    </div>
  );
};

export default PieChart;
