// src/components/ProductDisplay.tsx
import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductDisplayProps {
  product: Product;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 cursor-pointer">
      <div className="w-64 h-64 mx-auto cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-500">{product.description}</p>
        <p className="text-blue-600 mt-2">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
