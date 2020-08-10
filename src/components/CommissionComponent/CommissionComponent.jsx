import React,{ useState } from "react";
import moment from "moment";
import {DatePicker, Form, Button, Table} from "antd";
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import Spinner from "../SpinnerComponent/SpinnerComponent"
import "./Commission.scss"

const CommissionComponent = ({ searchCommission, commission, error, pending }) => {
    const { MonthPicker } = DatePicker;
    const [ state,setState ] = useState({
        year:"",
        month:""
    });
    const { year,month } = state;
    const disabledDate = (current) => {
        const customDate = moment(new Date()).format('YYYY-MM-DD');
        return current && current > moment(customDate, "YYYY-MM-DD");
    };
    const handleChangeMountain = (value,date,name) => {
        const year = moment(value).format("YYYY");
        const month = moment(value).format("MM");
        setState({
            ...state,
            year,
            month
        })
    };
    const search = () => {
        const date = {
            year,
            month
        };
        searchCommission(date)
    };
    const filterData = [];
    const columns = [
        {
            title: "date",
            dataIndex: "date"
        },
        {
            title: "Full Name",
            dataIndex: "fullName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Commission",
            dataIndex: "commission"
        },
    ]
    if(commission !== undefined && commission.data.data){
        commission.data.data.map((item,index) => {
            filterData.push({
                date:item.date,
                commission:`$  ${item.monthlyCommission / 100}`,
                email: item.email,
                key:index,
                fullName: `${item.firstName + " " +  item.lastName}`
            })
        })
    }
    return(
        <>
            <div className="comission-component">
                <h2 className="markdown-header">Commission</h2>
                <div className="search-part">
                    <Form.Item label="Select date">
                        <MonthPicker disabledDate={disabledDate} onChange={(value,date,name) => handleChangeMountain( value,date,"selectedDate")}/>
                    </Form.Item>
                    <Button type="primary" onClick={search}>
                        Search
                    </Button>
                </div>
                { filterData.length > 0 &&   <Table
                    dataSource={filterData}
                    bordered
                    className="tickets-table-container"
                    // title={() => <RenderTableHeader getUserByParams={getUserByParams}/>}
                    columns={columns}
                /> }
            </div>

            { error && <SuccessErrorModal error={error}/> }
            { pending && <Spinner/> }
        </>
    )
};

export default CommissionComponent