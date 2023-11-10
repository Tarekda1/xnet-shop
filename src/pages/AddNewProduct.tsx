import React, { FC, useCallback } from "react";
import AddProductForm from "../components/AddProductForm/AddProductForm";
import { useNavigate } from "react-router-dom";


const AddNewProduct: FC = () => {
  const navigate = useNavigate();
  const onbackcb = useCallback(() => { navigate(-1); }, []);
  return (
    <div className="container mx-auto">
      <div className="flex p-2">
        <button className="" onClick={onbackcb}><i className="fa fa-thin fa-arrow-left pr-2"></i>Go back</button>
      </div>
      <div className="card">
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddNewProduct;
