import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { saveOutlet } from "../../service/outletService";
import { useDispatch } from "react-redux";
import { setIsLoadingOutlet } from "../../redux/state/outletState";

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

const ManageCompany = (props) => {

  const formRef = React.useRef(null);

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    
    console.log(values);
    dispatch(setIsLoadingOutlet(true));
    const data = {
      outletName: values.outlet_name,
      address: values.outlet_address,
      phoneNo: values.outlet_phoneNo,
      companyId: 1,
    }

    // const response = await saveOutlet(data);
    // if (response.status === 200) {
    //   dispatch(setIsLoadingOutlet(false));
    //   props.handleCancel();
    //   onReset();
    //   messageApi.open({
    //     type: 'success',
    //     content: 'This is a success message',
    //   });
    // } else {
    //   messageApi.open({
    //     type: 'error',
    //     content: 'This is a success message',
    //   });
    // }
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const onReset = () => {
    form.resetFields();
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
          ref={formRef}
          name="control-ref"
          onFinish={error}
          style={{
            maxWidth: 600,
          }}
          layout="vertical" autoComplete="off"
        >
          <Form.Item
            name="outlet_name"
            label="Outlet Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
              placeholder="Outlet Name"
            />
          </Form.Item>

          <Form.Item
            name="outlet_address"
            label="Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
              placeholder="Address"
            />
          </Form.Item>

          <Form.Item
            name="outlet_phoneNo"
            label="Phone No"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
              placeholder="Phone No"
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

export default ManageCompany;
