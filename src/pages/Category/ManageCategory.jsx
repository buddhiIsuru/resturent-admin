import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { getAllCategry, saveCategry } from "../../service/categoryService";
import { notifyError, notifySuccess } from "../../Utils/utility";
import { getAllOutlet } from "../../service/outletService";
import { useSelector } from "react-redux";

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

const ManageCategory = (props) => {

  const formRef = React.useRef(null);
  const [form] = Form.useForm();
  const [outletList, setOutletList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [outletId, setOutletId] = useState(null);
  const [catId, setCatId] = useState(null);


  useEffect(() => {
    getAllOutlets(); 
    if(props.catObj){
      setCateData(props.catObj);
    }
  }, [props.catObj]);

  const setCateData = async (catObj) => {
    setCatId(catObj.id);
    console.log(catObj.id);
    form.setFieldsValue({
      category_name: catObj.name,
      outlet: catObj.outletId
    });
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

  return (
    <div className="p-6">
      <Modal
        title="Add Category"
        open={props.isModalOpen}
        footer={[]}
        onCancel={props.handleCancel}
      >
        <Form
          form={form}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          layout="vertical" 
          autoComplete="off"
        >
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
              placeholder="Category Name"
            />
          </Form.Item>

          <Form.Item
            name="outlet"
            label="Outlet"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5  py-1"
              style={{
                width: '100%',
              }}
              onChange={handleChange}
              options={outletList}
            />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            className="items-center border-radius-5 text-end"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="items-center border-radius-5"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategory;
