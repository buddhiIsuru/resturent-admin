import React, { createElement } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { MdOutlineArrowBack } from "react-icons/md";
import { menusItems } from "../../constants/menuItems";
import { Link } from "react-router-dom";

const SideDrawer = ({ isOpen, toggleDrawer }) => {
  const toggleHandler = () => {
    toggleDrawer(!isOpen);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleHandler}
        direction="left"
        size={340}
        className="bg-black"
      >
        <div>
          <div className="h-[70px] flex items-center justify-between px-5">
            <div className="w-[100px]">
              <img src="/assets/logo.png" alt="CalendQ Logo" />
            </div>
            <span onClick={toggleHandler}>
              <MdOutlineArrowBack size={22} />
            </span>
          </div>
          <div className="px-5 flex flex-col gap-6 mt-6">
            {menusItems.map((menuItem, index) => {
              return (
                <Link
                  to={menuItem.link}
                  key={index}
                  className="flex items-center gap-5"
                  onClick={toggleHandler}
                >
                  <span>{createElement(menuItem.icon, { size: 20 })}</span>
                  <p>{menuItem.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideDrawer;
