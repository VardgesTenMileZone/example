import React from "react";
import {Button, Dropdown, Icon, Menu, Tag} from "antd";

const TicketsColumn = ( handleActionClick ) => {
    return  [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Adult',
            dataIndex: 'adult',
        },
        {
            title: 'Confirmation Code',
            dataIndex: 'confCode',
        },
        {
            title: 'Paid Amount',
            dataIndex: 'stripeAmount',
        },
        {
            title: 'Member',
            dataIndex: 'member',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (
                <Tag color={status === 'cancelled' ? 'orange' : status === 'success' ? 'green' : 'red'}>{status}</Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: status => (
                <Dropdown className="d-flex align-items-center" trigger={['click']} overlay={() => (
                    <Menu>
                        {
                            status.map((item, index) => (
                                <Menu.Item onClick={() => handleActionClick(item.name, item.id)} key={index}>{item.name}</Menu.Item>
                            ))
                        }
                    </Menu>
                )}>
                    <Button>
                        Action <Icon type="down" />
                    </Button>
                </Dropdown>
            )
        },
    ];
};

export default TicketsColumn