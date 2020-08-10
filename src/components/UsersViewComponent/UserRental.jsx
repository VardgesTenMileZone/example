import React from "react";
import {Table} from "antd";

const UserRental = ({ individualUser }) => {
    const rentalName = ["rental-skies","rental-snowboards"];
    const rentalTrips = individualUser.products.filter(i => rentalName.includes(i.type));
    const dataTable = [];
    rentalTrips.map((item) => {
        dataTable.push({
            productType: item.type,
            name: item.Item.name,
            from: item.fromDate,
            to: item.toDate,
            quantity: item.quantity,
            amount: `$${(item.totalAmount).toFixed(2)}`
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
            title: "Quantity",
            dataIndex: "quantity"
        },
        {
            title: "Amount",
            dataIndex: "amount"
        }
    ];

    return(
        <>
            <div className="general-information-container mt-3">
                <h3 className="markdown-header">Rentals Passes</h3>
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

export default UserRental