// src/components/ProductForm.tsx
import React from "react";
import { Controller } from "react-hook-form";

interface ProductFormProps {
  control: any; // Replace with the appropriate type if possible
  register: any; // Replace with the appropriate type if possible
}

const ProductForm: React.FC<ProductFormProps> = ({ control, register }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-2">
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
            defaultValue={""}
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
            defaultValue={""}
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
            defaultValue={0}
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input type="file" {...register("image")} />
          {/* <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                id="image"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            )}
          /> */}
        </div>
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
            defaultValue=""
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
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="supplier"
                className="border rounded w-full py-2 px-3"
              />
            )}
          />
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
            defaultValue=""
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
    </>
  );
};

export default ProductForm;
