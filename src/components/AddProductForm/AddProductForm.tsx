// src/components/AddProductForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductForm from "../ProductForm/ProductForm";
import useAddProduct from "../../hooks/useAddProduct";
import { PostedProduct } from "../../entities/Product";
import addproduct from "../../assets/addproduct.png";

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, register,formState:{errors},setValue } = useForm<PostedProduct>();
  const { handleAddProduct, postProductState } = useAddProduct();

  const onSubmit: SubmitHandler<PostedProduct> = async (data) => {
    // Handle form submission, e.g., send data to a server
    console.log(data.image);
    const product: PostedProduct = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      barcode: data.barcode,
      category:data.category,
      supplier: data.supplier
    };
    try {
      await handleAddProduct(product);
      navigate("/products/list");
    } catch (error) {
      //show error message here
    }

    console.log("Product Data:", data);
  };

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-3xl font-semibold mb-4">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center flex-col">
            <img src={addproduct} alt="add product" />
             New Product
          </div>
        </div>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl">
        <ProductForm control={control} register={register} errors={errors} setValue={setValue} />
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {postProductState.loading ? "Loading" : <div><i className="fa fa-plus"></i> Add product</div>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
