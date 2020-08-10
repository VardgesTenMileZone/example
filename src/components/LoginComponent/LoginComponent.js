import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './loginComponent.scss'

const LoginComponent = ({ form, loginAction }) => {
    const { getFieldDecorator } = form;

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                loginAction(values)
            }
        });
    };

    return (
        <div className="login-component">
            <div className="login-form-container">
                <h2 className="login-container-heading">LOGIN</h2>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const WrappedLoginForm = Form.create({ name: 'snowgroup_login' })(LoginComponent);

export default WrappedLoginForm;