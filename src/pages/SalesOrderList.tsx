import React from "react";
import useSalesOrder from "../hooks/useSalesOrder";
import { SalesOrder } from "../entities/SalesOrder";
import { Link } from "react-router-dom";

const SalesOrderPage: React.FC = () => {
  const {
    salesOrder,
    salesOrderState: { loading },
  } = useSalesOrder();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders list</h1>
      <div className="flex flex-row gap-2 mb-4">
        <div className="flex-1">
          <div className="card bg-blue-300">
            <h2 className="text-md font-semibold">Total Order</h2>
            <p>10</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="card bg-red-300">
            <h2 className="text-md font-semibold">Total Sales (USD)</h2>
            <p>10</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="card bg-purple-300">
            <h2 className="text-md font-semibold">Total Profit (USD)</h2>
            <p>10</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="card">
            <h2 className="text-md font-semibold">Total Orders</h2>
            <p>10</p>
          </div>
        </div>
      </div>
      <div>
        <table className="min-w-full divide-y-2 divide-gray-200 border-separate border-spacing-y-2">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Order#
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Customer name
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Total items per Order
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Profit per order(USD)
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Status
              </th>
              <th></th>
            </tr>
          </thead>
          {loading ? (
            <span>loading</span>
          ) : (
            <tbody>
              {salesOrder.map((salesOrder: SalesOrder) => (
                <tr
                  key={salesOrder._id}
                  className="shadow  bg-white row h-8 m-[2px] border-r-2 hover:bg-blue-300 rounded"
                >
                  <td className="p-2 pl-4 py-2 rounded-tl-md rounded-bl-md">
                    {/* Add a Font Awesome icon for the product */}
                    <h2 className="text-l font-semibold text-blue-400 underline">
                      <Link to={`/orders/${salesOrder?.orderId}`}>
                        {salesOrder?.orderId}
                      </Link>
                    </h2>
                  </td>
                  <td className="p-2">
                    {/* Add a Font Awesome icon for the product */}
                    <h2 className="text-l text-md">{salesOrder?.customer}</h2>
                  </td>
                  <td className="p-2">
                    {/* Add a Font Awesome icon for the product */}
                    <h2 className="text-l">{salesOrder?.items?.length} item</h2>
                  </td>
                  <td className="p-2">
                    {/* Add a Font Awesome icon for the product */}
                    <h2 className="text-l font-semibold text-cyan-700">
                      {salesOrder?.totalProfit}$
                    </h2>
                  </td>
                  <td>
                    <div className="flex w-min-width w-20 bg-green-300 text-sm rounded border p-0">
                      <p className="text-gray-500  ml-2 ">
                        {salesOrder?.status === "paid" ? (
                          <i className="fa fa-check pr-2"></i>
                        ) : (
                          <i className="fa fa-loading"></i>
                        )}
                        {salesOrder.status || 0}
                      </p>
                    </div>
                  </td>
                  <td className="rounded-br-md rounded-tr-md">
                    <div className="flex w-min-width rounded">
                      <button>
                        <i className="fa fa-eye" />{" "}
                        <span className="text-sm font-semibold underline pl-[5px]">
                          View order
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SalesOrderPage;
