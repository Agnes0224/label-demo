import React from 'react'
import { useDispatch } from 'react-redux'
// import { loginSuccess } from './AuthSlice'
import { login } from './action'
import { Form, Input, Button } from 'antd'
// import { http } from "../../api/server"

const LoginPage = () => {
    const dispatch = useDispatch();

    //提交登录表单
    const onFinish = async (values) => {
        // try {
        //     const userData = {
        //         username: values.username,
        //         password: values.password
        //     }
        //     const response = await http.post('/login', userData)
        //     if (response.data.code === 200) {
        //         console.log(response.data.data.token)
        //         dispatch(login({ response.data.data }));
        //     } else {
        //         console.log('登录失败', response.data.message)
        //     }
        // } catch (error) {
        //     console.error('登录请求失败:', error)
        // }
        const { username, password } = values
        dispatch(login(username,password))
    }

  return (
    <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
            Login
            </Button>
        </Form.Item>
    </Form>
  );
};

export default LoginPage;
