import React,{ useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import {Button, Table} from "antd";
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import notificationColumn from "./NotificationColumns";
import {Link} from "react-router-dom";
import "../../components/PassengerNotifications/PassengerNotification.scss"

const ViewNotificationComponent = ({
                                       mountainNotificationsData,
                                       mountainNotifications,
                                       deleteMountainNotification,
                                       success,
                                       error}) => {
    const [state,setState] = useState({
        mountainNotification: []
    });
    const filterData = [];
    const { mountainNotification } = state;
    useEffect(() => {
        if (mountainNotificationsData) {
            let notificationData = mountainNotification;
            if (mountainNotification.length > 0) {
                const filterItem = mountainNotification.find(i => i.id === mountainNotificationsData.Items[0].id);
                if (!filterItem) {
                    notificationData = notificationData.concat(mountainNotificationsData.Items);
                }
            } else{
                notificationData = notificationData.concat(mountainNotificationsData.Items);
            }


            setState({
                ...state,
                mountainNotification: notificationData
            })
        }

    },[mountainNotificationsData]);

    const handleInfiniteOnLoad = () => {
        mountainNotifications({
            LastEvaluatedKey: {
                id: mountainNotification[mountainNotification.length -1].id,
                provider: "SNOWBUS"
            }
        })
    };

    if (mountainNotification && mountainNotification.length > 0) {
        mountainNotification.map((item,index) => {
            filterData.push({
                text: item.text,
                image: item.image,
                position: item.position,
                mountain: item.mountain,
                key: index.toString(),
                visible: item.visible ? "Yes" : "No",
                action: [
                    {
                        name: "Update",
                        id: item.id
                    },
                    {
                        name: "Remove",
                        id: item.id
                    }
                ]
            })
        })
    }

    const handleActionClick = (name,id) => {
        if (name === "Remove") {
            deleteMountainNotification(id)
        } if (name === "Update") {
            window.location.href=`/update-notification?id=${id}`
        }
    };
    const columns = notificationColumn(handleActionClick);

    return(
        <>
            <div className="mountain-notification">
                <div className="notification-header">
                    <h2 className="markdown-header">Notification</h2>
                    <Link to="/add-notifiy"><Button type="primary" >Add Notification</Button></Link>
                </div>

                <InfiniteScroll
                    initialLoad={false}
                    loadMore={handleInfiniteOnLoad}
                    hasMore={true}
                    threshold={20}
                    useWindow={false}
                >
                    <Table
                        dataSource={filterData}
                        bordered
                        className="tickets-table-container"
                        columns={columns}
                        pagination={false}
                    />
                </InfiniteScroll>
            </div>
            { (success || error) && <SuccessErrorModal success={success} error={error}/> }
        </>
    )
};

export default ViewNotificationComponent