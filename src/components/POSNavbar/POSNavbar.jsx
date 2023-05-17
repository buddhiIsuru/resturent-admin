import { Button } from "antd";
import moment from "moment";

const POSNavbar = ({ toggleDrawer, isOpen, open, setOpen }) => {
  return (
    <nav className="bg-[#0c4056] w-full h-[70px] sticky z-30 top-0 flex items-center px-5 shadow-sm ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div>
            <Button className="bg-[#FAFAFB] w-[100%] flex items-center border-[1px] border-[#e6ebf1] rounded-lg py-2 px-2 ">POS</Button>
          </div>
          <Button className="bg-[#FAFAFB] w-[100%] flex items-center border-[1px] border-[#e6ebf1] rounded-lg py-2 px-2 ">
            {moment(new Date()).format("MM-DD-YYYY")}
          </Button>
          <Button className="bg-[#FAFAFB] w-[100%] flex items-center border-[1px] border-[#e6ebf1] rounded-lg py-2 px-2 ">
            
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <Button className="bg-[#FAFAFB] flex items-center border-[1px] border-[#e6ebf1] rounded-lg py-2 px-2 ">22-08-2022</Button>
            <Button className="bg-[#FAFAFB]  flex items-center border-[1px] border-[#e6ebf1] rounded-lg py-2 px-2 ">21:59:03</Button>
            <Button className="bg-gray w-[40px] h-[40px] items-center border-[1px] border-[#e6ebf1] rounded-full py-2 px-2 ">A</Button>
            {/* <div className="w-10 h-10 bg-gray "></div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default POSNavbar;
