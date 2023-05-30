import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Row, Select } from "antd";
import { getAllCategry, saveCategry } from "../../service/categoryService";
import { notifyError, notifySuccess } from "../../Utils/utility";
import { getAllOutlet } from "../../service/outletService";
import { useSelector } from "react-redux";
import { getInvoiceData } from "../../service/invoiceService";
import moment from "moment";
import DataTable from "../../components/DataTable/DataTable";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    // span: 16,
  },
};

const ViewInvoice = (props) => {

  const formRef = React.useRef(null);
  const [form] = Form.useForm();
  const [outletList, setOutletList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [outletId, setOutletId] = useState(null);
  const [catId, setCatId] = useState(null);
  const [invoiceObj, setInvoiceObj] = useState(null);


  useEffect(() => {
    console.log("invoiceId ======> ");
    console.log(props.invoiceId);
    if (props.invoiceId) {
      getInvoice(props.invoiceId);
    }
  }, [props.invoiceId]);

  const getInvoice = async (invoiceId) => {
    console.log("************ ======> ");
    setCatId(invoiceId);
    const response = await getInvoiceData(invoiceId);
    setInvoiceObj(response.data);
    console.log(response.data);
  };

  const getAllOutlets = async () => {
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
  };

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      id: catId,
      name: values.category_name,
      outletId: values.outlet,
    }
    const response = await saveCategry(data);
    if (response.status === 200) {
      notifySuccess("Category Created Success");
      props.handleCancel();
      onReset();
    } else {
      notifyError("Category Created Failed");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const tableColumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "productName",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "product_amount",
      dataIndex: "product_amount",
      key: "product_amount",
      render: (data) =><>{parseFloat(data).toFixed(3)}</>
    },
    {
      title: "Tax Amount",
      dataIndex: "product_discount",
      key: "product_discount",
      render: (data) =><>{parseFloat(data).toFixed(3)}</>
    },
    {
      title: "product_qty",
      dataIndex: "product_qty",
      key: "product_qty",
    },
  ]

  return (
    <div className="p-6">
      <Modal
        width={1000}
        title="Invoice"
        open={props.isModalOpen}
        footer={[]}
        onCancel={props.handleCancel}
      >
        <Row className="w-100">
          <div className="w-[75%] text-[15px] text-right">
            Invoice number :
          </div>
          <div className="w-[25%] text-right">
            {invoiceObj?.id}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[15px] text-right">
            Invoiced date :
          </div>
          <div className="w-[25%] text-right">
            {moment(invoiceObj?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[15px] text-right">
            Payment method :
          </div>
          <div className="w-[25%] text-right">
            {invoiceObj?.payment_method}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[15px] text-right">
            Invoice Type :
          </div>
          <div className="w-[25%] text-right">
            {invoiceObj?.invoiceType}
          </div>
        </Row>

        <div className="mt-5 overflow-x-auto">
          <DataTable columns={tableColumns} pagination={false} data={invoiceObj?.invoiceDetailsDetailModals} />
        </div>

        <Row className="w-100">
          <div className="w-[75%] text-[17px] text-right">
            Number of products :
          </div>
          <div className="w-[25%] text-[17px] text-right">
            {invoiceObj?.invoiceDetailsDetailModals.length}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[17px] text-right">
            Sub total :
          </div>
          <div className="w-[25%] text-[17px] text-right">
            {parseFloat(invoiceObj?.subTotalAmount).toFixed(3)}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[17px] text-right">
            Discount total (Omr.) :
          </div>
          <div className="w-[25%] text-[17px] text-right">
            {parseFloat(invoiceObj?.total_discount).toFixed(3)}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[17px] text-right">
            Tax (Omr.) :
          </div>
          <div className="w-[25%] text-[17px] text-right">
            {parseFloat(invoiceObj?.tax_amount).toFixed(3)}
          </div>
        </Row>
        <Row className="w-100">
          <div className="w-[75%] text-[20px] fw-700 text-right">
            Grand total :
          </div>
          <div className="w-[25%] text-[20px] fw-700 text-right">
            {parseFloat(invoiceObj?.grandTotalAmount).toFixed(3)}
          </div>
        </Row>


      </Modal>
    </div>
  );
};

export default ViewInvoice;
