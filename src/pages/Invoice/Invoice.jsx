import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { deleteCategry } from "../../service/categoryService";
import { Button, Select, Space, Tooltip, message } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllOutlet } from "../../service/outletService";
import { getInvoiceByOutlet } from "../../service/invoiceService";
import moment from "moment";
import ViewInvoice from "./ViewInvoice";

const Invoice = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [invoiceId, setInvoiceId] = useState();
  const [invoiceList, setInvoiceList] = useState([]);
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
    setOutletList(options);
    getInvoices(response.data[0].id);
  };

  const getInvoices = async (id) => {
    const response = await getInvoiceByOutlet(id);
    if (response.status === 200) {
      setInvoiceList(response.data);
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
      title: "Invoice NO",
      dataIndex: "invoiceId",
      key: "invoiceId",
    },
    {
      title: "Date/Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => 
          // <Button >{data}</Button>
          <p>{moment(data).format('MMMM Do YYYY, h:mm:ss a')}</p>
    },
    {
      title: "Sub Total",
      dataIndex: "subTotalAmount",
      key: "subTotalAmount",
    },
    {
      title: "Tax Amount",
      dataIndex: "tax_amount",
      key: "tax_amount",
    },
    {
      title: "Discount",
      dataIndex: "total_discount",
      key: "total_discount",
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotalAmount",
      key: "grandTotalAmount",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (data) => <Space>
        <Tooltip title="View Invoice">
          <Button warning shape="circle" onClick={() => { setInvoiceId(data.id); setIsOpen(true) }} icon={<EyeOutlined />}></Button>
        </Tooltip>
      </Space>,
    }
  ]

  const handleChange = (value) => {
    getInvoices(value);
  };

  return (
    <div className="p-6">
      <PageHeader title="invoice" />
      <ViewInvoice
        isModalOpen={isOpen}
        handleCancel={() => {
          setIsOpen(false);
        }}
        invoiceId={invoiceId}
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
        </div>
        <div className="mt-5 overflow-x-auto">
          <DataTable columns={tableColumns} data={invoiceList} />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
