import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  icon?: string;
  to?: string;
  subitems?: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const location = useLocation();
  console.log(location);
  // Sample sidebar data with subitems
  const [expanded, setExpanded] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  const toggleExpand = (index: number, item: SidebarItem) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
    const element = document.querySelector(`.ul-${item.label}-${index}`); // Replace with the selector for your element
    if (updatedExpanded[index]) {
      element?.classList.toggle("max-h-screen");
      element?.classList.toggle("max-h-0");
    } else {
      element?.classList.toggle("max-h-0");
      element?.classList.toggle("max-h-screen");
    }
  };

  const expand = (index: number, item: SidebarItem) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
    const element = document.querySelector(`.ul-${item.label}-${index}`); // Replace with the selector for your element
    element?.classList.remove("max-h-0");
    element?.classList.add("max-h-screen");
  };


  useEffect(() => {
    if (location.pathname === "/signup" || location.pathname === "/users") {
      const index = items.findIndex(item => item.label === "Users");
      console.log(items);
      const itemselected = items.filter(item => item.label === "Users")[0];
      expand(index, itemselected);
    }
  }, [location])

  return (
    <div className="w-64 bg-gray-800 h-screen text-white p-2 fixed">
      <ul>
        {items.map((item, index) =>
          item.subitems && item.subitems.length > 0 ? (
            <li key={index}>
              <div
                className={`flex w-full items-center justify-start cursor-pointer p-1`}
                onClick={() => toggleExpand(index, item)}
              >
                <span className="text-white text-lg p-2">
                  <i className={item.icon}></i>
                </span>
                <div className="flex-1 flex items-center justify-between">
                  <div>{item.label}</div>
                  <div>
                    {item.subitems && (
                      <span>
                        <i
                          className={`fa fa-light fa-angle-right ${expanded[index] ? "rotate-90" : "rotate-0"
                            }`}
                        ></i>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {item.subitems && (
                <ul
                  className={`ul-${item.label}-${index} max-h-0 overflow-hidden ml-4 border-l-2 pl-2 border-green-700 border-solid ease-in-out duration-1000 transition-all`}
                >
                  {item.subitems.map((subitem, subindex) => (
                    <li
                      key={`${item.label}-${subitem.label}-${index}`}
                      className="flex items-center space-x-2 mt-1 mb-1"
                    >
                      <Link
                        to={subitem.to || ""}
                        className="hover:text-blue-500"
                      >
                        {subitem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li
              key={`${item.label}-${index}`}
              className="h-auto flex items-center"
            >
              <div className="flex items-center justify-start cursor-pointer">
                <span className="text-white text-lg p-2">
                  <i className={item.icon}></i>
                </span>
                <Link to={item.to || ""} className="hover:text-blue-500">
                  {item.label}
                </Link>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
