import React, { useEffect } from "react";
import { connect } from "react-redux"
import UsersComponent from "../../components/UsersComponent/UsersComponent";
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import Spinner from "../../components/SpinnerComponent/SpinnerComponent"
import { getUsers } from "../../store/actions/getUsers";
import { getUserByParams } from "../../store/actions/getUserByParams";

const UsersContainer = ({ getUsers, usersData, getUserByParams, pending, individualUserSearch, individualUser }) => {
    useEffect(() => {
        getUsers()
    },[]);
    return(
        <>
            { pending && <Spinner/> }
            <InnerPageComponent>
                <UsersComponent
                    usersData={usersData}
                    getUserByParams={getUserByParams}
                    getUsers={getUsers}
                    individualUserSearch={individualUserSearch}
                    individualUser={individualUser}
                />
            </InnerPageComponent>
        </>
    )
};

const mapStateToProps = state => ({
    usersData:state.findTrips.usersData,
    pending:state.findTrips.pending,
    individualUserSearch:state.findTrips.individualUserSearch,
    individualUser:state.findTrips.individualUser,
});

const mapDispatchToProps = dispatch => ({
    getUsers: (data) => dispatch(getUsers(data)),
    getUserByParams: (searchdata) => dispatch(getUserByParams(searchdata))
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersContainer)