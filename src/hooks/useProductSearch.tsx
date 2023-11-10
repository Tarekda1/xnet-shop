import { useState, useCallback } from "react";
import { Product } from "../entities/Product";
import axios from "../providers/axios";
import { getToken } from "../utils/storageUtils";

interface UseProductSearchProps {
  initialProducts: Product[];
  searchTerm: string;
  totalPages:number;
}

function useProductSearch({
  initialProducts,
  totalPages,
  searchTerm,
}: UseProductSearchProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const user = getToken();

  const searchProducts = useCallback(async (searchterm:any) => {
    if (searchTerm.length > 0) {
      const products = await axios(`/products/search?searchterm=${searchterm}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken || ""}`,
        },
      });
      // console.log(searchTerm);`
      // const filteredProductsInner = initialProducts.filter((product) =>
      //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
      // );
      // setFilteredProducts(filteredProductsInner);
      // return filteredProductsInner;
      console.log(products);
      return products.data;
    } else {
      setFilteredProducts(initialProducts);
      return {products:initialProducts,totalPages};
    }
  }, [setFilteredProducts, initialProducts, searchTerm]);

  //   useEffect(() => {
  //     // Implement the search logic based on the searchTerm
  //     const filtered = initialProducts.filter((product) =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //     setFilteredProducts(filtered);
  //   }, [initialProducts, searchTerm]);

  return { filteredProducts, searchProducts };
}

export default useProductSearch;
