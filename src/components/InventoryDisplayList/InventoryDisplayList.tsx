// src/components/ProductDisplay.tsx
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { InventoryItem } from "../../entities/Inventory";

interface InventoryDisplayProps {
  inventory: InventoryItem[]; // Use an array of products
  loading?: boolean;
}

const InventoryDisplayList: React.FC<InventoryDisplayProps> = ({
  inventory,
  loading,
}) => {
  return (
    <>
      <h3 className="text-3xl text-left mt-4 mb-4">Inventory</h3>
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Selling Price
            </th>
          </tr>
        </thead>
        {loading ? (
          <span>loading</span>
        ) : (
          <tbody>
            {inventory.map((inventoryItem: InventoryItem) => (
              <tr
                key={inventoryItem._id}
                className="shadow-md h-4 divide-x-2 divide-y-4 p-4 m-4"
              >
                <td className="flex w-28 flex-1 h-28 mx-auto p-2">
                  <img
                    src={inventoryItem?.product?.image}
                    alt={inventoryItem.product?.name}
                    className="w-full h-full object-cover rounded"
                  />
                </td>
                <td className="p-4 ml-2">
                  {/* Add a Font Awesome icon for the product */}
                  <h2 className="text-xl font-semibold">
                    {inventoryItem?.product?.name}
                  </h2>
                </td>
                <td>
                  <p className="text-gray-500  ml-2">
                    {inventoryItem.product?.description}
                  </p>
                </td>
                <td>
                  <p className="text-blue-600 ml-2">
                    ${inventoryItem?.product?.price.toFixed(2)}
                  </p>
                </td>
                <td>
                  <p className="text-gray-500  ml-2">
                    {inventoryItem.quantity}
                  </p>
                </td>
                <td>
                  <p className="text-gray-500  ml-2">
                    {inventoryItem.sellingPrice || 0}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};

export default InventoryDisplayList;
