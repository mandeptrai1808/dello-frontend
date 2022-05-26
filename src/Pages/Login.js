import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  AntDesignOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import RegisterForm from "../Components/RegisterForm";
import { LoginUser } from "../Redux/Actions/UsersActions";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finishLogin = async (value) => {
    const { email, password } = value;
    await dispatch(LoginUser({ email, password }));
    let userData = localStorage.getItem("login_user");
    userData = userData && JSON.parse(userData);
    if (userData) navigate("/home");
  };
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  useEffect(() => {
    if(userData) navigate("/home")
  }, [])

  return (
    <div className="flex">
      <div
        style={{
          backgroundImage:
            "url(https://www.teahub.io/photos/full/301-3012414_beautiful-anime-background.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-2/3 h-screen"
      ></div>
      <div className="px-10 py-5 w-1/3 ">
        <div className="flex justify-center align-middle text-3xl font-bold">
          <AntDesignOutlined /> <p className="ml-3"> DELLO</p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={finishLogin}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or{" "}
            <a
              onClick={() => {
                dispatch({
                  type: "OPEN_DRAWER",
                  content: <RegisterForm />,
                });
              }}
            >
              register now!
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
