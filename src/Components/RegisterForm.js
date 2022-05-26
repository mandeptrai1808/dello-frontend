import React from 'react'
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { RegisterUser } from '../Redux/Actions/UsersActions';
export default function RegisterForm() {
  const dispatch = useDispatch();
  const finishForm = (value) => {
    dispatch(RegisterUser(value))
  }

  return (
    <div>
        <h1 className='text-3xl text-red'>REGISTER</h1>
          <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={finishForm}
        >
            <Form.Item
            name="name"
            rules={[{ required: true,
                message: "Please input your username!"}]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true,
                type: "email",
                message: "The input is not valid E-mail!"}]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true,
                message: "Please input your phone number!"}]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone"
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
            <Button
              type="danger"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            
          </Form.Item>
        </Form>
    </div>
  )
}
