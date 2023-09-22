// src/components/ProductForm.tsx
import React, { useMemo } from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import useInventory from "../../hooks/useInventory";
import { InventoryItem } from "../../entities/Inventory";
import DropdownWithSearch from "../DropdownWithSearch/DropdownWithSearch";

interface CreateSalesOrderFormProps {
  onSubmit: () => void;
}

type FormValues = {
  customerName: string;
  cart: {
    productName: string;
    price: number;
    quantity: number;
  }[];
};

const CreateSalesOrderFormUpdated: React.FC<CreateSalesOrderFormProps> = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ productName: "test", quantity: 1, price: 23 }],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });
  const onSubmit = (data: FormValues) => console.log(data);

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
            defaultValue={"shop customer name"}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="text-red-500">Customer Name is required</p>
          )}
        </div>
        {fields.map((field, index) => {
          return (
            <div className="flex flex-row items-center gap-1">
              <div className="mb-4 flex-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product
                </label>
                <Controller
                  name={`cart.${index}.productName`}
                  control={control}
                  render={({ field }) => (
                    <DropdownWithSearch
                      data={mappedData}
                      {...field}
                      setValue={setValue}
                      fieldName={`cart.${index}.productName`}
                      getValue={getValues}
                      onChange={(option: any) => {
                        console.log(data);
                        let invtItem: InventoryItem[] = data.filter(
                          (d: InventoryItem) => d.product?._id === option?.value
                        );
                        setValue(
                          `cart.${index}.price` as const,
                          invtItem[0]?.product?.price || 30,
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                    />
                  )}
                />
              </div>
              <div className="mb-4 flex-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={getValues(`cart.${index}.price` as const)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  {...(register(`cart.${index}.price` as const),
                  { required: true })}
                />
                {errors?.cart?.[index]?.price && (
                  <p className="text-red-500">
                    Price is required and must be greater than 0
                  </p>
                )}
              </div>
              <div className="mb-4 flex-1">
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
                  {...register(`cart.${index}.quantity` as const, {
                    required: true,
                  })}
                />
                {errors?.cart?.[index]?.quantity && (
                  <p className="text-red-500">
                    Quantity is required and must be greater than 0
                  </p>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-red-300  text-white rounded hover:bg-blue-600"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <button
          type="button"
          className="px-4 py-2 bg-blue-400  text-white rounded hover:bg-blue-600"
          onClick={() =>
            append({
              productName: "",
              quantity: 0,
              price: 0,
            })
          }
        >
          Add items to order
        </button>
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

export default CreateSalesOrderFormUpdated;
