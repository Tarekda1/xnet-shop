// Usage of the ProductDisplay component
import React, { useCallback, useEffect, useState } from "react";
import ProductDisplayList from "../components/ProductDisplayList/ProductDisplayList";
import useProductSearch from "../hooks/useProductSearch";
import useProductSort from "../hooks/useProductSort";
import useProducts from "../hooks/useProducts";

const initialProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 49.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more products to the array as needed
];

const ProductPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const { data, loading } = useProducts();
  const [products, setProducts] = useState<any>();
  const { filteredProducts, searchProducts } = useProductSearch({
    initialProducts: data,
    searchTerm,
  });
  const { sortedProductsCb } = useProductSort({
    products: filteredProducts,
    sortBy,
  });

  useEffect(() => {
    setProducts(data);
  }, [data]);

  // Handler for searching products
  const handleSearch = useCallback(() => {
    const filtered = searchProducts();
    setProducts(filtered);
  }, [setProducts, searchProducts]);

  // Handler for sorting products
  const handleSort = useCallback(() => {
    const sorted = sortedProductsCb();
    setProducts(sorted);
  }, [sortedProductsCb, setProducts]);

  return (
    <div className="container mx-auto mt-2">
      <div className="border border-gray-300 bg-white rounded flex items-center justify-start gap-4 mt-2 mb-2 p-2 shadow-md">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-2 py-1 mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={handleSearch} // Call the search handler
          >
            Search
          </button>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Sort by</label>
          <div className="flex items-center">
            <select
              className="border border-gray-300 rounded px-2 py-1 mx-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              {/* Add more sorting options as needed */}
            </select>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={handleSort} // Call the sort handler
            >
              Sort
            </button>
          </div>
        </div>
      </div>
      <ProductDisplayList loading={loading} products={products} />
    </div>
  );
};

export default ProductPage;
