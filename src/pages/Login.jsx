import React, { useState, useEffect } from "react";
import { Col, Form, Input, Row, Spin } from "antd";
import { login } from "./../service/authService";
import { localStorageSetItem } from "../constants/LocalStorageManagement";
import { useNavigate } from "react-router-dom";
import { localStorageGetItem } from "./../constants/LocalStorageManagement";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const navigateTo = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      username: "ADMIN",
      password: "12345",
    });
  }, []);

  const onFinish = (values) => {
    loginFunction(values);
  };

  const loginFunction = async (values) => {
    setIsLoading(true);
    // navigateTo("/admin/dashboard");
    const data = {
      userName: values.username,
      password: values.password,
    };
    const response = await login(data);
    if (response.status === 200) {
      if (response.data.outletModal && response.data.roleModal) {
        localStorageSetItem("outlet", response.data.outletModal);
        localStorageSetItem("role", response.data.roleModal);
        navigateTo("/admin/dashboard");
      }
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-white p-6 h-[100vh] login-container shadow-sm p-5">
      <Row
        gutter={{
          xs: 8,
          sm: 32,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" md={8} sm={24}></Col>
        <Col className="gutter-row" md={8} sm={24}>
          <div
            className="bg-white rounded-xl"
            style={{
              alignItems: "center",
              marginTop: "5%",
              padding: "50px 25px",
            }}
          >
            <p
              className="text-center text-[black] text-[34px] fw-700 w-[100%] py-2"
              style={{ margin: "1% 0" }}
            >
              {/* Springs of Al Mawaleh */}
            </p>
            <p
              className="text-center text-[black] text-[30px] fw-500 w-[100%] py-2"
              style={{ margin: "15% 0" }}
            >
              Welcome
            </p>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValue={{ type: "type_1" }}
            >
              <Form.Item
                label=""
                name="username"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              // ]}
              >
                <Input
                  placeholder="Type your username"
                  className="bg-white shadow-md w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-50 py-2 px-2 pl-4"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                label=""
                name="password"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              >
                <Input.Password
                  className="bg-white shadow-md w-[100%] flex items-center border-[1px] border-[#6A6D6C]  border-radius-50 py-2 px-2 pl-4 pr-4"
                  placeholder="Type your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                className="w-[100%] text-right m-0 p-0"
                valuePropName="checked"
                style={{ marginTop: "-20px", marginBottom: "20px" }}
              >
                {/* <label className="w-[100%] cursor-[pointer] text-right m-0 p-0 text-underline">
                  Forgot password?
                </label> */}
              </Form.Item>

              <Form.Item>
                <button
                  type="primary"
                  htmlType="submit"
                  className="w-[100%] shadow-md text-center bg-[#01c4f3] border-radius-50 text-[white] text-[16px] text-bold p-2"
                >
                  {
                    !isLoading ?
                      "Login" :
                      <Spin />
                  }
                </button>
              </Form.Item>
            </Form>
            {/* <p className="text-center text-[16px] w-[100%] py-2">
              Don't have an account?{" "}
              <span className="text-center text-[16px] w-[100%] py-2 text-underline cursor-[pointer] text-[#01c4f3]">
                Register Now
              </span>
            </p> */}
          </div>
        </Col>
        <Col className="gutter-row" span={8}></Col>
      </Row>
    </div>
  );
};

export default Login;
