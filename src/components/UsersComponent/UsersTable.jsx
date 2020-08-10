import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Table } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import UsersModal from "./UsersModal";
import columnReturn from "./UsersTableColumns";
import RenderTableHeader from "./RenderTableHeader";
import SuccessErrorModal from "../Shared/SuccessErrorModal";
import { sendCreditsData } from "../../store/actions/sendCreditsData";
import { modifyUserType } from "../../store/actions/modifyUserType";
import { getIndividualUser } from "../../store/actions/getIndividualUser";
import "./UsersTable.scss"
import "../TicketsComponent/TicketsComponent.scss"

const UsersTable = ({ usersData, getUserByParams, sendCreditsDataAction, success, error, modifyUserType, modifyUser, getUsers, individualUserSearch, individualUser, getIndividualUser }) => {
    const filterData = [];
    const [ state,setState ] = useState({
        modifyModal:false,
        creditsModal:false,
    });
    const [ data, setData] = useState([]);
    const { modifyModal, creditsModal } = state;
    const  handleActionClick = async (type, id, userType) => {
        if (type === "View"){
            window.location.href = `/users/view?id=${id}`
        }
        if(type === "Modify"){
            if(!modifyModal){
                await getIndividualUser(id)
            }
            setState({
                ...state,
                modifyModal:!modifyModal,
                userId:id,
                userType
            })

        }
        if(type === "Add Credits"){
            setState({
                ...state,
                creditsModal:!creditsModal,
                userId:id
            })
        }
        if(type === "Discounts"){
            window.location.href = `/users/discount?id=${id}`
        }
    };
    if ( data && data.length > 0 ){
        data.map((item,index) => {
                filterData[index] = {};
                filterData[index].key = index;
                filterData[index].firstName = item.firstName;
                filterData[index].lastName = item.lastName;
                filterData[index].type = item.type;
                filterData[index].email = item.email;
                filterData[index].phone = item.phone;
                filterData[index].createdAt = moment(item.createdAt).format("HH:mm DD.MM.YYYY");
                filterData[index].userId = item.userId;
                filterData[index].action = [
                    {
                        name:"View",
                        id:item.userId
                    },
                    {
                        name:"Modify",
                        id:item.userId,
                        type:item.type
                    },
                    {
                        name:"Add Credits",
                        id:item.userId
                    }
                ];
            if(item.type === "agent"){
                filterData[index].action.push({
                    name:"Discounts",
                    id:item.userId,
                    type:item.type
                })
            }

        })
    }
    const handleInfiniteOnLoad = () => {
        if(usersData.LastEvaluatedKey){
            getUsers({
                LastEvaluatedKey: usersData.LastEvaluatedKey
            })
        }
    };
    useEffect(() => {
        if (usersData && !individualUserSearch){
            let users = data;
            users = users.concat(usersData.Items);
            setData(users)
        }
        if(usersData && individualUserSearch){
            setData(usersData)
        }

    },[usersData]);
    const columns = columnReturn(handleActionClick);
    return(
        <>
            <div className="tickets-container">
                <h2 className="markdown-header">Users</h2>
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
                        title={() => <RenderTableHeader getUserByParams={getUserByParams}/>}
                        columns={columns}
                        pagination={false}
                    />
                </InfiniteScroll>
                <UsersModal
                    handleActionClick={handleActionClick}
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
    individualUser:state.findTrips.individualUser,
});

const mapDispatchToProps = dispatch => ({
    sendCreditsDataAction: (data) => dispatch(sendCreditsData(data)),
    modifyUserType: (data) => dispatch(modifyUserType(data)),
    getIndividualUser:id => dispatch(getIndividualUser(id)),
});

export default connect(mapStateToProps,mapDispatchToProps) (UsersTable)

