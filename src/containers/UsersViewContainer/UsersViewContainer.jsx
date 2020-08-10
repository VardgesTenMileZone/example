import React, {useEffect} from "react";
import { connect } from "react-redux"
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import UsersViewComponent from "../../components/UsersViewComponent/UsersViewComponent";
import Spinner from "../../components/SpinnerComponent/SpinnerComponent"
import { getIndividualUser } from "../../store/actions/getIndividualUser";
import { getUserDiscount } from "../../store/actions/getUserDiscount";
import { filterTickets, getTickets, resendEmail, resendEmailReset, ticketCancellation } from '../../store/actions/TicketsAction';
import { logout } from '../../store/actions/AuthActions';

const UsersViewContainer = ({ getIndividualUser,
                                userDiscount,
                                individualUser,
                                getDiscount,
                                pending,
                                location: { search },
                                resendEmail,
                                ticketCancellation,
                                getTickets,
                                filterTickets
                                }) => {
    useEffect(() => {
        const queryString = require("query-string");
        const parsed = queryString.parse(search);
        getDiscount(parsed.id);
        getIndividualUser(parsed.id)
    }, []);
    return(
        <>
            {pending && <Spinner/>}
            <InnerPageComponent>
                <UsersViewComponent
                    individualUser={individualUser}
                    userDiscount={userDiscount}
                    resendEmail={resendEmail}
                    ticketCancellation={ticketCancellation}
                    getTickets={getTickets}
                    filterTickets={filterTickets}
                />
            </InnerPageComponent>
        </>
    )
};

const mapDispatchToProps = dispatch => ({
    getIndividualUser:id => dispatch(getIndividualUser(id)),
    getDiscount:(id) => dispatch(getUserDiscount(id)),
    filterTickets: data => dispatch(filterTickets(data)),
    getTickets: data => dispatch(getTickets(data)),
    ticketCancellation: data => dispatch(ticketCancellation(data)),
    resendEmail: id => dispatch(resendEmail(id)),
    resendEmailReset: () => dispatch(resendEmailReset()),
    logout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
    individualUser:state.findTrips.individualUser,
    pending:state.findTrips.pending,
    userDiscount:state.notification.userDiscount,
    tickets: state.tickets
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersViewContainer)