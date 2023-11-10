import { useEffect, useState } from "react";
import axios from "../providers/axios";
import { Product } from "../entities/Product";
import { getToken } from "../utils/storageUtils";

type ServerResponse = {
  status: number;
  success: string;
}

type productsData = {
  products: Product[];
  totalPages: number;
}

const useProducts = () => {
  const [prodData, setProdData] = useState<productsData>();
  const [loading, setLoading] = useState(true);
  const user = getToken();

  useEffect(() => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    axios("/products?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken || ""}`,
      },
    }) // Replace with your actual API endpoint
      .then((response) => {
        setProdData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [user?.accessToken]);

  const getProductsByPageSize = async (page: number) => {
    // Make an API request to fetch the list of users (replace with your API endpoint)
    try {
      setLoading(true);
      const resp = await axios(`/products?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken || ""}`,
        },
      });
      setProdData((prev: any) => {
        if (prev !== null)
          return { products: [...prev.products, ...resp.data.products],totalPages:resp.data.totalPages };
        else { return prev; }
      });
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }

  }

  const deleteProduct = async (product: Product): Promise<ServerResponse> => {
    const response = await axios(`/products/${product._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken || ""}`,
      }
    });
    console.log(response);
    return response.data as ServerResponse;
  };

  return { prodData, loading, deleteProduct,getProductsByPageSize };
};

export default useProducts;
