import React, { FC } from "react";
import AddProductForm from "../components/AddProductForm/AddProductForm";

const AddNewProduct: FC = () => {
  return (
    <div className="container mx-auto">
      <div className="card">
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddNewProduct;
