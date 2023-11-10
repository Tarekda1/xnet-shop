// src/components/Sidebar.tsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  title: string;
  icon: string; // Font Awesome or any icon library class
  to: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location=useLocation();
  console.log(location);
  useEffect(() => {
    console.log(location);
  },[location]);
  return (
    <aside className="w-1/6 bg-gray-800 text-white">
      {/* Sidebar content */}
      <div className="p-4">
        {/* Menu Actions */}
        <ul className="space-y-2">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-white text-lg">
                <i className={menuItem.icon}></i>
              </span>
              <Link to={menuItem.to} className="hover:text-blue-500">
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
