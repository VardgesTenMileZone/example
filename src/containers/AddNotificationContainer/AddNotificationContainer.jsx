import React from "react";
import { connect } from "react-redux";
import Spinner from "../../components/SpinnerComponent/SpinnerComponent"
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import AddNotificationComponent from "../../components/AddNotificationComponent/AddNotificationComponent";

const AddNotificationContainer = ({ pending, success, error }) => {
    return(
        <>
            { pending && <Spinner/> }
            <InnerPageComponent>
                <AddNotificationComponent
                    success={success}
                    error={error}/>
            </InnerPageComponent>
        </>
    )
};

const mapStateToProps = state => ({
    pending: state.book.pending,
    success: state.book.success,
    error: state.book.error,
})

export default connect(mapStateToProps,null)(AddNotificationContainer)