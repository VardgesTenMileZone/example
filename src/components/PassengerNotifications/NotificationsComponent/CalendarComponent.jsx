import React from "react";
import {DatePicker, Form} from "antd";
import moment from "moment";

const CalendarComponent = ({ getFieldDecorator, handleChangeMountain }) => {
    const disabledDate = (current) => {
        const customDate = moment(new Date()).format('YYYY-MM-DD');
        return current && current < moment(customDate, "YYYY-MM-DD");
    };
    return(
        <>
            <div className="calendar">
                <Form.Item label="Select date">
                    {getFieldDecorator('datePicker', {
                        rules: [{ required: true, message: 'Please select where are you going to!' }],
                    })(
                        <DatePicker disabledDate={disabledDate} onChange={(value,date,name) => handleChangeMountain( date,"startDate")}/>
                    )}
                </Form.Item>
            </div>
        </>
    )
};

export default CalendarComponent