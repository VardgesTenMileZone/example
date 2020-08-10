import React from "react";
import {Form, Select} from "antd";

const LeavingFromToComponent = ({ mountainList, to, mountain, handleChangeMountain, getFieldDecorator, from }) => {
    const { Option } = Select;
    let leavingItems;
    let toItems;
    const mountainFilterItems = mountainList &&  mountainList.Items.find(i => i.value === mountain);
    const leavingFromItems = () => {
        leavingItems = mountainFilterItems && mountainFilterItems.leavingFrom.map((item) => {
            if(item.value !== "Banff" && to === ""){
                return  (
                    <Option key={item.key}>{item.value}</Option>
                )
            }
        })
        if (to !== ""){
            const filteredItems = mountainList.Items.find(i => i.leavingFrom.find(j => [to].includes(j.key)));
            leavingItems = mountainList && filteredItems.leavingFrom.map((mountain) => (
                <Option key={mountain.key}>{mountain.value}</Option>
            ))
        }
        return leavingItems
    };
    const goingToItems = () => {
        toItems = mountainFilterItems && mountainFilterItems.leavingFrom.map((item) => {
            if(item.value !== "Banff" && from === ""){
                return  (
                    <Option key={item.key}>{item.value}</Option>
                )
            }
        });
        if(from !== ""){
            const filteredItems = mountainList.Items.find(i => i.leavingFrom.find(j => [from].includes(j.key)));
            toItems = mountainList && filteredItems.leavingFrom.map((mountain) => (
                <Option key={mountain.key}>{mountain.value}</Option>
            ))
        }
        return toItems
    };
    return(
        <>
            <div className="mountainList">
                <Form.Item label="Mountain">
                    <Select placeholder="Select Mountain" title="Select Mountain" value={mountain} onChange={(value,name) => handleChangeMountain(value,"mountain")}>
                        {mountainList && mountainList.Items.map((item,index) => {
                            return(
                                <Option value={ item.value } key={index}>{ item.value }</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </div>
            <div className="notification-item">
                <Form.Item label="Leaving From">
                    {getFieldDecorator('from', {
                        rules: [{ required: true, message: 'Please select from where are you going!' }],
                    })(
                        <Select placeholder="From" onChange={(value,name) => handleChangeMountain(value,"from")}>
                            {leavingFromItems()}
                        </Select>
                    )}
                </Form.Item>
            </div>
            <div className="notification-item">
                <Form.Item label="Leaving To">
                    {getFieldDecorator('to', {
                        rules: [{ required: true, message: 'Please select where are you going to!' }],
                    })(
                        <Select placeholder="To" required onChange={(value,name) => handleChangeMountain(value,"to")}>
                            {goingToItems()}
                        </Select>
                    )}
                </Form.Item>
            </div>
        </>
    )
};

export default LeavingFromToComponent