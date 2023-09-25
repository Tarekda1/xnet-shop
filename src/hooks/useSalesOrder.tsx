import { useCallback, useEffect, useState } from "react";
import axios from "../providers/axios";
import { getToken } from "../utils/storageUtils";
import { SalesOrder } from "../entities/SalesOrder";
import useAxios from "./useAxios";

const useSalesOrder = () => {
  const [salesOrder, setSalesOrder] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [postSalesOrder, salesOrderState] = useAxios();
  const user = getToken();

  useEffect(() => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    axios("/sales-orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken || ""}`,
      },
    }) // Replace with your actual API endpoint
      .then((response) => {
        const data = response?.data.map((order: SalesOrder) => {
          return {
            orderId: order.orderId,
            customer: order.customer,
            totalItem: order.items.length || 0,
            totalProfit: order.totalProfit,
          };
        });
        setSalesOrder(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [user?.accessToken]);

  const postSalesCb = useCallback(
    (data: any) => {
      postSalesOrder({
        url: "/sales-orders",
        method: "POST",
        data,
      });
    },
    [postSalesOrder]
  );

  return { salesOrder, loading, postSalesCb, salesOrderState };
};

export default useSalesOrder;
