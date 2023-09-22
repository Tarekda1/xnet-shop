// src/components/ProductForm.tsx
import React from "react";
import { Controller } from "react-hook-form";
import useGetProduct from "../../hooks/useGetProduct";

interface ProductFormProps {
  control: any; // Replace with the appropriate type if possible
  register: any; // Replace with the appropriate type if possible
  productId: string | undefined;
}

const ProductFormEditable: React.FC<ProductFormProps> = ({
  control,
  register,
  productId,
}) => {
  const { product, loading } = useGetProduct(productId);
  return (
    <>
      <div className="flex flex-1 w-full">
        {loading ? (
          "loading"
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-2 w-full">
            <div className="card rounded-none">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={product?.name}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      className="border rounded w-full py-2 px-3"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="barcode"
                >
                  Barcode
                </label>
                <Controller
                  name="barcode"
                  control={control}
                  defaultValue={product?.barcode}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="barcode"
                      className="border rounded w-full py-2 px-3"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <Controller
                  name="price"
                  control={control}
                  defaultValue={product?.price}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      id="price"
                      className="border rounded w-full py-2 px-3"
                    />
                  )}
                />
              </div>
            </div>
            <div className="card rounded-none">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={product?.category}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="category"
                      className="border rounded w-full py-2 px-3"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Supplier
                </label>
                <Controller
                  name="supplier"
                  control={control}
                  defaultValue={product?.supplier}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="supplier"
                      className="border rounded w-full py-2 px-3"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <div className="flex flex-col">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imageUrl"
                  >
                    Image
                  </label>
                  <img
                    className="object-cover h-[16rem]"
                    src={product?.image}
                    alt={product?.name}
                  />
                  <input type="file" {...register("image")} />
                </div>
              </div>
            </div>
            <div className="mb-4 col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <Controller
                name="description"
                control={control}
                defaultValue={product?.description}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    className="border rounded w-full py-2 px-3"
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductFormEditable;
