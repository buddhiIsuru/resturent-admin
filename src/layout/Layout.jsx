import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import Wrapper from "./Wrapper";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <main className="flex">
      <Sidebar open={open} setOpen={setOpen} />
      <SideDrawer isOpen={isDrawerOpen} toggleDrawer={setIsDrawerOpen} />
      <Wrapper sidebarOpen={open}>
        <Navbar open={open} setOpen={setOpen} toggleDrawer={setIsDrawerOpen} isOpen={isDrawerOpen} />
        {children}
      </Wrapper>
    </main>
  );
};

export default Layout;
