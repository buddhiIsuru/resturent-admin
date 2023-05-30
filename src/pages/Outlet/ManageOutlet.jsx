import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input, Modal, Select, Space, Spin, message } from "antd";
import { saveOutlet } from "../../service/outletService";
import { useDispatch } from "react-redux";
import { setIsLoadingOutlet } from "../../redux/state/outletState";
import { notifySuccess } from "../../Utils/utility";
import { baseUrl, imageBaseUrl } from "../../service/baseUrl";
import axios from "axios";

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

const ManageOutlet = (props) => {

  const formRef = React.useRef(null);
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoding, setIsLoading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [outletId, setOutletId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.company) {
      setOutletData(props.company);
    }
  }, [props.company]);

  const setOutletData = async (company) => {
    setOutletId(company.id);
    console.log(company);
    setImageId(company.logoId);
    form.setFieldsValue({
      outlet_name: company.outletName,
      outlet_address: company.address,
      outlet_phoneNo: company.phoneNo,
      company: company.companyId
    });
  };

  const onFileChangeHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('productImage', e.target.files[0]);
    const response = await axios.post(baseUrl + "/api/file/upload", formData);
    if (response.status === 200) {
      setImageId(response.data);
    }
    setIsLoading(false);
  };

  const onFinish = async (values) => {
    dispatch(setIsLoadingOutlet(true));
    const data = {
      id: outletId,
      outletName: values.outlet_name,
      address: values.outlet_address,
      phoneNo: values.outlet_phoneNo,
      companyId: values.company,
      logoId: imageId,
    }
    const response = await saveOutlet(data);
    if (response.status === 200) {
      dispatch(setIsLoadingOutlet(false));
      props.handleCancel();
      onReset();
      notifySuccess("Outlet Created Success");
    } else {
      notifySuccess("Outlet Created Failed");
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
        form={form}
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
            name="company"
            label="Company"
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
              options={props.companyList}
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
            name="file"
            label="file"
          >
            <Input
              type='file'
              className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
              placeholder="Logo"
              onChange={(e) => onFileChangeHandler(e)}
            />
          </Form.Item>

          {
            imageId ?
              <Space>
                <label>Current logo</label>

                <Image src={imageId !== null ? imageBaseUrl + imageId : ""} height={50} width={50} />
              </Space>
              : null
          }

          <Form.Item
            {...tailLayout}
            className="items-center border-radius-5 text-end"
          >
            {
              isLoding ?
                <Spin />
                :
                <Button
                  type="primary"
                  htmlType="submit"
                  className="items-center border-radius-5"
                >
                  Submit
                </Button>
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageOutlet;
