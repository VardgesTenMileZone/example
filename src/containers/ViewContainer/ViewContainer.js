import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import InnerPageComponent from '../../components/InnerPageComponent/InnerPageComponent';
import { getTicketsById, ticketCancellation, resendEmailReset, resendEmail, ticketForceCancel } from '../../store/actions/TicketsAction';
import { toast } from 'react-toastify'
import ViewComponent from '../../components/ViewComponent/ViewComponent';

const ViewContainer = ({
    getTicketsById,
    tickets,
    resendEmailReset,
    resendEmail,
    ticketForceCancel,
    ticketCancellation,
    location: { search },
    ticketInformation
}) => {
    const [id, setId] = useState('');
    useEffect(() => {
        const queryString = require("query-string");
        const parsed = queryString.parse(search);

        setId(parsed.id)
        getTicketsById(parsed.id)
    }, [])

    useEffect(() => {
        if (tickets.resendEmailStatus === 'success') {
            toast.success(tickets.resendEmailData && tickets.resendEmailData.data.message)

            resendEmailReset();
        }

        if (tickets.cancellTicketStatus === 'success') {
            window.location.reload()
        }

        if (tickets.ticketForceCancelStatus === 'success') {
            toast.success("ticket successfuly send");

            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    }, [tickets])

    const Passengerscolumns = [
        {
            title: '#',
            dataIndex: 'number',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
    ];

    const tripColumn = [
        {
            title: '',
            dataIndex: 'detail',
        },
        {
            title: 'From',
            dataIndex: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
        },
    ];

    return (
        <>
            <InnerPageComponent>
                {(tickets.getDataByIdStatus === 'pending' || tickets.resendEmailStatus === 'pending' || tickets.ticketForceCancelStatus === 'pending') && <Spinner />}
                <ViewComponent
                    userInfo={tickets.userInfo}
                    ticketCancellation={ticketCancellation}
                    resendEmail={resendEmail}
                    ticketForceCancel={ticketForceCancel}
                    ticketsData={tickets}
                    userProducts={tickets.userProducts}
                    tripColumn={tripColumn}
                    columns={Passengerscolumns}
                    id={id}
                    ticket={tickets.dataById}
                    selectedMountain={tickets.selectedMountain}
                    ticketInformation={ticketInformation}
                />
            </InnerPageComponent>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    getTicketsById: id => dispatch(getTicketsById(id)),
    resendEmail: id => dispatch(resendEmail(id)),
    ticketCancellation: body => dispatch(ticketCancellation(body)),
    ticketForceCancel: body => dispatch(ticketForceCancel(body)),
    resendEmailReset: () => dispatch(resendEmailReset()),
});

const mapStateToProps = state => ({
    tickets: state.tickets,
    ticketInformation: state.tickets.tickerInformation
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
