import React, { FC } from "react";
// import { useNavigate } from "react-router-dom";
import "./Page.css";
// import { useAuthContext } from "../../context/AuthContext";
import AppBar from "../AppBar/AppBar";
import { SidebarItem } from "../ExpandableSideBar/SideBar";
import Sidebar from "../ExpandableSideBar/SideBar";

interface BaseProps {
  children: React.ReactElement;
}

// const menuItems = [
//   {
//     title: "Dashboard",
//     icon: "fa fa-dashboard", // Replace with your icon class
//     to: "/",
//   },
//   {
//     title: "Profile",
//     icon: "fa fa-dashboard", // Replace with your icon class
//     to: "/userprofile",
//   },
//   {
//     title: "Products",
//     icon: "fa fa-shopping-cart", // Replace with your icon class
//     to: "/products",
//   },
//   {
//     title: "Add New Product",
//     icon: "fa fa-shopping-cart", // Replace with your icon class
//     to: "/addproduct",
//   },
//   {
//     title: "Inventory",
//     icon: "fa fa-shopping-cart", // Replace with your icon class
//     to: "/inventory",
//   },
//   {
//     title: "New Sale Order",
//     icon: "fa fa-shopping-cart", // Replace with your icon class
//     to: "/newsalesorder",
//   },
//   {
//     title: "Sales Order",
//     icon: "fa fa-shopping-cart", // Replace with your icon class
//     to: "/salesorder",
//   },
// ];

const sidebarData: SidebarItem[] = [
  { label: "Dashboard", icon: "fa fa-dashboard", to: "/" },
  {
    label: "Users",
    icon: "fa fa-user",
    subitems: [
      { label: "Add User", icon: "fa fa-shopping-cart", to: "/users/add" },
      { label: "Users", icon: "fa fa-shopping-cart", to: "/users" },
    ],
  },
  {
    label: "Products",
    icon: "fa fa-gift",
    subitems: [
      { label: "Add Product", icon: "fa fa-shopping-cart", to: "/products/add" },
      { label: "Products", icon: "fa fa-shopping-cart", to: "/products/list" },
    ],
  },
  {
    label: "Inventory",
    icon: "fa fa-money",
    subitems: [
      {
        label: "Inventory list",
        icon: "fa fa-shopping-cart",
        to: "/inventorylist",
      },
    ],
  },
  {
    label: "Sales",
    icon: "fa fa-brands fa-first-order",
    subitems: [
      {
        label: "Sales Orders",
        to: "/salesorder",
      },
      {
        label: "Add New Sales Order",
        to: "/newsales",
      },
    ],
  },
];

const Page: FC<BaseProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* AppBar */}
      <AppBar />

      {/* Content */}
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        {/* <Sidebar menuItems={menuItems} /> */}
        <Sidebar items={sidebarData} />
        {/* Page content */}
        <div className="ml-[16rem] p-4 flex-1 overflow-y-auto bg-gray-100 relative">
          {children}
          <div className="footer absolute left-0 bottom-0 w-full bg-gray-600 text-white text-sm p-1 pl-2 justify-center text-left items-center my-auto">
             Copyright @ {new Date().getFullYear()} Xnet billing
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
