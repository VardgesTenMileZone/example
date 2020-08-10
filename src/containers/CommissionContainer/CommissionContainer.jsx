import React from "react";
import { connect } from "react-redux";
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import CommissionComponent from "../../components/CommissionComponent/CommissionComponent";
import { searchCommissionAction } from "../../store/actions/searchCommission";

const CommissionContainer = ({ searchCommission, commission, error, pending }) => {
    return(
        <>
            <InnerPageComponent>
                <CommissionComponent
                    searchCommission={searchCommission}
                    commission={commission}
                    error={error}
                    pending={pending}
                />
            </InnerPageComponent>
        </>
    )
};

const mapDispatchToProps = dispatch => ({
    searchCommission : (date) => dispatch(searchCommissionAction(date))
});

const mapStateToProps = state => ({
    commission : state.marketing.commission,
    error: state.marketing.error,
    pending: state.marketing.pending,
});

export default connect(mapStateToProps,mapDispatchToProps)(CommissionContainer)