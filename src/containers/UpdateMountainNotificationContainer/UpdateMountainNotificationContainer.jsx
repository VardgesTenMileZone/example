import React, {useEffect} from "react";
import { connect } from "react-redux";
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import Spinner from "../../components/SpinnerComponent/SpinnerComponent";
import UpdateMountainNotificationComponent from "../../components/UpdateMountainNotificationComponent/UpdateMountainNotificationComponent";
import { getIndividualNotification, updateNotification } from "../../store/actions/deleteDiscount";
import { FetchedMountain } from "../../store/actions/fetchedMountain";

const UpdateMountainNotificationContainer = ({ location: { search },
                                                 getIndividualNotification,
                                                 individualNotification,
                                                 pending,
                                                 fetchedMountain,
                                                 mountainList,
                                                 updateNotification,
                                                 success,
                                                 error
                                             }) => {
    useEffect(() => {

        const queryString = require("query-string");
        const parsed = queryString.parse(search);
        fetchedMountain();
        getIndividualNotification(parsed.id)
    },[]);
    return(
        <>
            { pending && <Spinner/> }
            <InnerPageComponent>
                <UpdateMountainNotificationComponent
                    individualNotification={individualNotification}
                    mountainList={mountainList}
                    updateNotification={updateNotification}
                    success={success}
                    error={error}
                />
            </InnerPageComponent>
        </>
    )
};

const mapStateToProps = state => ({
    individualNotification: state.book.individualNotification,
    pending: state.book.pending,
    success: state.book.success,
    error: state.book.error,
    mountainList:state.notification.mountainsListData,
});

const mapDispatchToProps = dispatch => ({
    getIndividualNotification: (id) => dispatch(getIndividualNotification(id)),
    fetchedMountain: () => dispatch(FetchedMountain()),
    updateNotification: (data) => dispatch(updateNotification(data))
})


export default connect(mapStateToProps,mapDispatchToProps)(UpdateMountainNotificationContainer)