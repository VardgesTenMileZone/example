import React, { useEffect } from "react";
import { connect } from "react-redux";
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import ViewNotificationComponent from "../../components/ViewNotificationComponent/ViewNotificationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent"
import { mountainNotifications, deleteMountainNotification } from "../../store/actions/deleteDiscount";

const ViewNotificationsContainer = ({
                                        mountainNotifications,
                                        mountainNotificationsData,
                                        pending,
                                        deleteMountainNotification,
                                        success,
                                        error}) => {
    useEffect(() => {
        mountainNotifications()
    },[]);
    return (
        <>
            { pending && <SpinnerComponent/> }
            <InnerPageComponent>
                <ViewNotificationComponent
                    mountainNotificationsData={mountainNotificationsData}
                    mountainNotifications={mountainNotifications}
                    deleteMountainNotification={deleteMountainNotification}
                    success={success}
                    error={error}/>
            </InnerPageComponent>
        </>
    )
};

const mapStateToProps = state => ({
    mountainNotificationsData: state.book.mountainNotification,
    pending: state.book.pending,
    success: state.book.success,
});

const mapDispatchToProps = dispatch => ({
    mountainNotifications: (data) => dispatch(mountainNotifications(data)),
    deleteMountainNotification: (id) => dispatch(deleteMountainNotification(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(ViewNotificationsContainer)