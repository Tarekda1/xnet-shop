// Usage of the ProductDisplay component
import React, { useCallback, useState } from "react";
// import useProductSearch from "../hooks/useProductSearch";
// import useProductSort from "../hooks/useProductSort";
import useInventory from "../hooks/useInventory";
import InventoryDisplayList from "../components/InventoryDisplayList/InventoryDisplayList";

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const { data, loading ,delInventoryItemCb} = useInventory();
  // const [products, setProducts] = useState<any>();
  // const { filteredProducts, searchProducts } = useProductSearch({
  //   initialProducts: data,
  //   searchTerm,
  // });
  // const { sortedProductsCb } = useProductSort({
  //   products: filteredProducts,
  //   sortBy,
  // });

  // useEffect(() => {
  //   setProducts(data);
  // }, [data]);

  // Handler for searching products
  // const handleSearch = useCallback(() => {
  //   const filtered = searchProducts();
  //   setProducts(filtered);
  // }, [setProducts, searchProducts]);

  // // Handler for sorting products
  // const handleSort = useCallback(() => {
  //   const sorted = sortedProductsCb();
  //   setProducts(sorted);
  // }, [sortedProductsCb, setProducts]);

  const onDelete=useCallback((id:string)=>{
    delInventoryItemCb(id);
  },[]);  

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
            onClick={() => {}} // Call the search handler
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
              onClick={() => {}} // Call the sort handler
            >
              Sort
            </button>
          </div>
        </div>
      </div>
      <InventoryDisplayList loading={loading} onDeleteCb={onDelete} inventory={data} />
    </div>
  );
};

export default InventoryPage;
