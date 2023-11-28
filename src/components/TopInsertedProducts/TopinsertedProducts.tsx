import React, { FC } from "react";
import { Product } from "../../entities/Product";

type TopinsertedProductProps = {
  productsList: Product[];
};

const TopinsertedProducts: React.FC<TopinsertedProductProps> = ({
  productsList,
}) => {
  return (
    <div>
      {productsList &&
        productsList.length > 0 &&
        productsList?.map((product: Product) => {
          return (
            <li
              className="list-none p-2 pl-0 flex flex-row w-full border-bottom-gray-200 border-b-[1px]"
              key={product._id}
            >
              <img
                className="object-contain w-12 pr-2 "
                alt={product.name}
                src={product.image}
              />{" "}
              <p className="text-sm text-gray-400"> {product.name}</p>
            </li>
          );
        })}
    </div>
  );
};

export default TopinsertedProducts;
