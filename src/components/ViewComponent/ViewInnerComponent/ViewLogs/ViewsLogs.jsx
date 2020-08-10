import React from "react";
import moment from "moment";
import { Col } from "reactstrap";
import { Table } from 'antd';
import Column from "./ViewLogsColumn"

const ViewsLogsComponent = ({ticketInformation}) => {
    const column = Column();
    const tableData = [];
    if( ticketInformation !== undefined && ticketInformation.ticketLogs !== undefined ){
        ticketInformation.ticketLogs.map((item,index) => {
            tableData[index] = {};
            tableData[index].key = index + 1;
            tableData[index].type = item.type;
            tableData[index].action = item.message;
            tableData[index].createdAt = moment(item.createdAt).format("HH:mm DD.MM.YYYY");
            tableData[index].userType = item.userType;
        })
    }
    return(
        <>
            <Col md="6">
                <div className="passengers-information-heading-container">
                    <h3 className="markdown-header">Logs</h3>
                    <Table
                        columns={column}
                        dataSource={tableData}
                        bordered
                        className="tickets-table-container"
                        pagination={false}
                    />
                </div>
            </Col>
        </>
    )
};

export default ViewsLogsComponent