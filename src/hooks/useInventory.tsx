import { useCallback, useEffect, useState } from "react";
import axios from "../providers/axios";
import { getToken } from "../utils/storageUtils";
import { InventoryItem } from "../entities/Inventory";
import useAxios from "./useAxios";

const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [postInventoryItem, inventoryDataSate] = useAxios();
  const user = getToken();

  useEffect(() => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    axios("/inventory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    }) // Replace with your actual API endpoint
      .then((response) => {
        setInventory(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [user.accessToken]);

  const postInventoryItemCb = useCallback(
    (data: any) => {
      postInventoryItem({
        url: "/inventory",
        method: "POST",
        data,
      });
    },
    [postInventoryItem]
  );

  return { data: inventory, loading, postInventoryItemCb, inventoryDataSate };
};

export default useInventory;
