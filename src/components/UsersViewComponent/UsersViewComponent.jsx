import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import { Button } from "antd";
import UsersModal from "../UsersComponent/UsersModal";
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import UsersInformation from "./UsersInformation";
import UserProduct from "./UserProducts";
import UserTicketComponent from "./UserTicketComponent";
import { sendCreditsData } from "../../store/actions/sendCreditsData";
import { modifyUserType } from "../../store/actions/modifyUserType";
import { deleteDiscount } from "../../store/actions/deleteDiscount";
import '../ViewComponent/ViewComponent.scss'

const UsersViewComponent = ({ individualUser,
                                success,
                                deleteDiscount,
                                userDiscount,
                                error,
                                modifyUser,
                                sendCreditsDataAction,
                                modifyUserType}) => {
    const [ state, setState ] = useState({
        modifyModal:false,
        creditsModal:false,
    });
    const { modifyModal, creditsModal } = state;
    const  handleActionClick = (type) => {
        if(type === "Modify"){
            setState({
                ...state,
                modifyModal:!modifyModal,
                userId:individualUser.userId,
                userType:individualUser.type
            })
        }
        if(type === "Add Credits"){
            setState({
                ...state,
                creditsModal:!creditsModal,
                userId:individualUser.userId,
            })
        }
    };
    return(
        <>
            <div className="usersView ticket-view-container">
                <div className="user-view-header">
                    <h2 className="markdown-header">User View</h2>
                    <div className="button-collection">
                        <Button type="primary" onClick={() => handleActionClick("Modify")}>Modify</Button>
                        <Button type="primary" onClick={() => handleActionClick("Add Credits")}>Add Credits</Button>
                        <Link to={`/users/discount?id=${individualUser ? individualUser.userId : ""}`}><Button type="primary" >Add Discount</Button></Link>
                    </div>
                </div>
                <Row>
                    {individualUser && <>
                        <Col md="12">
                            <Row>
                                <UsersInformation individualUser={individualUser}/>
                                <UserProduct individualUser={individualUser} userDiscount={userDiscount} deleteDiscount={deleteDiscount}/>
                            </Row>
                            { individualUser.tickets.length > 0 && <UserTicketComponent tickets={individualUser.tickets}/> }
                    </Col>
                    </> }
                </Row>
                <UsersModal  handleActionClick={handleActionClick}
                             sendCreditsDataAction={sendCreditsDataAction}
                             success={success}
                             error={error}
                             modifyUserType={modifyUserType}
                             modifyUser={modifyUser}
                             stateParent={state}
                             individualUser={individualUser}
                />
                { (error || success) && <SuccessErrorModal error={error} success={success}/> }
            </div>
        </>
    )
};

const mapStateToProps = state => ({
    modifyUser:state.findTrips.modifyUser,
    success:state.findTrips.success,
    error:state.findTrips.error,
    pending:state.notification.pending
});

const mapDispatchToProps = dispatch => ({
    sendCreditsDataAction: (data) => dispatch(sendCreditsData(data)),
    modifyUserType: (data) => dispatch(modifyUserType(data)),
    deleteDiscount: (id) => dispatch(deleteDiscount(id))
});

export default connect(mapStateToProps,mapDispatchToProps) (UsersViewComponent)