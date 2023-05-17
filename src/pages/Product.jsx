import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import PageHeader from "../components/PageHeader/PageHeader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DataTable from "../components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { getOrganization } from "../service/organizetionServices";
import { categoryTableColumns } from "../constants/tableColumns";

const Product = () => {
  const navigateTo = useNavigate();
  const [companyTableData, setCompanyTableData] = useState([]);

  useEffect(() => {
    getAllCompanys(0, 20);
  }, []);

  const getAllCompanys = async (page, limit) => {
    const response = await getOrganization(page, limit);
    if (response.status === 200) {
      setCompanyTableData(response.data.content);
    }
  };

  return (
    <div className="p-6">
      <PageHeader title="Product" />
      <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
        <div className="flex flex-col gap-2 items-center justify-between lg:flex-row">
          <div className="bg-[] w-full flex items-center border-[1px] border-[#e6ebf1] rounded-xl py-2 pl-2 pr-4 lg:w-[500px] shadow-md border-radius-50">
            <input
              type="search"
              className="bg-transparent w-full pl-2 outline-none font-medium text-base"
            />
            <HiSearch color="#A5B0BF" />
          </div>
          <button
            className="flex w-full shadow-md items-center justify-center gap-1 bg-A7D200 text-white fw-bold px-5 py-3 border-radius-50 hover:opacity-70 duration-500 lg:w-auto"
            onClick={() => navigateTo("/manage-company")}
          >
            <span className="text-white fw-bold ">
              <AiOutlinePlusCircle />
            </span>{" "}
            Add
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <DataTable columns={categoryTableColumns} data={companyTableData} />
        </div>
      </div>
    </div>
  );
};

export default Product;
