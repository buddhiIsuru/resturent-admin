import React from "react";
import { HiSearch } from "react-icons/hi";
import PageHeader from "../components/PageHeader/PageHeader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DataTable from "../components/DataTable/DataTable";
import { comapnyTableColumns } from "../constants/requestTableColumns";
import { useNavigate } from 'react-router-dom';

//dummy data imports
import { companyTableData } from "../dummyData";

const Request = () => {
  const navigateTo = useNavigate();

  return (
    <div className="p-6">
      <PageHeader title="" />
      <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
        <div className="flex flex-col gap-2 items-center justify-between lg:flex-row">
          <div className="bg-[] w-full flex items-center border-[1px] border-[#e6ebf1] rounded-xl py-2 pl-2 pr-4 lg:w-[300px] shadow-md border-radius-50">
            <input
              type="text"
              className="bg-transparent w-full pl-2 outline-none font-medium text-base"
            />
            <HiSearch color="#A5B0BF" />
          </div>
          <button
            className="flex w-full shadow-md items-center justify-center gap-1 bg-A7D200 text-white fw-bold px-5 py-3 border-radius-50 hover:opacity-70 duration-500 lg:w-auto"
            onClick={() => navigateTo('/manage-company')}
          >
            <span className="text-white fw-bold ">
              <AiOutlinePlusCircle />
            </span>{" "}
            Add Company
          </button>
        </div>
        <div className="w-full my-5 pb-5">
          <ul className="">
            <li className="float-left mr-3" >
              <label className="items-center shadow-md bg-[] border-[1px] border-[#dbdbe7] text-[#9b9b9b] rounded-xl py-1 px-3">Package</label>
            </li>
            <li className="float-left mx-3">
              <label className="items-center shadow-md bg-[#A7D200] border-[1px] border-[#A7D200] text-white rounded-xl py-1 px-3">Country</label>
            </li>
            <li className="float-left mx-3">
              <label className="items-center shadow-md bg-[] border-[1px] border-[#dbdbe7] text-[#9b9b9b] rounded-xl py-1 px-3">Domain</label>
            </li>
            <li className="float-left mx-3" >
              <label className="items-center shadow-md bg-[] border-[1px] border-[#dbdbe7] text-[#9b9b9b] rounded-xl py-1 px-3">User Size</label>
            </li>
            <li className="float-left mx-3" >
              <label className="items-center shadow-md bg-[] border-[1px] border-[#dbdbe7] text-[#9b9b9b] rounded-xl py-1 px-3">Sales Type</label>
            </li>
          </ul>
        </div>
        <div className="mt-5 overflow-x-auto">
          <DataTable columns={comapnyTableColumns} data={companyTableData} />
        </div>
      </div>
    </div>
  );
};

export default Request;
