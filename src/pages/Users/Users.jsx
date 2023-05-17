import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DataTable from "../../components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { deleteCategry, getCategryByOutlet } from "../../service/categoryService";
import { Button, Select, Space, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllOutlet } from "../../service/outletService";
import ManageUsers from "./ManageUsers";
import { getUsers } from "../../service/authService";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [outletList, setOutletList] = useState([]);
  const [userObj, setUserObj] = useState({});
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
    getUsersInOutlet(response.data[0].id);
    setOutletList(options);
  };

  const getUsersInOutlet = async (id) => {
    const response = await getUsers(id);
    if (response.status === 200) {
      console.log(response);
      setUserList(response.data);
    }
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const tableColumns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (data) => <Space>
        <Tooltip title="Delete Category">
          <Button warning shape="circle" onClick={() => { setUserObj(data); setIsOpen(true) }} icon={<EditOutlined />}></Button>
        </Tooltip>
      </Space>,
    }
  ]

  const handleChange = (value) => {
    getUsersInOutlet(value);
  };

  return (
    <div className="p-6">
      <PageHeader title="Users" />
      <ManageUsers
        isModalOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
        }}
        userObj={userObj}
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
          <DataTable columns={tableColumns} data={userList} />
        </div>
      </div>
    </div>
  );
};

export default Users;
