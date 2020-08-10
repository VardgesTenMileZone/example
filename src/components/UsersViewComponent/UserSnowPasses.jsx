import React from "react";
import {Table} from "antd";

const UserSnowPasses = ({ individualUser }) => {
    const snowPasses = individualUser.products.filter(i => i.type === "snowpass");
    const dataTable = [];
    snowPasses.map((item,index) => {
        dataTable.push({
            productType: item.type,
            from: item.Item.from.date,
            to: item.Item.to.date,
            operator: item.Item.operator,
            amount: `$ ${(item.amount / 100).toFixed(2)}`,
            name: item.Item.name,
            key: index,
        })
    });
    const column = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Product Type",
            dataIndex: "productType"
        },
        {
            title: "From(Date)",
            dataIndex: "from"
        },
        {
            title: "To(Date)",
            dataIndex: "to"
        },
        {
            title: "Operator",
            dataIndex: "operator"
        },
        {
            title: "Amount",
            dataIndex: "amount"
        }
    ];

    return(
        <>
            <div className="general-information-container mt-3 mt-xl-0">
                <h3 className="markdown-header">SnowPasses</h3>
                <Table
                    dataSource={dataTable}
                    columns={column}
                    bordered
                    className="tickets-table-container"
                    pagination={false}
                />
            </div>
        </>
    )
};

export default UserSnowPasses