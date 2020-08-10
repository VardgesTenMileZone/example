import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import InnerPageComponent from '../../components/InnerPageComponent/InnerPageComponent';
import TicketsComponent from '../../components/TicketsComponent/TicketsComponent';
import { filterTickets, getTickets, resendEmail, resendEmailReset, ticketCancellation } from '../../store/actions/TicketsAction';
import { logout } from '../../store/actions/AuthActions';

const TicketsContainer = ({ filterTickets, ticketCancellation, getTickets, logout, resendEmail, tickets, resendEmailReset }) => {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (tickets.getDataStatus === 'success') {
            setLoaded(true)
        }

        if (tickets.getDataStatus === 'error') {
            logout();
        }
        if (tickets.resendEmailStatus === 'success') {
            toast.success(tickets.resendEmailData && tickets.resendEmailData.data.message);
            resendEmailReset();
        } else if (tickets.resendEmailStatus === 'error') {
            toast.error(tickets.resendEmailData && tickets.resendEmailData.data.message);
            resendEmailReset();
        }
        if (tickets.cancellTicketStatus === 'success') {
            window.location.reload();
        }
    }, [tickets]);

    useEffect(() => {
        if (tickets.tickets) {
            let products = data;
            products = products.concat(tickets.tickets.data.tickets.Items);

            setData(products)
        }
    }, [tickets.tickets]);
    return (
        <>
            {tickets.getDataStatus === 'pending' && !loaded && <Spinner />}
            {(tickets.filterStatus === 'pending' || tickets.resendEmailStatus === 'pending') && <Spinner />}
            <InnerPageComponent>
                <TicketsComponent
                    tickets={tickets}
                    ticketsData={data}
                    getTickets={getTickets}
                    filterTickets={filterTickets}
                    resendEmail={resendEmail}
                    ticketCancellation={ticketCancellation}
                    />
            </InnerPageComponent>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    filterTickets: data => dispatch(filterTickets(data)),
    getTickets: data => dispatch(getTickets(data)),
    logout: () => dispatch(logout()),
    resendEmail: id => dispatch(resendEmail(id)),
    resendEmailReset: () => dispatch(resendEmailReset()),
    ticketCancellation: data => dispatch(ticketCancellation(data))
});

const mapStateToProps = state => ({
    tickets: state.tickets
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);