import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Statistic,
  message,
  Skeleton,
  Spin,
} from "antd";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import {
  addOrganization,
  updateOrganization,
} from "../service/organizetionServices";
import { useParams } from "react-router-dom";
import { getOrganizationInId } from "./../service/organizetionServices";

const ManageCompany = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState(false);
  const [name, setName] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [bio, setBio] = useState("");
  const [brandColor, setBrandColor] = useState("");
  const [darkBrandColor, setDarkBrandColor] = useState("");
  const [domain, setDomain] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [form] = Form.useForm();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setCompanyId(id);
      getCompanyData(id);
    }
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const createCompany = async (values) => {
    const modules = [];
    if (!values.company_modules.value) {
      modules.push(values.company_modules);
    } else {
      modules.push(values.company_modules.value);
    }
    setIsLoading(true);
    const data = {
      avatar: "",
      bio: values.company_bio,
      brandColor: values.brand_color,
      darkBrandColor: values.dark_brand_color,
      domain: values.company_domain,
      locale: values.company_local ? values.company_local.value : "",
      name: values.company_name,
      timeZone: values.company_timezone.value,
      status: values.company_status.value,
      modules: modules,
    };
    const response = await addOrganization(data);
    console.log(response);
    if (response.status === 200) {
      message.success({
        content: "Success",
      });
    } else {
      message.error({
        content: response.data.message,
      });
    }
    setIsLoading(false);
  };

  const updateCompany = async (values) => {
    const modules = [];
    if (!values.company_modules.value) {
      modules.push(values.company_modules);
    } else {
      modules.push(values.company_modules.value);
    }
    setIsLoading(true);
    const data = {
      id: parseInt(companyId),
      avatar: "",
      bio: values.company_bio,
      brandColor: values.brand_color,
      darkBrandColor: values.dark_brand_color,
      domain: values.company_domain,
      locale: !values.company_local.value
        ? values.company_local
        : values.company_local.value,
      name: values.company_name,
      timeZone: !values.company_timezone.value
        ? values.company_timezone
        : values.company_timezone.value,
      status: !values.company_status.value
        ? values.company_status
        : values.company_status.value,
      modules: modules,
    };
    console.log(data);
    const response = await updateOrganization(data);
    console.log(response);
    if (response.status === 200) {
      message.success({
        content: "Success",
      });
    } else {
      message.error({
        content: response.data.message,
      });
    }
    setIsLoading(false);
  };

  const getCompanyData = async (id) => {
    setIsLoadingGetData(true);
    const response = await getOrganizationInId(id);
    console.log(response);
    if (response.status === 200) {
      form.setFieldsValue({
        company_bio: response.data.bio,
        brand_color: response.data.brandColor,
        dark_brand_color: response.data.darkBrandColor,
        company_domain: response.data.domain,
        company_local: response.data.locale ? response.data.locale : "",
        company_name: response.data.name,
        company_timezone: response.data.timeZone,
        company_status: response.data.status,
        company_modules: response.data.modules[0],
      });
    } else {
      message.error({
        content: response.data.message,
      });
    }
    setIsLoadingGetData(false);
  };

  const GradeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm mr-50`}></span>
        {data.label}
      </components.Option>
    );
  };

  return (
    <div className="p-6">
      {isLoadingGetData ? (
        <Skeleton />
      ) : (
        <>
          <PageHeader title="Manage Company" />
          <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 18 }}
            onFinish={companyId ? updateCompany : createCompany}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="text-left"
            initialValues={{
              remember: true,
            }}
            form={form}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm mt-5">
              <div className="flex flex-col gap-2 justify-between lg:flex-row">
                <div className="w-full lg:w-[75%] items-center">
                  <Form.Item
                    label="Company Name"
                    name="company_name"
                    className="mb-3"
                    rules={[
                      {
                        required: true,
                        message: "Please input company name!",
                      },
                    ]}
                  >
                    <Input
                      className="bg-white w-[80%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-50 py-2 px-2"
                      placeholder="Company Name Here"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Company Bio"
                    name="company_bio"
                    className="mb-3"
                    rules={[
                      {
                        required: false,
                        message: "Please input company name!",
                      },
                    ]}
                  >
                    <Input
                      className="bg-white w-[80%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-50 py-2 px-2"
                      placeholder="Company Bio Here"
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Company Domain"
                    name="company_domain"
                    className="mb-3"
                    rules={[
                      {
                        required: false,
                        message: "Please input company name!",
                      },
                    ]}
                  >
                    <Input
                      className="bg-white w-[80%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-50 py-2 px-2"
                      placeholder="Company Domain Here"
                      value={domain}
                      onChange={(event) => setDomain(event.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Brand Color"
                    name="brand_color"
                    className="mb-3"
                    rules={[
                      {
                        required: false,
                        message: "Please input company name!",
                      },
                    ]}
                  >
                    <Input
                      className="bg-white w-[50%] flex items-center border-[none ] py-0 px-0"
                      placeholder="Please input brand color here"
                      type="color"
                      value={brandColor}
                      defaultValue="#A7D200"
                      onChange={(event) => setBrandColor(event.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Dark Brand Color"
                    name="dark_brand_color"
                    className="mb-3"
                    rules={[
                      {
                        required: false,
                        message: "Please input dark brand color name!",
                      },
                    ]}
                  >
                    <Input
                      className="bg-white w-[50%] flex items-center border-[none ] py-0 px-0"
                      placeholder="Company Email Here"
                      type="color"
                      value={darkBrandColor}
                      defaultValue="#A7D200"
                      onChange={(event) =>
                        setDarkBrandColor(event.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Status"
                    name="company_status"
                    className="mb-3"
                    rules={[
                      {
                        required: true,
                        message: "Please select company status!",
                      },
                    ]}
                  >
                    <Select
                      className="w-[100%] items-center border-[1px] border-[#6A6D6C] bg-[transparent]  border-radius-50"
                      labelInValue
                      style={{
                        width: "50%",
                      }}
                      placeholder="Select Status"
                      options={[
                        {
                          value: "ACTIVE",
                          label: "ACTIVE",
                        },
                        {
                          value: "EXPIRED",
                          label: "EXPIRED",
                        },
                        {
                          value: "LOCKED",
                          label: "LOCKED",
                        },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Module"
                    name="company_modules"
                    className="mb-3"
                    rules={[
                      {
                        required: true,
                        message: "Please select module!",
                      },
                    ]}
                  >
                    <Select
                      className="w-[100%] items-center border-[1px] border-[#6A6D6C] bg-[transparent]  border-radius-50"
                      labelInValue
                      style={{
                        width: "50%",
                      }}
                      placeholder="Select Module"
                      options={[
                        {
                          value: "CALENDQ",
                          label: "CALENDQ",
                        },
                        {
                          value: "LEADQ",
                          label: "LEADQ",
                        },
                      ]}
                    />
                  </Form.Item>


                  <Form.Item
                    label="Local"
                    name="company_local"
                    className="mb-3"
                    rules={[
                      {
                        required: true,
                        message: "Please input local!",
                      },
                    ]}
                  >
                    <Select
                      className="w-[100%] items-center border-[1px] border-[none] bg-[transparent]  border-radius-50"
                      labelInValue
                      style={{
                        width: "50%",
                      }}
                      placeholder="Select local"
                      options={[
                        {
                          value: "si",
                          label: "Sinhala",
                        },
                        {
                          value: "en",
                          label: "English",
                        },
                      ]}
                    />
                  </Form.Item>

                  <div className="site-statistic-demo-card">
                    <Row gutter={16} className="mx-0 my-0 px-0 py-0">
                      <Row
                        gutter={12}
                        className="mx-0 my-0 px-0 py-0 bg-[#f0f0f0] rounded-lg shadow-sm"
                      >
                        <Col lg={8} md={16} className="m-auto my-2">
                          <Card className="w-full bg-[#f0f0f0] border-none">
                            <Statistic
                              title="Terms"
                              value={11.28}
                              precision={2}
                              valueStyle={{
                                color: "#A7D200",
                              }}
                              // prefix={<ArrowUpOutlined />}
                              // suffix="%"
                            />
                          </Card>
                        </Col>
                        <Col lg={8} md={16} className="m-auto my-2">
                          <Card className="w-full bg-[#f0f0f0] border-none">
                            <Statistic
                              title="Users"
                              value={9.3}
                              precision={2}
                              valueStyle={{
                                color: "#01c4f3",
                              }}
                              // prefix={<ArrowDownOutlined />}
                              suffix="100/200"
                            />
                          </Card>
                        </Col>
                        <Col lg={8} md={12} className="m-auto my-2">
                          <Card className="w-full bg-[#f0f0f0] border-none">
                            <Statistic
                              title="Subscriptions"
                              value={9.3}
                              precision={2}
                              valueStyle={{
                                color: "#01c4f3",
                              }}
                              // prefix={<ArrowDownOutlined />}
                              // suffix="%"
                            />
                          </Card>
                        </Col>
                      </Row>
                      <Col lg={6} md={12} className="w-[100%] lg:m-auto my-2">
                        <div className="w-full">
                          <button
                            type=""
                            className="w-full py-2 my-2 bg-white hover:bg-white hover:text-black text-[#A7D200] border-[2px] border-[#A7D200] shadow-md border-radius-50"
                            block
                          >
                            Sales Agent
                          </button>
                          <button
                            type=""
                            className="w-full py-2 my-2 bg-white hover:bg-white hover:text-black text-[#A7D200] border-[2px] border-[#A7D200] shadow-md border-radius-50"
                            block
                          >
                            Status
                          </button>
                          <button
                            type=""
                            className="w-full py-2 my-2 bg-white hover:bg-white hover:text-black text-[#A7D200] border-[2px] border-[#A7D200] shadow-md border-radius-50"
                            block
                          >
                            Agreement
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="w-full lg:w-[25%] text-center px-4">
                  <ImageUploader />
                  <button
                    type=""
                    className="w-full py-2 my-2 bg-white hover:bg-white hover:text-black text-[#A7D200] border-[2px] border-[#A7D200] shadow-md border-radius-50"
                    block
                  >
                    Biz Gold
                  </button>
                  <button
                    type=""
                    className="w-full py-2 my-2 bg-white hover:bg-white hover:text-black text-[#A7D200] border-[2px] border-[#A7D200] shadow-md border-radius-50"
                    block
                  >
                    Contact
                  </button>
                  <Card className="w-[80%] m-auto border-none my-4 shadow-md">
                    <Statistic
                      title="Support Tickets"
                      value={5000}
                      precision={0}
                      valueStyle={{ color: "#A7D200" }}
                      // prefix={<ArrowUpOutlined />}
                      // suffix="%"
                    />
                  </Card>
                  <Card className="w-[80%] m-auto border-none my-4 shadow-md">
                    <Statistic
                      title="Meeting Scheduled"
                      value={50000}
                      precision={0}
                      valueStyle={{ color: "#A7D200" }}
                      // prefix={<ArrowUpOutlined />}
                      // suffix="%"
                    />
                  </Card>

                  {companyId ? (
                    <button
                      disabled={isLoading}
                      className="w-full py-2 my-2 bg-[#dfaf00] hover:bg-[#dfaf00] hover:text-white text-white border-radius-5 text-[16px] text-bold shadow-md border-radius-50"
                      block
                    >
                      {isLoading ? <Spin /> : "Update Changes"}
                    </button>
                  ) : (
                    <button
                      disabled={isLoading}
                      className="w-full py-2 my-2 bg-[#01c4f3] hover:bg-[#01c4f3] hover:text-white text-white border-radius-5 text-[16px] text-bold shadow-md border-radius-50"
                      block
                    >
                      {isLoading ? <Spin /> : "Save Changes"}
                    </button>
                  )}

                  {/* <button
                    type="cancel"
                    className="w-full py-2 my-2 bg-[crimson] hover:bg-[#E3256B] hover:text-white text-white border-radius-5 text-[16px] text-bold shadow-md border-radius-50"
                    block
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default ManageCompany;
