// src/components/ProductDisplay.tsx
import React, { useCallback } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../entities/Product";
import { useNavigate } from "react-router-dom";

interface ProductDisplayProps {
  products: Product[]; // Use an array of products
  loading?: boolean;
}

const ProductDisplayList: React.FC<ProductDisplayProps> = ({
  products,
  loading,
}) => {
  const navigate = useNavigate();
  const handleProductClick = useCallback(
    (product: Product) => {
      navigate(`/product/${product._id}`);
    },
    [navigate]
  );

  return (
    <>
      <h3 className="text-3xl text-left mt-4 mb-4">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
        {loading ? (
          <span>loading</span>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden 
              shadow-md cursor-pointer transition duration-100 
              ease-out hover:ease-in  hover:-translate-y-1 hover:scale-105"
              onClick={() => handleProductClick(product)}
            >
              <div className="flex w-full flex-1 h-48 mx-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                {/* Add a Font Awesome icon for the product */}
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-blue-600 mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductDisplayList;
