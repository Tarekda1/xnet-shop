import React from "react";
import CreateSalesOrderFormUpdated from "../components/CreateSalesOrderForm/CreateSalesOrderFormUpdated";

const SalesOrderPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Sales Order</h1>
      <div className="card">
        <CreateSalesOrderFormUpdated onSubmit={() => {}} />
      </div>
    </div>
  );
};

export default SalesOrderPage;
