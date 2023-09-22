import React from "react";
import { useSalesOrderForm } from "../hooks/useSalesOrderForm";

const SalesOrderPage: React.FC = () => {
  const { salesItems } = useSalesOrderForm();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Sales Order</h1>

      <div>
        <h2 className="text-lg font-semibold mb-2">Sales Items</h2>
        <ul>
          {salesItems.map((item, index) => (
            <li key={index}>
              Customer Name: {item.customerName}, Product Name:{" "}
              {item.productName}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SalesOrderPage;
