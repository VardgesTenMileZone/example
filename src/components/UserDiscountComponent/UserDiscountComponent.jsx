import React, {useEffect, useState} from "react";
import {Form, Select, Input, Button} from 'antd';
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import "../PassengerNotifications/PassengerNotification.scss"

const UserDiscount = ({ mountainList, success, error, getOperators, operatorsData, addDiscount, userId, form }) => {
    const { getFieldDecorator } = form;
    const { Option } = Select;
    const [ state,setState ] = useState({
        mountain:"",
        amount:""
    });

    const { mountain } = state;
    useEffect(() => {
        if(mountain !== ""){
            getOperators(mountain)
        }
    },[mountain]);

    const handleChange = (name,value) => {
        setState({
            ...state,
            [name]: value
        })
    };
    const sendDiscount = (e) => {
        e.preventDefault();
        const sendingData = {
            userId:userId,
            mountain: state.mountain,
            operator: state.operator,
            type: state.type,
            value: Number(state.amount)
        };
        if(state.type === "fixed"){
            sendingData.value = sendingData.value * 100
        }
        form.validateFields((err) => {
            if ( !err ){
                addDiscount(sendingData)
            }
        })
    };
    return(
        <>
            <div className="discount-component">
                <h2 className="markdown-header">Add Discount</h2>
                    <div className="notification-data">
                        <Form onSubmit={ sendDiscount }>
                            <div className="notification-item">
                                <Form.Item label="Mountain">
                                    {getFieldDecorator('mountain', {
                                        rules: [{ required: true, message: 'Please select mountain!' }],
                                    })(
                                        <Select placeholder="Select mountain" onChange={ (value) => handleChange("mountain",value) }>
                                            { mountainList !== undefined && mountainList.Items.map((item,index) => (
                                                <Option key={index} value={item.name.toUpperCase()}>
                                                    {item.value}
                                                </Option>
                                            )) }
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="notification-item">
                                <Form.Item label="Operator">
                                    {getFieldDecorator('operator', {
                                        rules: [{ required: true, message: 'Please select operator!' }],
                                    })(
                                        <Select placeholder="Select Operator" onChange={ (value) => handleChange("operator",value) }>
                                            { operatorsData !== undefined && operatorsData.map((item,index) => (
                                                <Option key={index} value={item.name}>
                                                    { item.operatorDisplayName }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="notification-item">
                                <Form.Item label="Type">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: 'Please select type!' }],
                                    })(
                                        <Select placeholder="Select Type" onChange={ (value) => handleChange("type",value) }>
                                            <Option value="percent">
                                                Percent
                                            </Option>
                                            <Option value="fixed">
                                                Fixed
                                            </Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="notification-item">
                                <Form.Item label="Amount">
                                    {getFieldDecorator('amount', {
                                        rules: [{ required: true, message: 'Please select type!' }],
                                    })(
                                        <Input name="amount" placeholder="Write an amount" type="number" onChange={ (event) => handleChange("amount",event.target.value) }/>
                                    )}
                                </Form.Item>
                            </div>
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Form>
                    </div>
                { (error || success) && <SuccessErrorModal error={error} success={success} url={ `users/view?id=${userId}`}/> }
            </div>
        </>
    )
};

const UserDiscountComponent = Form.create({ name: 'snowgroup_login' })(UserDiscount);

export default UserDiscountComponent
