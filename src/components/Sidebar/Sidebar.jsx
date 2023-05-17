import React, { useState } from "react";

import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { menusItems } from "../../constants/menuItems";
import { PageHeader } from "antd";

const Sidebar = ({ open, setOpen }) => {
  return (
    <section className="fixed z-50 hidden lg:flex lg:gap-6">
      <div
        className={`bg-white min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 h-[70px] flex items-center justify-between">
          {open ? (
            <div className="w-[100%] duration-500">
              {/* <PageHeader title="Manage Company" /> */}
              <p className="w-[100%] fw-bold text-[18px]">Springs of Almawaleh</p>
            </div>
          ) : (
            <div className="duration-500"></div>
          )}

          {
            open ?
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              :
              <div className="w-[100px] duration-500">
                <p className="w-[100%] fw-bold text-[18px]">SA</p>
                {/* <img src="/assets/mini_logo.png" alt="CalendQ Logo" /> */}
              </div>
          }
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menusItems?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${menu?.margin && ""
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
