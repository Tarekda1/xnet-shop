import { useState, useCallback } from "react";
import { Product } from "../entities/Product";

interface UseProductSortProps {
  products: Product[];
  sortBy: string;
}

function useProductSort({ products, sortBy }: UseProductSortProps) {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  //   useEffect(() => {
  //     // Implement the sorting logic based on the sortBy field
  //     const sorted = [...products]; // Create a copy to avoid mutating the original array

  //     if (sortBy === "name") {
  //       sorted.sort((a, b) => a.name.localeCompare(b.name));
  //     } else if (sortBy === "price") {
  //       sorted.sort((a, b) => a.price - b.price);
  //     }
  //     // Add more sorting options as needed

  //     setSortedProducts(sorted);
  //   }, [products, sortBy]);

  const sortedProductsCb = useCallback(() => {
    // Implement the sorting logic based on the sortBy field
    const sorted = [...products]; // Create a copy to avoid mutating the original array

    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      sorted.sort((a, b) => a.price - b.price);
    }
    // Add more sorting options as needed
    setSortedProducts(sorted);
    return sorted;
  }, [setSortedProducts, products, sortBy]);

  return { sortedProducts, sortedProductsCb };
}

export default useProductSort;
