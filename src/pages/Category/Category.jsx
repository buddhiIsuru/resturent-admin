import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import PageHeader from "../../components/PageHeader/PageHeader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DataTable from "../../components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import ManageCategory from "./ManageCategory";
import { deleteCategry, getAllCategry, getCategryByOutlet } from "../../service/categoryService";
import { Button, Popconfirm, Select, Space, Tooltip, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCategoryObject } from "../../redux/state/categoryState";
import { getAllOutlet } from "../../service/outletService";

const Categorys = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [outletList, setOutletList] = useState([]);
  const [categoryObj, setCategoryObj] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getALlOutlet();
  }, []);

  const getALlOutlet = async (id) => {
    const response = await getAllOutlet();
    const options = [];
    if (response.status === 200) {
      for (let i = 0; i < response.data.length; i++) {
        options.push({
          label: response.data[i].outletName,
          value: response.data[i].id,
        });
      }
    }
    getCategorys(response.data[0].id);
    setOutletList(options);
  };

  const getCategorys = async (id) => {
    const response = await getCategryByOutlet(id);
    if (response.status === 200) {
      setCategoryList(response.data);
    }
  };

  const confirm = async (e) => {
    const response = await deleteCategry(e.id);
    if (response.status === 200) {
      getCategorys();
      message.success('Delete Success');
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (data) => <Space>
        {/* <Popconfirm
          title="Are you sure to delete this category?"
          description="Are you sure to delete this task?"
          onConfirm={() => confirm(data)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger shape="circle" onClick={() => { }} icon={<DeleteOutlined />}></Button>
        </Popconfirm> */}
        <Tooltip title="Delete Category">
          <Button warning shape="circle" onClick={() => { setCategoryObj(data); setIsOpen(true) }} icon={<EditOutlined />}></Button>
        </Tooltip>
      </Space>,
    }
  ]

  const handleChange = (value) => {
    getCategorys(value);
  };

  return (
    <div className="p-6">
      <PageHeader title="Category" />
      <ManageCategory
        isModalOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
          getCategorys();
        }}
        catObj={categoryObj}
        handleOk={() => console.log("handleOk")}
      />
      <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
        <div className="flex flex-col gap-2 items-center justify-between lg:flex-row">
          <div className="bg-[] w-full flex items-center border-[1px] border-[#e6ebf1] rounded-xl lg:w-[500px] shadow-md border-radius-50">
            <Select
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5  py-1"
              style={{
                width: '100%',
              }}
              onChange={handleChange}
              options={outletList}
            />
          </div>
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
          <DataTable columns={tableColumns} data={categoryList} />
        </div>
      </div>
    </div>
  );
};

export default Categorys;
