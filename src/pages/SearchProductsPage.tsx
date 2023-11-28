// Usage of the ProductDisplay component
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductDisplayList from "../components/ProductDisplayList/ProductDisplayList";
import useProductSearch from "../hooks/useProductSearch";
import useProductSort from "../hooks/useProductSort";
import useProducts from "../hooks/useProducts";
import { Product } from "../entities/Product";
import { useLocation, useNavigate } from "react-router-dom";
import SearchProductDisplayList from "../components/SearchProductDisplayList/ProductDisplayList";

const SearchProductsPage: React.FC = () => {
  const { search } = useLocation();
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { prodData, loading, deleteProduct, getProductsByPageSize } =
    useProducts();
  const [products, setProducts] = useState<any>();
  const { filteredProducts, searchProducts } = useProductSearch({
    initialProducts: prodData?.products || [],
    totalPages,
    searchTerm,
  });
  const { sortedProductsCb } = useProductSort({
    products: filteredProducts,
    sortBy,
  });

  useEffect(() => {
    setProducts(prodData?.products);
    setTotalPages(prodData?.totalPages || 1);
  }, [prodData]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    if (searchParams !== null) {
      setSearchTerm(searchParams.get("term"));
    } else {
      setSearchTerm("");
    }
  }, [search]);

  // Handler for searching products
  const handleSearch = useCallback(
    async (searchTerm: string | null) => {
      if (searchTerm === "") return;
      const searchedResp: any = await searchProducts(searchTerm);
      console.log(searchedResp);
      setProducts(searchedResp.products);
      setPage(1);
      setTotalPages(searchedResp.totalPages);
    },
    [searchProducts]
  );

  // Handler for sorting products
  const handleSort = useCallback(() => {
    const sorted = sortedProductsCb();
    setProducts(sorted);
  }, [sortedProductsCb, setProducts]);

  const onDelete = useCallback(
    async (product: Product) => {
      const resp = await deleteProduct(product);
      console.log(resp);
      if (resp.status === 204) {
        console.log(products);
        setProducts((prev: [Product]) => {
          return prev.filter((param: Product) => param._id !== product._id);
        });
      }
    },
    [deleteProduct, setProducts, products]
  );

  const onLoadMoreCb = useCallback(
    async (e: any) => {
      e.preventDefault();
      const pageParam = page + 1;
      getProductsByPageSize(pageParam);
      setPage((prev) => prev + 1);
    },
    [getProductsByPageSize, setPage, page]
  );

  return (
    <div className="container mx-auto mt-2">
      <div className="border border-gray-300 bg-white rounded flex items-center justify-start gap-4 mt-2 mb-2 p-2 shadow-md">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-2 py-1 mr-2 w-[500px]"
            value={searchTerm || ""}
            onChange={(e) => {
              if (e.target.value) {
                setSearchTerm(e.target.value);
              } else {
                setSearchTerm("");
                setProducts(prodData?.products);
                setTotalPages(prodData?.totalPages || 1);
              }
            }}
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => handleSearch(searchTerm)} // Call the search handler
          >
            Search
          </button>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="flex">
            <label className="mr-1">Sort by</label>
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
      {(products && products.length > 0) || loading ? (
        <>
          <div className=" flex flex-row justify-between flex-wrap items-center mt-4 mb-4">
            {!loading && (
              <div className="flex">
                <p className="text-lg rounded p-[8px] pt-[3px] pb-[3px] border b-black">
                  {products?.length || 0} items
                </p>
              </div>
            )}
          </div>
          <SearchProductDisplayList
            onDeleteCb={onDelete}
            loading={loading}
            products={products}
          />

          {prodData && page < totalPages ? (
            <div className="flex justify-center items-center w-full">
              <button
                onClick={onLoadMoreCb}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-3 mb-2"
              >
                {loading ? "loading..." : "View more"}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div>No product found :D</div>
      )}
    </div>
  );
};

export default SearchProductsPage;
