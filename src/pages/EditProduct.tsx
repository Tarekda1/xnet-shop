import React, { FC } from "react";
import EditProductForm from "../components/EditProductForm/EditProductForm";
import { useParams } from "react-router-dom";

const AddNewProduct: FC = () => {
  const { id } = useParams();
  console.log(`id: ${id}`);
  return (
    <div className="container mx-auto ml-4 pb-4">
      <EditProductForm id={id} />
    </div>
  );
};

export default AddNewProduct;
