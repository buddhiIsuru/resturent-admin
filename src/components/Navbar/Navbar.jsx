import { Button } from "antd";
import { HiMenuAlt3, HiOutlineMenuAlt2, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleDrawer, isOpen, open, setOpen }) => {
  const navigateTo = useNavigate();

  const logOut=()=>{
    navigateTo("/");
    localStorage.clear();
  }
  return (
    <nav className="bg-white w-full h-[70px] sticky z-30 top-0 flex items-center px-5 shadow-sm ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div>
            {
              !open &&
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            }
            <HiOutlineMenuAlt2
              className="lg:hidden"
              onClick={() => toggleDrawer(!isOpen)}
            />
          </div>
          <div>
            <Button onClick={logOut} className="bg-[#FAFAFB] w-[100%] flex items-center border-[1px] border-[#e6ebf1] rounded-lg py-2 px-2 ">Log Out</Button>
          </div>
        </div>
        <div>
          <div className="w-10 h-10 bg-gray rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
