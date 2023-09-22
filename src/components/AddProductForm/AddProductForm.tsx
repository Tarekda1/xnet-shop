// src/components/AddProductForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductForm from "../ProductForm/ProductForm";
import useAddProduct from "../../hooks/useAddProduct";
import { PostedProduct } from "../../entities/Product";

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, register } = useForm<PostedProduct>();
  const { handleAddProduct, postProductState } = useAddProduct();

  const onSubmit: SubmitHandler<PostedProduct> = async (data) => {
    // Handle form submission, e.g., send data to a server
    const product: PostedProduct = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      barcode: data.barcode,
    };
    try {
      await handleAddProduct(product);
      navigate("/products");
    } catch (error) {
      //show error message here
    }

    console.log("Product Data:", data);
  };

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-3xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
        <ProductForm control={control} register={register} />
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {postProductState.loading ? "Loading" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
