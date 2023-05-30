import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import PageHeader from "../../components/PageHeader/PageHeader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DataTable from "../../components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { categoryTableColumns } from "../../constants/tableColumns";
import ManageOutlet from "./ManageOutlet";
import { getAllOutlet } from "../../service/outletService";
import { getCompany } from "../../service/companyService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Popconfirm, Space } from "antd";
import { imageBaseUrl } from "../../service/baseUrl";

const Outlets = () => {
  const navigateTo = useNavigate();
  const [outletTableData, setOutletTableData] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [companyObj, setCompanyObj] = useState({});

  useEffect(() => {
    getAllOutlets(0, 20);
    getAllCompanys(0, 20);
  }, []);

  const getAllOutlets = async () => {
    const response = await getAllOutlet();
    if (response.status === 200) {
      setOutletTableData(response.data);
    }
  };

  const getAllCompanys = async () => {
    const response = await getCompany();

    if (response.status === 200) {
      const options = [];
      for (let i = 0; i < response.data.length; i++) {
        options.push({
          label: response.data[i].name,
          value: response.data[i].id,
        });
      }
      setCompanyList(options);
    }

  };

  const outletTableColumns = [
    {
      title: "Logo",
      dataIndex: "",
      key: "Logo",
      render: (data) =>
        <Avatar
          style={{
            backgroundColor: '#1677ff',
          }}
          icon={<Image src={data.logoId !== null ? imageBaseUrl + data.logoId : ""} />}
        />
    }, {
      title: "Name",
      dataIndex: "outletName",
      key: "outletName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (data) => <Space>
        {/* <Tooltip title="Update Category"> 
          <Button warning shape="circle" onClick={()=>{setCategoryObj(data);setIsOpen(true);}} icon={<EditOutlined />}></Button>
        </Tooltip> */}
        {/* <Popconfirm
          title="Are you sure to delete this category?"
          description="Are you sure to delete this task?"
          // onConfirm={() => confirm(data)}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger shape="circle" onClick={() => { }} icon={<DeleteOutlined />}></Button>
        </Popconfirm> */}
        <Button warning shape="circle" onClick={() => { setCompanyObj(data); setIsOpen(true) }} icon={<EditOutlined />}></Button>
      </Space>,
    }
  ]

  return (
    <div className="p-6">
      <PageHeader title="Outlets" />
      <ManageOutlet
        isModalOpen={isOpen}
        companyList={companyList}
        company={companyObj}
        handleCancel={() => { setIsOpen(false); getAllOutlets() }}
        handleOk={() => console.log("handleOk")}
      />
      <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
        <div className="flex flex-col gap-2 items-center justify-between lg:flex-row">
          {/* <div className="bg-[] w-full flex items-center border-[1px] border-[#e6ebf1] rounded-xl py-2 pl-2 pr-4 lg:w-[500px] shadow-md border-radius-50">
            <input
              type="search"
              className="bg-transparent w-full pl-2 outline-none font-medium text-base"
            />
            <HiSearch color="#A5B0BF" />
          </div> */}
          <button
            className="flex w-full shadow-md items-center justify-center gap-1 bg-A7D200 text-white fw-bold px-5 py-3 border-radius-50 hover:opacity-70 duration-500 lg:w-auto"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-white fw-bold ">
              <AiOutlinePlusCircle />
            </span>{" "}
            Add
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <DataTable columns={outletTableColumns} data={outletTableData} />
        </div>
      </div>
    </div>
  );
};

export default Outlets;
