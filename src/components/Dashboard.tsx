// src/components/Dashboard.js
import React, { FC } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import MyChart from "./Chart/DataChat";
import PieChart from "./PieChart/PieChart";
ChartJS.register(...registerables);

const Dashboard: FC = () => {
  const data = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [
      {
        label: "Total Sales",
        data: [10, 20, 15],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      {/* Bar Chart */}
      <div className="grid grid-cols-4 gap-4 mb-2">
        {/* Grid Item 1 */}
        <div className="bg-white p-4 shadow-md">
          <MyChart data={data} />
        </div>
        <div className="bg-white p-4 shadow-md">
          <PieChart data={data} />
        </div>
        <div className="bg-white p-4 shadow-md">
          <PieChart data={data} />
        </div>
        <div className="bg-white p-4 shadow-md">
          <PieChart data={data} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Grid Item 1 */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 1</h3>
          <p>This is the content of Grid Item 1.</p>
        </div>

        {/* Grid Item 2 */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 2</h3>
          <p>This is the content of Grid Item 2.</p>
        </div>

        {/* Grid Item 3 */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 3</h3>
          <p>This is the content of Grid Item 3.</p>
        </div>

        {/* Grid Item 4 */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 4</h3>
          <p>This is the content of Grid Item 4.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
