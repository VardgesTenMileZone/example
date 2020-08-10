import React, {useState,useEffect} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {Form, Upload, message, Select, Button, Input} from "antd";
import  LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import  PlusOutlined from '@ant-design/icons/PlusOutlined';
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import { FetchedMountain } from "../../store/actions/fetchedMountain";
import { addMountainNotification } from "../../store/actions/deleteDiscount";
import "../CommissionComponent/Commission.scss"


const AddNotification = ({ form, mountainList, fetchedMountain, addMountainNotification, success, error }) => {
    const [state,setState] = useState({
        loading: false,
        mountain:""
    });

    useEffect(() => {
        fetchedMountain()
    },[])

    const { Option } = Select;

    const { TextArea } = Input;

    const { loading, imageUrl, mountain, text, position, visible, url } = state;

    const { getFieldDecorator } = form;

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setState({
                ...state,
                loading: true
            });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                setState({
                    ...state,
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    const addNotification = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(!err){
                addMountainNotification({
                    mountain: mountain.toUpperCase(),
                    position,
                    text,
                    visible,
                    image:imageUrl,
                    url
                })
            }
        })
    };
    const handleChangeMountain = (value,name) => {
        setState({
            ...state,
            [name]: value
        })
    };
    return(
        <div className="add-notification">
            <div className="notification-header">
                <h2 className="markdown-header">Add Notification</h2>
                <Link to="/notifications"><Button type="primary" >Back</Button></Link>
            </div>

            <Form onSubmit={addNotification}>
                <Form.Item className="add-notification-item" label="Mountain Locations">
                    {getFieldDecorator('mountain', {
                        rules: [{ required: true, message: 'Please select Pickup Locations!' }],
                    })(
                        <Select placeholder="Show me all stops" setFieldsValue={mountain} onChange={(value,name) => handleChangeMountain(value,"mountain")}>
                            { mountainList && mountainList.Items.map((item,index) => {
                                return ( <Option value={item.value} key={index.toString()}>{item.value}</Option> )
                            })}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item className="add-notification-item" label="Position">
                    {getFieldDecorator('position', {
                        rules: [{ required: true, message: 'Please select position' }],
                    })(
                        <Select placeholder="Select position" setFieldsValue={position} onChange={(value,name) => handleChangeMountain(value,"position")}>
                            <Option value="top">Top</Option>
                            <Option value="bottom_1">Bottom_1</Option>
                            <Option value="bottom_2">Bottom_2</Option>
                            <Option value="bottom_3">Bottom_3</Option>
                            <Option value="bottom_4">Bottom_4</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item className="add-notification-item" label="Text">
                    {getFieldDecorator('text', {
                        rules: [{ required: true, message: 'Please leave a text!' }],
                    })(
                        <TextArea rows={4} placeholder="Notification Text" onChange={(event,name) => handleChangeMountain(event.target.value,"text")}/>
                    )}
                </Form.Item>
                <Form.Item className="add-notification-item notification-url" label="Notification Link">
                    <Input type="text" onChange={(event) => handleChangeMountain(event.target.value,"url")}/>
                </Form.Item>
                <Form.Item className="add-notification-item" label="Visible">
                    {getFieldDecorator('visible', {
                        rules: [{ required: true, message: 'Please select position' }],
                    })(
                        <Select placeholder="Select position" setFieldsValue={visible} onChange={(value,name) => handleChangeMountain(value,"visible")}>
                            <Option value={true}>Yes</Option>
                            <Option value={false}>no</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item className="add-notification-item" label="Select Image">
                    {getFieldDecorator('image', {
                        rules: [{ required: true, message: 'Please Select image!' }],
                    })(
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    )}
                </Form.Item>
                <Button htmlType="submit">
                    Submit
                </Button>
            </Form>
            { (success || error) && <SuccessErrorModal success={success} error={error} url="notifications"/> }
        </div>
    )
};

const mapStateToProps = state => ({
    mountainList:state.notification.mountainsListData,
});

const mapDispatchToProps = dispatch => ({
    fetchedMountain: () => dispatch(FetchedMountain()),
    addMountainNotification: (data) => dispatch(addMountainNotification(data))
})

const AddNotificationComponent = Form.create({ name: 'snowgroup_login' })(AddNotification);

export default connect(mapStateToProps,mapDispatchToProps)(AddNotificationComponent)