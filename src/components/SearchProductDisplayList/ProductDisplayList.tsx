// src/components/ProductDisplay.tsx
import React, { useCallback, useMemo } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../entities/Product";
import { useNavigate } from "react-router-dom";

interface ProductDisplayProps {
  products: Product[]; // Use an array of products
  loading?: boolean;
  onDeleteCb: (product: Product) => void;
}

const SearchProductDisplayList: React.FC<ProductDisplayProps> = ({
  products,
  loading,
  onDeleteCb,
}) => {
  const navigate = useNavigate();
  const handleProductClick = useCallback(
    (product: Product) => {
      navigate(`/products/${product._id}`);
    },
    [navigate]
  );

  return (
    <>
      <div className="flex justify-between">
        <h3 className="bold text-3xl border-b-2 inline-block underline-offset-[3px]">
          Result found
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5 mt-4 transition-transform pb-10">
        {loading || products === undefined ? (
          <span>loading</span>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden 
              shadow-md cursor-pointer transition duration-100 
              ease-out hover:ease-in  hover:-translate-y-1 hover:scale-105 h-full flex-col flex"
              onClick={() => handleProductClick(product)}
            >
              <div className="flex w-full flex-1 max-h-[15rem]  mx-auto justify-center bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                {/* Add a Font Awesome icon for the product */}
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <div className="flex justify-between">
                  <p className="text-blue-600 mt-2">
                    ${product.price?.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary w-4 text-xl text-right float-right"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteCb(product);
                    }}
                  >
                    <i className="fa fa-trash text-red-500"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SearchProductDisplayList;
