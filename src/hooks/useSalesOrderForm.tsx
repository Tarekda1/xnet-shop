import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SalesOrderData = {
  customerName: string;
  productName: string;
  quantity: number;
  price: number;
};

export const useSalesOrderForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    getValues,
    control,
    watch,
  } = useForm<SalesOrderData>();
  const [salesItems, setSalesItems] = useState<SalesOrderData[]>([]);

  const onSubmit: SubmitHandler<SalesOrderData> = (data) => {
    console.log(data);
    setSalesItems([...salesItems, data]);
    reset(); // Clear the form fields after submission
  };

  return {
    register,
    handleSubmit,
    salesItems,
    onSubmit,
    formState,
    setValue,
    getValues,
    control,
    watch,
  };
};
