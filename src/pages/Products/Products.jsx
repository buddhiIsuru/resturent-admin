import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import PageHeader from "../../components/PageHeader/PageHeader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DataTable from "../../components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import ManageCategory from "./ManageProduct";
import { deleteCategry, getAllCategry } from "../../service/categoryService";
import { Button, Popconfirm, Select, Space, Tooltip, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllProduct, getCategryViceProduct } from "../../service/productService";
import ManageProduct from "./ManageProduct";
import { getAllOutlet } from "../../service/outletService";

const Products = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(null);
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllCategrys();
  }, []);

  const getAllCategrys = async () => {
    const response = await getAllCategry();
    const options = [];
    if (response.status === 200) {
      for (let i = 0; i < response.data.length; i++) {
        options.push({
          label: response.data[i].name,
          value: response.data[i].id,
        });
      }
    }
    getProduct(response.data[0].id);
    setCategoryList(options);
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

  const handleChange = (value) => {
    getProduct(value);
  };

  const getProduct = async (id) => {
    const response = await getCategryViceProduct(id);
    if (response.status === 200) {
      setProductList(response.data);
    }
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Unit Type",
      dataIndex: "unit_type",
      key: "unit_type",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (data) => <Space>
        {/* <Tooltip title="Update Category"> 
          <Button warning shape="circle" onClick={()=>{setCategoryObj(data);setIsOpen(true);}} icon={<EditOutlined />}></Button>
        </Tooltip> */}
        <Popconfirm
          title="Are you sure to delete this category?"
          description="Are you sure to delete this task?"
          onConfirm={() => confirm(data)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger shape="circle" onClick={() => { }} icon={<DeleteOutlined />}></Button>
        </Popconfirm>
          <Button warning shape="circle" onClick={() => {navigateTo("/admin/manage-product/"+data.id)}} icon={<EditOutlined />}></Button>
      </Space>,
    }
  ]

  return (
    <div className="p-6">
      <PageHeader title="Products" />
      <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
        <div className="flex flex-col gap-2 items-center justify-between lg:flex-row">
          <div className="bg-[] w-full flex items-center border-[1px] border-[#e6ebf1] rounded-xl  lg:w-[500px] shadow-md border-radius-50">
            {/* <input
              type="search"
              className="bg-transparent w-full pl-2 outline-none font-medium text-base"
            />
            <HiSearch color="#A5B0BF" /> */}
            <Select
              defaultValue="Select Outlet"
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5  py-1"
              style={{
                width: '100%',
              }}
              onChange={handleChange}
              options={categoryList}
            />
          </div>
          <button
            className="flex w-full shadow-md items-center justify-center gap-1 bg-A7D200 text-white fw-bold px-5 py-3 border-radius-50 hover:opacity-70 duration-500 lg:w-auto"
            onClick={() => navigateTo("/admin/manage-product")}
          >
            <span className="text-white fw-bold ">
              <AiOutlinePlusCircle />
            </span>{" "}
            Add
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <DataTable columns={tableColumns} data={productList} />
        </div>
      </div>
    </div>
  );
};

export default Products;
