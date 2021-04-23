import React from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import PublicLayout from './public-layout';
import API from '../common/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const onFinish = async (values, history, setUser) => {
  const [err, data] = await API.post('users/login/', values);
  if (err) {
    return message.error(err.msg || err.error.msg || 'Something went wrong');
  }
  message.success(`User ${data.user.username} has logged in successfully`);
  localStorage.setItem('auth-token', data.token);
  setUser(data.user);
  if (data.user.isAdmin) {
    history.push('/admin');
  } else {
    history.push('/user-dashboard');
  }
};

const Login = ({ setUser }) => {
  const history = useHistory();

  return (
    <PublicLayout>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values, history, setUser)}
        layout="vertical"
      >
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
                Login
              </Button>
            </Col>
            <Col span={12}>
              <Link to="/signup">
                <Button block>Register</Button>
              </Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </PublicLayout>
  );
};

export default Login;
