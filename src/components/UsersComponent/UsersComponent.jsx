import React  from "react";
import UsersTable from "./UsersTable";

const UsersComponent = ({ usersData, getUserByParams, getUsers, individualUserSearch, individualUser }) => {

    return(
        <>
            <div>
               <UsersTable usersData={usersData} getUserByParams={getUserByParams} getUsers={getUsers} individualUserSearch={individualUserSearch} individualUser={individualUser}/>
            </div>
        </>
    )
};

export default UsersComponent