import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, PageHeader, Row, Select } from "antd";
import { getAllCategry, saveCategry } from "../../service/categoryService";
import { notifyError, notifySuccess } from "../../Utils/utility";
import { getAllOutlet } from "../../service/outletService";
import { useSelector } from "react-redux";
import FileUploader from "../../components/FileUploader/FileUploader";
import { addImage, getProductBuId, saveProduct } from "../../service/productService";
import { baseUrl } from "../../service/baseUrl";
import axios from "axios";
import { httpPOST } from "../../service/intercepter";
import { useParams } from "react-router-dom";
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

const ManageProduct = (props) => {

  const formRef = React.useRef(null);
  const [form] = Form.useForm();

  const [categoryList, setCategoryList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [outletId, setOutletId] = useState(null);
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState(null);

  const { id } = useParams();


  useEffect(() => {
    getAllCategrys();
    if (id) {
      getProductById(id);
    }
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
    setCategoryList(options);
  };

  const getProductById = async (id) => {
    const response = await getProductBuId(id);
    console.log(response);
    if (response.status === 200) {
      form.setFieldsValue({
        product_name: response.data.name,
        price: response.data.price,
        discount: response.data.discount,
        product_code: response.data.product_code,
        unit_type: response.data.unit_type,
        current_category: response.data.categoryModal.name,
        category: response.data.categoryModal.id
      });
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      id:id,
      name: values.product_name,
      price: values.price,
      discount: values.discount,
      product_code: values.outlet,
      unit_type: values.unit_type,
      imageId: imageId,
      categoryId: values.category
    }
    const response = await saveProduct(data);
    if (response.status === 200) {
      notifySuccess("Created Success");
      onReset();
    } else {
      notifyError("Created Failed");
    }
  };

  const onFileChangeHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productImage', e.target.files[0]);
    const response = await axios.post("http://localhost:8080/api/file/upload", formData);
    if (response.status === 200) {
      setImageId(response.data);
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
      <PageHeader title="Add Products" />
      <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
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
          <Row >
            <Col style={{ padding: 5 }} span={12}>
              <Form.Item
                name="product_name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
                  placeholder="Product Name"
                />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
                  placeholder="Price"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                name="discount"
                label="Discount"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input
                  className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
                  placeholder="Discount"
                  type="number"
                />
              </Form.Item>

              <Form.Item
                name="unit_type"
                label="Unit Type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
                  placeholder="Unit Type"
                />
              </Form.Item>

              <Form.Item
                name="file"
                label="file"
              >
                <Input
                  type='file'
                  className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
                  placeholder="Unit Type"
                  onChange={(e) => onFileChangeHandler(e)}
                />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
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
                  options={categoryList}
                />
              </Form.Item>



              <Form.Item
                {...tailLayout}
                className="items-center border-radius-5 text-end"
              >
                <Button
                  type={"primary"}
                  htmlType="submit"
                  className="items-center border-radius-5"
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
            {/* <Col style={{ padding: 5 }} span={8}>
              <FileUploader />
            </Col> */}
          </Row>
        </Form>
      </div>
    </div >
  );
};

export default ManageProduct;
