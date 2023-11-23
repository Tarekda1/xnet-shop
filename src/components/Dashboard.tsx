// src/components/Dashboard.js
import React, { FC, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import MyChart from "./Chart/DataChat";
import PieChart from "./PieChart/PieChart";
import useAxios from "../hooks/useAxios";
import { getToken } from "../utils/storageUtils";
import { Product } from "../entities/Product";
ChartJS.register(...registerables);

const Dashboard: FC = () => {
  const [getDateTimFromServer, dateTimeState] = useAxios();
  const [getProductCount, productCountState] = useAxios();
  const [getLastFiveProducts, lastFiveProductsState] = useAxios();
  const user = getToken();
  useEffect(() => {
    getDateTimFromServer({
      url: `/util/datetime`,
      method: "GET",
    });
    getProductCount({
      url: `/products/productscount`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken || ""}`,
      },
    });
    getLastFiveProducts({
      url: `/products/lastfiveproducs`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken || ""}`,
      },
    });
  }, [
    getDateTimFromServer,
    getProductCount,
    getLastFiveProducts,
    user?.accessToken,
  ]);

  useEffect(() => {
    console.log(lastFiveProductsState?.data || "");
  }, [lastFiveProductsState?.data]);

  const data = {
    labels: ["Sep", "Oct", "November"],
    datasets: [
      {
        label: "In USD",
        data: [100, 200, 300],
        backgroundColor: ["lightblue", "lightblue", "lightblue"],
      },
    ],
  };

  const salesData = {
    labels: ["Sep", "Oct", "November"],
    datasets: [
      {
        label: "In USD",
        data: [200, 300, 500],
        backgroundColor: ["green", "green", "green"],
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
          <h3 className="font-bold">Total products</h3>
          <p>{productCountState.data?.totalProducts} items</p>
          <div className="flex justify-center">
            <i className="@apply !text-[10rem] fa fa-gift "></i>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md">
          <h3 className="font-bold">Last 5 products added</h3>
          {lastFiveProductsState.data?.map((product: Product) => {
            return (
              <li
                className="list-none p-2 pl-0 flex flex-row w-full border-bottom-gray-200 border-b-[1px]"
                key={product._id}
              >
                <img
                  className="object-contain w-12 pr-2 "
                  alt={product.name}
                  src={product.image}
                />{" "}
                <p className="text-sm"> {product.name}</p>
              </li>
            );
          })}
        </div>
        <div className="bg-white p-4 shadow-md">
          <h3 className="font-bold">Total revenue in (USD)</h3>
          <Bar data={data} title="" />
        </div>
        <div className="bg-white p-4 shadow-md">
          <h3 className="font-bold">Total Sales in (USD)</h3>
          <Bar data={salesData} title="" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Grid Item 1 */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">System time</h3>
          <div className="flex justify-center">
            {dateTimeState.loading ? (
              "Loading"
            ) : (
              <p className="text-9xl">{dateTimeState.data?.dateTime}</p>
            )}
          </div>
        </div>

        {/* Grid Item 2 */}
        {/* <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 2</h3>
          <p>This is the content of Grid Item 2.</p>
        </div> */}

        {/* Grid Item 3 */}
        {/* <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 3</h3>
          <p>This is the content of Grid Item 3.</p>
        </div> */}

        {/* Grid Item 4 */}
        {/* <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold">Grid Item 4</h3>
          <p>This is the content of Grid Item 4.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
