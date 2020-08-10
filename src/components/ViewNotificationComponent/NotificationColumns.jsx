import React from "react";
import {Button, Dropdown, Icon, Menu} from "antd";

const notificationColumn = (handleActionClick) => {
    return [
        {
            title: "Mountain",
            dataIndex: "mountain",
            key: "mountain"
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (status) => <img src={status} className="view-notification-image"/>
        },
        {
            title: "Text",
            dataIndex: "text",
            key: "text"
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "position"
        },
        {
            title: "Visible",
            dataIndex: "visible",
            key: "visible"
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
    ]
};

export default notificationColumn