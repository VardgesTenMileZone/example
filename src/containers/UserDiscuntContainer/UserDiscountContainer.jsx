import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import UserDiscountComponent from "../../components/UserDiscountComponent/UserDiscountComponent";
import Spinner from "../../components/SpinnerComponent/SpinnerComponent"
import { FetchedMountain } from "../../store/actions/fetchedMountain";
import { getOperators } from "../../store/actions/getOperators";
import { addDiscount } from "../../store/actions/addDiscount";

const UserDiscountContainer = ({ addDiscount, getOperators, fetchedMountain, mountainList, error, success, operatorsData, pending, location: { search } }) => {
    const [ state,setState ] = useState({})
    useEffect(() => {
        const queryString = require("query-string");
        const parsed = queryString.parse(search);
        fetchedMountain();
        setState({
            ...state,
            userId: parsed.id
        });
    },[]);
    return(
        <>
            { pending &&  <Spinner/> }
            <InnerPageComponent>
                <UserDiscountComponent
                    mountainList={mountainList}
                    getOperators={getOperators}
                    operatorsData={operatorsData}
                    addDiscount={addDiscount}
                    userId={state.userId}
                    success={success}
                    error={error}
                />
            </InnerPageComponent>
        </>
    )
};

const mapStateToProps = state => ({
    mountainList: state.notification.mountainsListData,
    operatorsData: state.notification.operatorsData,
    pending: state.notification.pending,
    error: state.notification.error,
    success: state.notification.success,
});

const mapDispatchToProps = dispatch => ({
    fetchedMountain: () => dispatch(FetchedMountain()),
    getOperators:(operator) => dispatch(getOperators(operator)),
    addDiscount:(data) => dispatch(addDiscount(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(UserDiscountContainer)