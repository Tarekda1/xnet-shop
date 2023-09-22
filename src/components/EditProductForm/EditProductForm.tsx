// src/components/AddProductForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostedProduct } from "../../entities/Product";
import ProductFormEditable from "../ProductFormEditable/ProductFormEditable";
import useEditProduct from "../../hooks/useEditProduct";
import { useNavigate } from "react-router-dom";

type EditProps = {
  id?: string;
};

const EditProductForm: React.FC<EditProps> = ({ id }) => {
  const navigate = useNavigate();
  const { handleSubmit, control, register } = useForm<PostedProduct>();
  const { handleEditProduct } = useEditProduct();

  const onSubmit: SubmitHandler<PostedProduct> = async (data) => {
    // Handle form submission, e.g., send data to a server
    try {
      console.log(data);
      const product: PostedProduct = {
        _id: id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data?.image,
        barcode: data.barcode,
      };
      await handleEditProduct(product);
      navigate("/products");
    } catch (error) {
      //show error message here
    }

    // console.log("Product Data:", data);
  };

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-3xl font-semibold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl">
        <ProductFormEditable
          control={control}
          register={register}
          productId={id}
        />
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {"Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
