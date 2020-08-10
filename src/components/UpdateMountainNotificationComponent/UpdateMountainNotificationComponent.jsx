import React, {useEffect, useState} from "react";
import {Form, Upload, message, Select, Button, Input} from "antd";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import "./UpdateMountainNotification.scss"

const UpdateMountainNotification = ({individualNotification, mountainList, updateNotification, success, error}) => {
    const [ state, setState ] = useState({
        loading: false,
        textError:false
    });

    const { mountain, position, text, imageUrl, loading, textError, visible, url } = state;

    const { Option } = Select;

    const { TextArea } = Input;

    useEffect(() => {
        if(individualNotification){
            const data = {
                id: individualNotification.id,
                image: individualNotification.image,
                position: individualNotification.position,
                text: individualNotification.text,
                visible: individualNotification.visible,
                url: individualNotification.url,
            };
            if (data.url === "none") {
                data.url = ""
            }
            let mountainName = individualNotification.mountain.toLowerCase();
            mountainName = mountainName.charAt(0).toUpperCase() + mountainName.slice(1);
            data.mountain = mountainName;
            individualNotification && setState(data);
        }

    },[individualNotification]);

    const updateNotificationItem = (e) => {
        e.preventDefault();
        const updateData = {
            id: individualNotification.id,
            visible: individualNotification.visible,
        };
        if (imageUrl) {
            updateData.image = imageUrl
        } else{
            updateData.image = individualNotification.image
        }
        if (position !== individualNotification.position) {
            updateData.position = position
        }
        if (mountain.toUpperCase() !== individualNotification.mountain) {
            updateData.mountain = mountain
        }
        if (text !== individualNotification.text) {
            updateData.text = text
        }
        if (visible !== individualNotification.visible) {
            updateData.visible = visible
        }
        if (url !== individualNotification.url) {
            updateData.url = url
        }
        if (updateData.url === "") {
            updateData.url = "none"
        }
        if (text === "") {
            setState({
                ...state,
                textError: true
            })
        }
        if (text !== "") {
            setState({
                ...state,
                textError: false
            })
        }
        if (text !== ""){
            updateNotification(updateData)
        }
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

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChange = (name,value) => {
        setState({
            ...state,
            [name]: value
        })
    };
    const uploadButton = (
        <div className="edit-photo">
            {loading ? <LoadingOutlined /> : <img src={ state.image } alt=""/>}
        </div>
    );
    const handleChangeImage = info => {
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
    return(
        <>
            <div>
                <h2 className="markdown-header">Edit Notification</h2>
                <Form className="Item" onSubmit={updateNotificationItem}>
                    <Form.Item className="add-notification-item edit-notification-item" label="Mountain Locations">
                        <Select value={mountain} placeholder="Mountain" onChange={(value) => handleChange("mountain",value)}>
                            { mountainList && mountainList.Items.map((item,index) => {
                                return (<Option value={item.value} key={index.toString()}>{ item.value }</Option>)
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item className="add-notification-item edit-notification-item" label="Position">
                        <Select value={position} placeholder="Position" onChange={(value) => handleChange("position",value)}>
                            <Option value="top">Top</Option>
                            <Option value="bottom_1">Bottom_1</Option>
                            <Option value="bottom_2">Bottom_2</Option>
                            <Option value="bottom_3">Bottom_3</Option>
                            <Option value="bottom_4">Bottom_4</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="add-notification-item edit-notification-item" label="Visible">
                        <Select value={visible} placeholder="Visible" onChange={(value) => handleChange("visible",value)}>
                            <Option value={true}>Yes</Option>
                            <Option value={false}>No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="add-notification-item edit-notification-item" label="Text" name="text" rules={[{required: true, message: "Please "}]}>
                            <TextArea rows={4} placeholder="Notification Text" value={text} onChange={(event) => handleChange("text",event.target.value)}/>
                        { textError && <div className="required-remainder">Please Leave a message</div> }
                    </Form.Item>
                    <Form.Item className="add-notification-item edit-notification-item notification-url" label="Notification Link">
                        <Input type="text" value={url} onChange={(event) => handleChange("url",event.target.value)}/>
                    </Form.Item>
                    <Form.Item className="add-notification-item edit-notification-item edit-notification-photo" label="Select Image">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChangeImage}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form>
                { (success || error) && <SuccessErrorModal success={success} error={error} url="notifications"/> }
            </div>
        </>
    )
};

const UpdateMountainNotificationComponent = Form.create({ name: 'snowgroup_login' })(UpdateMountainNotification);

export default UpdateMountainNotificationComponent