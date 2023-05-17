import { Button, Space } from "antd";
import React from "react";

const PosFooter = () => {
    return (
        <nav className="bg-[#242424] w-full h-[60px] sticky z-30 top-0 flex items-center px-5 shadow-sm ">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Space>
                        <Button className="bg-[#434343] w-[100%] h-[auto] flex items-center border-[1px] border-[black] text-[white] rounded-lg text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Draft</Button>
                        <Button className="bg-[#242424] w-[100%] h-[auto] flex items-center border-[1px] border-[white] text-[white] rounded-lg text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Draft List</Button>
                    </Space>
                </div>
                <div className="flex items-center gap-5">
                    <Space>
                        <p className="bg-[#242424] w-[100%] h-[auto]  text-[white] text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Discount : 10%</p>
                        <p className="bg-[#242424] w-[100%] h-[auto]  text-[white] text-[16px]  ">|</p>
                        <p className="bg-[#242424] w-[100%] h-[auto]  text-[white] text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Charges : 0</p>
                        <p className="bg-[#242424] w-[100%] h-[auto]  text-[white] text-[16px] ">|</p>
                        <p className="bg-[#242424] w-[100%] h-[auto]  text-[white] text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Taxes : 0</p>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Button className="bg-[#376288] w-[100%] h-[auto] flex items-center border-[1px] border-[#434343] text-[white] rounded-lg text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Discount</Button>
                        <Button className="bg-[#376288] w-[100%] h-[auto] flex items-center border-[1px] border-[#434343] text-[white] rounded-lg text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Charges</Button>
                        <Button className="bg-[#376288] w-[100%] h-[auto] flex items-center border-[1px] border-[#434343] text-[white] rounded-lg text-[16px] pt-[8px] pb-[8px] pl-[25px] pr-[25px] ">Taxes</Button>
                    </Space>
                </div>
            </div>
        </nav>
    )
}

export default PosFooter;