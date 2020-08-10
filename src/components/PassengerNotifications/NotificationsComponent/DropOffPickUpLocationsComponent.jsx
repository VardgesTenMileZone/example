import React from "react"
import {Form, Select} from "antd";

const DropOffPickUpLocationsComponent = ({ getFieldDecorator, stops, handleChangeMountain }) => {
    const { Option } = Select;
    return(
        <>
            <div className="notification-item">
                <Form.Item label="Pickup Locations">
                    {getFieldDecorator('pickup', {
                        rules: [{ required: true, message: 'Please select Pickup Locations!' }],
                        getValueFromEvent:(value) => handleChangeMountain(value,"pickup")
                    })(
                        <Select placeholder="Show me all stops" mode="multiple" onChange={(value,name) => handleChangeMountain(value,"pickup")}>
                            {stops.dep.pickup !== null && <Option key="all" value="all">All Locations</Option> }
                            {stops.dep.pickup !== null && stops.dep.pickup.map((item,index) => {
                                return(
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })}
                        </Select>
                    )}
                </Form.Item>
            </div>
        </>
    )
};

export default DropOffPickUpLocationsComponent