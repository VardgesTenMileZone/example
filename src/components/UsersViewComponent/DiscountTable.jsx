import React from "react";
import { Button, Table } from "antd";
import moment from "moment";
import "../ViewComponent/ViewComponent.scss"

const DiscountTable = ({ userDiscount, deleteDiscount }) => {
    const discountTableSource = [];
    userDiscount.map((item,index) => {
        discountTableSource[index] = {};
        discountTableSource[index].key = index;
        discountTableSource[index].createdAt = moment(item.createdAt).format("HH:mm DD.MM.YYYY");
        discountTableSource[index].mountain = item.mountain;
        discountTableSource[index].operator = item.operator;
        discountTableSource[index].id = item.id;
        if(item.type === "fixed"){
            discountTableSource[index].value = `${item.value / 100}$`;
        }
        else{
            discountTableSource[index].value = `${item.value}%`;
        }
    }

    );
    const deleteUserDiscount = (id) => {
        deleteDiscount(id)
    };
    const column = [
        {
            title: "Mountain",
            dataIndex: "mountain"
        },
        {
            title: "Operator",
            dataIndex: "operator"
        },
        {
            title: "Value",
            dataIndex: "value"
        },
        {
            title: "Created At",
            dataIndex: "createdAt"
        },
        {
            title: "Action",
            dataIndex: "id",
            render: id => (
                <Button onClick={ () => deleteUserDiscount(id) }>Delete</Button>
            )
        }
    ];
    return(
        <>
            <div className="general-information-container mt-3">
                <h3 className="markdown-header">Discounts</h3>
                <Table
                    dataSource={discountTableSource}
                    bordered
                    className="tickets-table-container"
                    columns={column}
                    pagination={false}
                />
            </div>
        </>
    )
};

export default DiscountTable