// src/components/ProductForm.tsx
import React from "react";
import { Controller } from "react-hook-form";
import ImageUpload from "../ImageUpload/ImageUpload";

interface ProductFormProps {
  control: any; // Replace with the appropriate type if possible
  register: any; // Replace with the appropriate type if possible
  errors: any;
  setValue: any;
}

const categoryDropdown = [
  {
    id: "electronics",
    value: "Electronics",
  },
  {
    id: "mobiles",
    value: "Mobiles",
  },
  {
    id: "networks",
    value: "Network",
  },
  {
    id: "gaming",
    value: "Gaming",
  },
  {
    id: "cctv",
    value: "cctv",
  },
];

const generateSerialNumber = (setValue: any) => {
  var chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    serialLength = 10,
    randomSerial = "",
    i,
    randomNumber;

  for (i = 0; i < serialLength; i = i + 1) {
    randomNumber = Math.floor(Math.random() * chars.length);
    randomSerial += chars.substring(randomNumber, randomNumber + 1);
  }
  setValue("barcode", randomSerial);
};

const ProductForm: React.FC<ProductFormProps> = ({
  control,
  register,
  errors,
  setValue,
}) => {
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
            rules={{
              required: true,
            }}
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
          {errors.name && <p className="text-red-500">This is required.</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="barcode"
          >
            Serial No
          </label>
          <Controller
            name="barcode"
            control={control}
            defaultValue={""}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="barcode"
                className="border rounded w-full py-2 px-3"
              />
            )}
          />
          <button onClick={() => generateSerialNumber(setValue)}>
            Generate Serial
          </button>
          {errors.barcode && <p className="text-red-500">This is required.</p>}
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
            rules={{
              required: true,
              validate: (value) => value > 0,
            }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="price"
                className="border rounded w-full py-2 px-3"
              />
            )}
          />
          {errors.price && <p className="text-red-500">This is required.</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          {/* <input type="file" {...register("image")} /> */}
          <ImageUpload
            register={register}
            Controller={Controller}
            control={control}
            errors={errors}
            setValue={setValue}
          />
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
            rules={{
              required: true,
            }}
            defaultValue="Electronics"
            render={({ field }) => (
              <select
                className="border rounded w-full py-2 px-3"
                id="category"
                {...field}
              >
                {categoryDropdown.map((category, index) => {
                  return (
                    <option value={category.value}>{category.value}</option>
                  );
                })}
              </select>
              // <input
              //   {...field}
              //   id="category"
              //   className="border rounded w-full py-2 px-3"
              // />
            )}
          />
          {errors.category && <p className="text-red-500">This is required.</p>}
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
            defaultValue="Xnet shop"
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
