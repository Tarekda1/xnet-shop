import { useEffect, useState, FC } from "react";
import axios from "../providers/axios";
import { Product } from "../entities/Product";
import { getToken } from "../utils/storageUtils";

const useGetProduct = (id: any): any => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const user = getToken();

  useEffect(() => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    axios(`/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    }) // Replace with your actual API endpoint
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [user.accessToken, id]);

  return { product, loading };
};

export default useGetProduct;
