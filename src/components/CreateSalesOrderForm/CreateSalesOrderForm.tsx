// src/components/ProductForm.tsx
import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useSalesOrderForm } from "../../hooks/useSalesOrderForm";
import useInventory from "../../hooks/useInventory";
import { InventoryItem } from "../../entities/Inventory";
import DropdownWithSearch from "../DropdownWithSearch/DropdownWithSearch";

interface CreateSalesOrderFormProps {
  onSubmit: () => void;
}

const CreateSalesOrderForm: React.FC<CreateSalesOrderFormProps> = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    watch,
  } = useSalesOrderForm();
  const { data } = useInventory();

  const mappedData = useMemo(() => {
    return data.map((d: InventoryItem) => {
      return { value: d.product?._id, label: d.product?.name };
    });
  }, [data]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            defaultValue={"unknown shop customer name"}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="text-red-500">Customer Name is required</p>
          )}
        </div>

        <div className="mb-4">
          <Controller
            name="productName"
            control={control}
            render={({ field }) => (
              <DropdownWithSearch
                data={mappedData}
                {...field}
                setValue={setValue}
                fieldName="productName"
                getValue={getValues}
                onChange={(option: any) => {
                  console.log(data);
                  let invtItem: InventoryItem[] = data.filter(
                    (d: InventoryItem) => d.product?._id === option?.value
                  );
                  setValue("price", invtItem[0]?.product?.price || 30, {
                    shouldValidate: true,
                  });
                }}
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={getValues("price")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            {...(register("price"), { required: true })}
          />
          {errors.price && (
            <p className="text-red-500">
              Price is required and must be greater than 0
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <p className="text-red-500">
              Quantity is required and must be greater than 0
            </p>
          )}
        </div>

        <div className="mb-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600"
          >
            Create Order
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateSalesOrderForm;
