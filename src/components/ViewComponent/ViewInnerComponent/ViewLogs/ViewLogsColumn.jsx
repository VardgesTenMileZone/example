import React from "react";

const Column = () => {
    return[
        {
            title:"#",
            dataIndex:"key"
        },
        {
            title:"Type",
            dataIndex:"type"
        },
        {
            title:"Action",
            dataIndex:"action",
            render: action => (
               <span dangerouslySetInnerHTML={{ __html: action }}></span>
            ),
        },
        {
            title:"Date",
            dataIndex:"createdAt"
        },
        {
            title:"User Type",
            dataIndex:"userType"
        }
    ]
};

export default Column
