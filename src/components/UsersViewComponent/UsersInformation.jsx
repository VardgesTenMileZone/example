import React from "react";
import moment from "moment";
import {Col, Row} from "reactstrap";

const UsersInformation = ({individualUser}) => {
    return(
        <>
            <Col lg="12" xl="6">
                <div className="general-information-container">
                    <h3 className="markdown-header">General Information</h3>
                </div>
                <div className="general-information-table-container">
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Name</p>
                        <p>{individualUser.firstName}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Last Name</p>
                        <p>{individualUser.lastName}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Email</p>
                        <p>{individualUser.email}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Age</p>
                        <p>{individualUser.age}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Sport</p>
                        <p>{individualUser.sport}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Phone</p>
                        <p>{individualUser.phone}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Verified</p>
                        <p>{individualUser.isVerified ? "Yes" : "No"}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">User-Id</p>
                        <p>{individualUser.userId}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Created At</p>
                        <p>{moment(individualUser.createdAt).format("HH:mm DD.MM.YYYY")}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Promo Credits</p>
                        <p>$ {((individualUser.promoBalance) / 100).toFixed(2)}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Regular Credits</p>
                        <p>$ {(individualUser.balance).toFixed(2)}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">User Type</p>
                        <p>{individualUser.type}</p>
                    </div>
                    <div className="general-information-col">
                        <p className="information-tab user-view-name">Total trips</p>
                        <p>{individualUser.tickets.length}</p>
                    </div>
                    { individualUser.type === "agent" && <>
                        <div className="general-information-col">
                            <p className="information-tab user-view-name">Commission</p>
                            <p>{individualUser.commission} %</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab user-view-name">Agent Type</p>
                            <p>{individualUser.agentType}</p>
                        </div>
                    </> }
                </div>
            </Col>
        </>
    )
};

export default UsersInformation