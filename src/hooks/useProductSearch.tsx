import { useState, useCallback } from "react";
import { Product } from "../entities/Product";

interface UseProductSearchProps {
  initialProducts: Product[];
  searchTerm: string;
}

function useProductSearch({
  initialProducts,
  searchTerm,
}: UseProductSearchProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  const searchProducts = useCallback(() => {
    if (searchTerm.length > 0) {
      console.log(searchTerm);
      const filteredProductsInner = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredProductsInner);
      return filteredProductsInner;
    } else {
      setFilteredProducts(initialProducts);
      return initialProducts;
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
