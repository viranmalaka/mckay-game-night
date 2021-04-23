import React from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { Link } from 'react-router-dom';
import PublicLayout from './public-layout';
import API from '../common/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const onFinished = async (values) => {
  const [err, data] = await API.post('users/', values);
  if (err) {
    return message.error(err.msg || err.error.msg || 'Something went wrong');
  }
  message.success(`User ${data.newUser.username} has created successfully. please log in`);
};

const Signup = () => {
  return (
    <PublicLayout>
      <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinished} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Row>
            <Col span={12}>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Col>
            <Col span={12}>
              <Link to="/login">
                <Button block>Login</Button>
              </Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </PublicLayout>
  );
};

export default Signup;
