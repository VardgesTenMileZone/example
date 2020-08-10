import React from "react";
import {Button, Dropdown, Icon, Menu} from "antd";

const columnReturn = (handleActionClick) => {
    return [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key:'action',
            render: status => (
                <Dropdown className="d-flex align-items-center" trigger={['click']} overlay={() => (
                    <Menu>
                        {
                            status.map((item,index) => (
                                <Menu.Item onClick={() => handleActionClick(item.name,item.id,item.type)} key={index}>{item.name}</Menu.Item>
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
}

export default columnReturn