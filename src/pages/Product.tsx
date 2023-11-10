// Usage of the ProductDisplay component
import React, { useCallback, useEffect, useState } from "react";
import ProductDisplayList from "../components/ProductDisplayList/ProductDisplayList";
import useProductSearch from "../hooks/useProductSearch";
import useProductSort from "../hooks/useProductSort";
import useProducts from "../hooks/useProducts";
import { Product } from "../entities/Product";
import { useNavigate } from "react-router-dom";

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { prodData, loading, deleteProduct, getProductsByPageSize } = useProducts();
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

  // Handler for searching products
  const handleSearch = useCallback(async() => {
    if(searchTerm==='') return;
    const searchedResp:any = await searchProducts(searchTerm);
    console.log(searchedResp);
    setProducts(searchedResp.products);
     setPage(1);
     setTotalPages(searchedResp.totalPages);
  }, [setProducts, searchProducts]);

  // Handler for sorting products
  const handleSort = useCallback(() => {
    const sorted = sortedProductsCb();
    setProducts(sorted);
  }, [sortedProductsCb, setProducts]);

  const onDelete = useCallback(async (product: Product) => {
    const resp = await deleteProduct(product);
    console.log(resp);
    if (resp.status === 204) {
      console.log(products);
      setProducts((prev: [Product]) => {
        return prev.filter((param: Product) => param._id !== product._id);
      })
    }
  }, [deleteProduct]);

  const onAddProduct = useCallback(async (e: any) => {
    e.preventDefault();
    navigate("/products/add")
  }, []);

  const onLoadMoreCb = useCallback(async (e: any) => {
    e.preventDefault();
    const pageParam = page + 1;
    getProductsByPageSize(pageParam);
    setPage((prev) => prev + 1);
  }, [])

  return (
    <div className="container mx-auto mt-2">
      <div className="border border-gray-300 bg-white rounded flex items-center justify-start gap-4 mt-2 mb-2 p-2 shadow-md">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-2 py-1 mr-2 w-72"
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
          <div className="flex">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
              onClick={onAddProduct} // Call the sort handler
            >
              <i className="fa fa-plus" />  Add product
            </button>
          </div>
        </div>
      </div>
      {
        products && products.length > 0 ?
          <>
            <div className=" flex flex-col justify-between flex-wrap items-start mt-4 mb-4">
              <h3 className="text-4xl text-left">Products</h3>
            </div>
            <div className="flex">
              <p className="text-small rounded p-1 border b-black">{products.length} items</p>
            </div>
            <ProductDisplayList onDeleteCb={onDelete} loading={loading} products={products} />
            {prodData && (page < totalPages) ?
              <div className="flex justify-center items-center w-full">
                <button onClick={onLoadMoreCb} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-3 mb-2">
                  {loading ? "loading..." : "View more"}
                </button>
              </div> : null
            }
          </> :
          <div className="card flex justify-center flex-col align-center w-full">
            <h1 className="text-2xl mt-2 mb-2">No Products Yet!</h1>
            <button onClick={onAddProduct} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Add new product</button>
          </div>

      }

    </div>
  );
};

export default ProductPage;
