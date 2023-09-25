// src/components/ProductForm.tsx
import React, { useMemo } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useInventory from "../../hooks/useInventory";
import { InventoryItem } from "../../entities/Inventory";
import DropdownWithSearch from "../DropdownWithSearch/DropdownWithSearch";
import useSalesOrder from "../../hooks/useSalesOrder";
import placeholder from "../../assets/placeholder.png";

interface CreateSalesOrderFormProps {
  onSubmit: () => void;
}

type FormValues = {
  customerName: string;
  cart: {
    productName: string;
    price: number;
    salesPrice: number;
    quantity: number;
    imageurl: string;
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
      cart: [
        { productName: "", quantity: 0, price: 0, salesPrice: 0, imageurl: "" },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });
  const onSubmit = (data: FormValues) => {
    const postedData = {
      customer: data.customerName,
      items: data.cart,
    };
    postSalesCb(postedData);
    console.log(postedData);
  };

  const { data } = useInventory();
  const { postSalesCb } = useSalesOrder();

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
            defaultValue={"New customer"}
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
              <div className="p-2 pl-0">
                {getValues(`cart.${index}.imageurl` as const) === "" ? (
                  <img
                    src={placeholder}
                    className="object-contain h-14 w-14"
                    alt="product placeholder"
                  />
                ) : (
                  <img
                    src={getValues(`cart.${index}.imageurl` as const)}
                    className="object-contain h-14 w-14"
                    alt="product"
                  />
                )}
              </div>
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
                  rules={{
                    required: true,
                  }}
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
                        setValue(
                          `cart.${index}.imageurl` as const,
                          invtItem[0]?.product?.image || "",
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
                  disabled
                  value={getValues(`cart.${index}.price` as const)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  {...(register(`cart.${index}.price` as const, {
                    validate: {
                      greateThanZero: (v) => {
                        return v > 0;
                      },
                    },
                  }),
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
                  htmlFor="sellingprice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selling price
                </label>
                <input
                  type="number"
                  id="sellingprice"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  {...register(`cart.${index}.salesPrice` as const, {
                    validate: {
                      greateThanPrice: (v) => {
                        console.log(v);
                        // const value = v.cart?.[index].price;
                        return v >= getValues(`cart.${index}.price` as const);
                      },
                    },
                  })}
                />
                {errors?.cart?.[index]?.salesPrice && (
                  <p className="text-red-500">
                    Selling Price is required and must be greater than cost
                    price
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
                    min: 1,
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
                  <i className="fa fa-trash" />
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
              salesPrice: 0,
              imageurl: "",
            })
          }
        >
          <i className="fa fa-plus"></i> Add more
        </button>
        <div className="mb-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600"
          >
            <i className="fa fa-save"></i> Save
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateSalesOrderFormUpdated;
