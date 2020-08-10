import React from "react";
import {Button, Dropdown, Icon, Menu, Tag} from "antd";

const column = ( handleActionClick ) => {
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
            title: 'Date',
            dataIndex: 'date',
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

export default column;