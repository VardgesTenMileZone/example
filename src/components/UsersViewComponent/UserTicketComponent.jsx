import React from "react";
import {Button, Dropdown, Icon, Menu, Table, Tag} from "antd";
import {Col, Row} from "reactstrap";

const UserTicketComponent = ({ tickets }) => {
    const column = [
        {
            title: "Full Name",
            dataIndex: "fullName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Payment Type",
            dataIndex: "paymentType"
        },
        {
            title: "Date",
            dataIndex: "date"
        },
        {
            title: "Adult",
            dataIndex: "adult"
        },
        {
            title: "Confirmation Code",
            dataIndex: "confirmCode"
        },
        {
            title: "Paid Amount",
            dataIndex: "amount"
        },
        {
            title: "Member",
            dataIndex: "member"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: status => (
                <Tag color={status === 'cancelled' ? 'orange' : status === 'success' ? 'green' : 'red'}>{status}</Tag>
            )
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: status => (
                <Dropdown className="d-flex align-items-center" trigger={['click']} overlay={() => (
                    <Menu>
                        {
                            status.map((item,index) => (
                                <Menu.Item onClick={() => handleActionClick(item.name,item.id)} key={index}>{item.name}</Menu.Item>
                            ))
                        }
                    </Menu>
                )}>
                    <Button>
                        Action <Icon type="down" />
                    </Button>
                </Dropdown>
            )
        }
    ];
    const handleActionClick = (name,id) => {
        if(name === "View"){
            window.location.href = `/tickets/view?id=${id}`
        }
    }
    const dataTable = [];
    tickets.map((item) => {
        dataTable.push({
            fullName: item.passengers[0].firstName + ' ' + item.passengers[0].lastName,
            email: item.baseEmail,
            paymentType: item.snowPass ? 'SnowPass' : item.useCredits ? 'Credit' : 'Credit Card',
            date: item.date,
            adult: item.adult,
            confirmCode: item.confirmationNumber,
            amount: item.ticketPrice ? `$${(item.ticketPrice / 100).toFixed(2)}` : (item.amountForStripe / 100).toFixed(2),
            member: item.userId ? 'yes' : 'no',
            status: item.status ? item.status.toLowerCase() : 'Not Found',
            action: [
                {
                    name: "View",
                    id: item.uuid
                }
            ]
        })
    });
    return(
        <>
            <Row className="mt-4">
                <Col md="12">
                    <div className="general-information-container">
                        <h3 className="markdown-header">Tickets</h3>
                    </div>
                    <Table
                        dataSource={dataTable}
                        columns={column}
                        bordered
                        className="tickets-table-container"
                        pagination={false}
                    />
                </Col>
            </Row>
        </>
    )
};

export default UserTicketComponent