import React from "react";
import {Form, Input, Select} from "antd";

const MessageComponent = ({ phoneMessage, handleChangeMountain, getFieldDecorator }) => {
    const { TextArea } = Input;
    const { Option } = Select;
    return(
        <>
            <div className="notification-item">
                <Form.Item label="Message Type">
                    {getFieldDecorator('messageType', {
                        rules: [{ required: true, message: 'Please select Message Type!' }],
                    })(
                        <Select placeholder="Message Type" onChange={(value,name) => handleChangeMountain(value,"messageType")}>
                            <Option value="email">Email</Option>
                            <Option value="phone">Phone</Option>
                        </Select>
                    )}
                </Form.Item>
            </div>
            <div className="notification-item">
                <Form.Item>
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please leave a message!' }],
                    })(
                        <TextArea rows={4} placeholder="Your Message" onChange={(event,name) => handleChangeMountain(event,"message")}/>
                    )}
                    {  phoneMessage && <div className="warning-message">
                        You can't write phone message more than 160 charachters.
                    </div>
                    }
                </Form.Item>
            </div>
        </>
    )
};

export default MessageComponent