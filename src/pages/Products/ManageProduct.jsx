import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Input, Modal, PageHeader, Row, Select, Space, Spin } from "antd";
import { getAllCategry, getCategryByOutlet, saveCategry } from "../../service/categoryService";
import { notifyError, notifySuccess } from "../../Utils/utility";
import { getAllOutlet } from "../../service/outletService";
import { useSelector } from "react-redux";
import FileUploader from "../../components/FileUploader/FileUploader";
import { addImage, getProductBuId, saveProduct } from "../../service/productService";
import { baseUrl, imageBaseUrl } from "../../service/baseUrl";
import axios from "axios";
import { httpPOST } from "../../service/intercepter";
import { useParams } from "react-router-dom";
import { getDevicesOutletId } from "../../service/deviceService";
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

  const [form] = Form.useForm();

  const formRef = React.useRef(null);

  const [isLoding, setIsLoading] = useState(false);

  const [imageId, setImageId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [productDevices, setProductDevices] = useState([]);

  const [taxIncluded, setTaxIncluded] = useState(true);
  const [outletList, setOutletList] = useState([]);

  const [deviceList, setDeviceList] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    getALlOutlet();
    if (id) {
      getProductById(id);
    }
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
  };

  const getAllCategrys = async (id) => {
    const response = await getCategryByOutlet(id);
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
      getAllCategrys(response.data.categoryModal.outletId);
      setImageId(response.data.imageId);
      form.setFieldsValue({
        product_name: response.data.name,
        price: response.data.price,
        discount: response.data.discount,
        product_code: response.data.product_code,
        unit_type: response.data.unit_type,
        current_category: response.data.categoryModal.name,
        category: response.data.categoryModal.id,
        outlet: response.data.categoryModal.outletId
      });
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      id: id,
      name: values.product_name,
      price: values.price,
      discount: values.discount,
      product_code: "524",
      unit_type: values.unit_type,
      imageId: imageId,
      taxIncluded: taxIncluded,
      categoryId: values.category,
      devicePrices:deviceList
    }
    console.log(data);
    const response = await saveProduct(data);
    if (response.status === 200) {
      notifySuccess("Created Success");
      onReset();
    } else {
      notifyError("Created Failed");
    }
  };

  const getDevices = async (id) => {
    const response = await getDevicesOutletId(id);
    console.log(response);
    console.log(response.data);
    if (response.status === 200) {
      setDeviceList(response.data);
    }
  };

  const onFileChangeHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('productImage', e.target.files[0]);
    const response = await axios.post(baseUrl + "/api/file/upload", formData);
    if (response.status === 200) {
      console.log(response.data);
      setImageId(response.data);
    }
    setIsLoading(false);
  };

  const onReset = () => {
    
    form.resetFields();
  };

  const handleChange = (value) => {
    getAllCategrys(value);
    getDevices(value);
  };


  const productDevicesHandleChange = (id, value) => {
    const tempDeviceList = deviceList;
    console.log(id);
    tempDeviceList.forEach(element => {
      console.log(element);
      if (id == element.deviceId) {
        
        element.price = parseFloat(value).toFixed(3)
      }
    });
    setDeviceList(tempDeviceList);
    console.log(tempDeviceList);
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

              {/* <Form.Item
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
              </Form.Item> */}

              {/* <Form.Item
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
              </Form.Item> */}

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

              {
                imageId ?
                  <Space>
                    <label>Current Image</label>

                    <Image src={imageId !== null ? imageBaseUrl + imageId : ""} height={50} width={50} />
                  </Space>
                  : null
              }

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
                name="outlet"
                label="Outlet"
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
              {
                deviceList.map((obj, index) => {
                  return (
                    <Form.Item
                      name={obj.deviceName}
                      label={obj.deviceName + " Price"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        className="bg-white w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-5 py-2 px-2"
                        placeholder={obj.deviceName + " Price"}
                        onChange={(e)=>{productDevicesHandleChange(obj.deviceId,e.target.value)}}
                      />
                    </Form.Item>
                  )
                })
              }



              <Button onClick={() => setTaxIncluded(true)} style={{ background: taxIncluded ? "#1677ff" : "transparent", color: taxIncluded ? "white" : "black" }} >Tax Included</Button>
              <Button onClick={() => setTaxIncluded(false)} style={{ background: taxIncluded ? "transparent" : "#1677ff", color: taxIncluded ? "black" : "white" }} >Tax excluded</Button>


              <Form.Item
                {...tailLayout}
                className="items-center border-radius-5 text-end mt-4"
              >
                {
                  isLoding ?
                    <Spin />
                    :
                    <Button
                      type={"primary"}
                      htmlType="submit"
                      className="items-center border-radius-5"
                    >
                      Submit
                    </Button>
                }
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
