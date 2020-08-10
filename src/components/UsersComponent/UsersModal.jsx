import React, {useState} from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import "./UsersTable.scss"

const UsersModalComponent = ({ stateParent, form, handleActionClick, sendCreditsDataAction, modifyUserType, individualUser }) => {
    const { getFieldDecorator } = form;
    const { Option } = Select;
    const [ state,setState ] = useState({
        modifyModal:false,
        creditsModal:false,
        type:"promo",
        userType:individualUser ? individualUser.type : "",
        agentType:"",
        commission:null
    });
    const { modifyModal, creditsModal, userId } = stateParent;
    const { type, commission } = state;
    const sendCreditsData = (e) => {
        e.preventDefault();
        form.validateFields((err) => {
            if ( !err ) {
                const sendData = {
                    userId:stateParent.userId,
                    type:state.type,
                    value:(Number(state.creditsAmount) * 100)
                };
                sendCreditsDataAction(sendData);
                handleActionClick("Add Credits")
            }
        });
    };

    const selectType = (name,value) => {
        setState({
            ...state,
            [name]:value
        })
    };
    const handleChange = (event) => {
        const { name,value } = event.target;
        setState({
            ...state,
            [name]:value
        })
    };
    const modifyUserAction = () => {
        const data = {
            type:state.userType,
            userId:userId,
        };
        data.type = state.userType ? state.userType : individualUser.type;
        if(data.type === "agent"){
            data.agentType = state.agentType;
            if(commission === null){
                data.commission = individualUser.commission
            }
            else if (commission === ""){
                data.commission = 0
            }
            else {
                data.commission = Number(commission)
            }
        }
        modifyUserType(data);
        handleActionClick("Modify")
    };
    return(
        <>
            <Modal
                title="Basic Modal"
                visible={modifyModal}
                onOk={() => handleActionClick("Modify")}
                onCancel={() => handleActionClick("Modify")}
                className="modify-modal"
                footer={[
                    <Button key="back" onClick={() => handleActionClick("Modify")}>
                        Close
                    </Button>,
                    <Button key="submit" onClick={modifyUserAction}>
                        Submit
                    </Button>
                ]}
            >
            <Form.Item label="Select User type" className="credits">
                <Select placeholder="Select type" value={state.userType === "" ? stateParent.userType : state.userType } onChange={ (value) => selectType("userType",value) }>
                    <Option value="agent">Agent</Option>
                    <Option value="user">User</Option>
                </Select>
            </Form.Item>
            { individualUser && ((stateParent.userType === "agent" && state.userType === "") || state.userType === "agent") && <>
                <Form.Item label="Commission %" className="credits">
                    <Input type="number" name="commission" value={commission === null ? individualUser.commission : commission} onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="Agent Type" className="agent-type">
                    <Select placeholder="Select agent type" defaultValue={ individualUser.agentType ? individualUser.agentType : "Tour Operator" } onChange={ (value) => selectType("agentType",value) }>
                        <Option value="Tour Operator">Tour Operator</Option>
                        <Option value="Hotel">Hotel</Option>
                        <Option value="Concierge">Concierge</Option>
                        <Option value="Representative">Representative</Option>
                        <Option value="private">Private</Option>
                    </Select>
                </Form.Item>
            </>
            }
            </Modal>
            <Modal
                title="Add Credits"
                visible={creditsModal}
                onOk={() => handleActionClick("Add Credits")}
                onCancel={() => handleActionClick("Add Credits")}
                footer={[
                    <Button key="back" onClick={() => handleActionClick("Add Credits")}>
                        Close
                    </Button>,
                    <Button key="submit" htmlType="submit" form="my-form">
                        Submit
                    </Button>
                ]}
            >
                <div className="modal-body">
                    <Form onSubmit={(e) => sendCreditsData(e)} id="my-form">
                        <Form.Item label="Select Credits type" className="credits">
                            <Select placeholder="Select type" value={type} onChange={ (value) => selectType("type",value) }>
                                <Option value="promo">Promo</Option>
                                <Option value="general">General</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Write credits amount" className="credits">
                            {getFieldDecorator('creditsAmount', {
                                rules: [{ required: true, message: 'Please write an amount!' }],
                            })(
                                <Input type="number" name="creditsAmount" onChange={ handleChange }/>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
};

const UsersModal = Form.create({ name: 'snowgroup_login' })(UsersModalComponent);

export default UsersModal