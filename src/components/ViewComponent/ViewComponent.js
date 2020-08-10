import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { Tag, Table, Button } from 'antd';
import CancellationModal from '../TicketsComponent/modals/TicketCancellationModal';
import ForceCancelModal from './Modals/ForceCancelModal'
import ChangeTicketsModal from '../TicketsComponent/modals/ChangeTicketsModal';
import ViewsLogsComponent from "./ViewInnerComponent/ViewLogs/ViewsLogs";
import './ViewComponent.scss';

const ViewComponent = ({
    ticket,
    id,
    ticketsData,
    userProducts,
    ticketForceCancel,
    userInfo,
    ticketCancellation,
    tripColumn,
    resendEmail,
    columns,
    selectedMountain,
    ticketInformation
}) => {
    const [refund, setRefund] = useState('wallet');
    const [paymentType, setPaymentType] = useState('wallet');
    const [ticketId, setTicketId] = useState(null);
    const [isCanceledOpened, setIsCanceledOpened] = useState(false);
    const [changeTicketDatesIsOpen, setChangeTicketDatesIsOpen] = useState(false);
    const [forceCancelIsOpen, setForceCancelIsOpen] = useState(false);
    const [isCancelable, setIsCancelable] = useState(false);
    const [walletRefundOptions, setWalletRefundOptions] = useState({
        type: 'default',
        value: ''
    });
    const [creditCardRefundOptions, setCreditCardRefundOptions] = useState({
        type: 'default',
        amount: ''
    });

    const creditCardRefundOptionsChange = e => {
        setCreditCardRefundOptions({
            ...creditCardRefundOptions,
            type: e.target.value
        });
    }

    const creditCardAmountChange = e => {
        const { value } = e.target;

        setCreditCardRefundOptions({
            ...creditCardRefundOptions,
            amount: value
        });
    }

    const walletRefundOptionsChange = e => {
        setWalletRefundOptions({
            ...walletRefundOptions,
            type: e.target.value
        });
    }

    const walletAmountChange = e => {
        const { value } = e.target;

        setWalletRefundOptions({
            ...walletRefundOptions,
            value
        });
    }

    useEffect(() => {
        if (ticket) {
            setIsCancelable(ticket.cancellable);
        }
    }, [ticket])

    if (!ticket) {
        return <div></div>;
    }

    const toggleTicketDatesModal = () => {
        setChangeTicketDatesIsOpen(!changeTicketDatesIsOpen);
    }

    const toggleCancellationModal = () => {
        setIsCanceledOpened(!isCanceledOpened);
    }

    const handleForceCancelationOpen = () => {
        setForceCancelIsOpen(!forceCancelIsOpen);
    }

    const handleResendEmail = () => {
        resendEmail(ticket.uuid)
    }

    const confirmTicketCancel = () => {
        if (!isCancelable) {
            return setIsCanceledOpened(false);
        }
        const data = {
            input: {
                uuid: ticket.uuid,
            }
        };

        if (refund === 'creditCard') {
            data.input.type = 'refund'
        }

        if (refund === 'wallet' && walletRefundOptions.type === 'custom') {
            data.input.forceParams = {};

            data.input.forceParams.value = Number(walletRefundOptions.value) * 100;
        }

        if (refund === 'creditCard' && creditCardRefundOptions.type !== 'default') {
            data.input.forceParams = {};

            data.input.forceParams.type = creditCardRefundOptions.type;

            if (creditCardRefundOptions.type === 'partial') {
                data.input.forceParams.amount = Number(creditCardRefundOptions.amount) * 100;
            } else {
                data.input.forceParams.amount = 0;
            }
        }

        ticketCancellation(data);
    };

    const onChangeRefundValue = type => {
        setRefund(type);
    }

    const getTransportationInformation = type => {
        const price = {
            transportationPrice: 0,
            productsPrice: 0,
            roundTripPrice: 0,
            roundTripDiscount: 0,
            ticketPrice: 0,
            subTotal: 0,
            tax: 0,
            discount: 0,
            snowPassDiscount: 0,
            agentDiscount: 0,
            credits: 0
        }

        if (type === 'ticket-price' || type === 'round-trip-discount' || type === 'snowpass' || type === 'sub-total' || type === 'tax') {
            price.ticketPrice = ticket.adult * ticket.price * (ticket.roundTrip ? 2 : 1);
        }
        if (ticket.creditsObject) {
            if (ticket.creditsObject.balanceUsed) {
                price.credits += ticket.creditsObject.balanceUsed / 100;
            }
            if (ticket.creditsObject.usedFromBalance) {
                price.credits += ticket.creditsObject.usedFromBalance / 100;
            }
            if (ticket.creditsObject.promoBalanceUsed) {
                price.credits += ticket.creditsObject.promoBalanceUsed / 100;
            }
            if (ticket.creditsObject.usedFromPromoBalance) {
                price.credits += ticket.creditsObject.usedFromPromoBalance / 100;
            }
        }

        if (ticket.agentDiscount && ticket.agentDiscount.value) {
            price.agentDiscount = ticket.agentDiscount.value * ticket.adult * (ticket.roundTrip ? 2 : 1) / 100;
        }

        if (type === 'transportation' || type === 'sub-total' || type === 'tax') {
            if (ticket.luggage && Object.values(ticket.luggage).length > 0) price.transportationPrice += (ticket.luggage.price * (ticket.roundTrip ? 2 : 1)) / 100;
            if (ticket.equipment && Object.values(ticket.equipment).length > 0) price.transportationPrice += (ticket.equipment.price * (ticket.roundTrip ? 2 : 1)) / 100;
            if (ticket.insurance && Object.values(ticket.insurance).length > 0) price.transportationPrice += ticket.insurance.price / 100;
        }

        if (type === 'products' || type === 'sub-total' || type === 'tax') {
            for (let i = 0; i < userProducts.length; i++) {
                price.productsPrice += userProducts[i].totalAmount / 100;
            }
        }

        if (type === 'round-trip-discount' || type === 'sub-total' || type === 'tax') {
            price.roundTripPrice = ticket.adult * ticket.roundTripPrice;
            price.roundTripDiscount = price.ticketPrice - price.roundTripPrice;

        }

        if(type === 'promo-discount' || type === 'sub-total' || type === 'tax'){
            price.discount = ticket.promoDiscount ? ticket.promoDiscount.discount / 100 : 0;
        }

        if(type === 'snowpass' || type === 'sub-total' || type === 'tax'){
            price.snowPassDiscount = ticket.snowPass ? price.ticketPrice : 0;
        }

        if (type === 'sub-total' || type === 'tax') {
            price.subTotal =
                (price.transportationPrice +
                (ticket.roundTrip ? price.roundTripPrice : price.ticketPrice) +
                price.productsPrice) - 
                price.discount -
                price.snowPassDiscount - price.agentDiscount - price.credits;
        }

        if (type === 'tax') {
            price.tax = price.subTotal * 0.05;
        }

        return price;
    }

    const handleTicketForceCancel = () => {
        const data = {
            uuid: ticket.uuid
        }

        ticketForceCancel(data);
    }


    const passengersData = [];

    const tripInforamtion = [
        {
            key: 0,
            detail: 'City',
            from: ticket.from.city,
            to: ticket.to.city
        },
        {
            key: 1,
            detail: 'Zone',
            from: ticket.from.zone,
            to: ticket.to.zone
        },
        {
            key: 2,
            detail: 'Spot',
            from: ticket.from.spot,
            to: ticket.to.spot
        },
        {
            key: 3,
            detail: 'Time',
            from: ticket.from.time,
            to: ticket.to.time
        },
        {
            key: 4,
            detail: 'Date',
            from: ticket.date,
            to: ticket.date
        },
    ];

    ticket && ticket.passengers.map((item, index) => {
        passengersData.push({
            key: index,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone,
            number: index + 1
        })
    })

    return (
        <div className="ticket-view-container">
            <div className="ticket-view-header">
                <h2 className="markdown-header ml-3">Ticket {ticket.confirmationNumber}</h2>
                {
                    (ticket.status.toLowerCase() !== 'failed' && ticket.status.toLowerCase() !== 'cancelled') && (
                        <div className="action-buttons">
                            <Button type="primary" onClick={() => handleResendEmail()}>Email Receipt</Button>
                            <Button type="primary" onClick={() => setIsCanceledOpened(!isCanceledOpened)}>Cancel</Button>
                            <Button type="primary" onClick={() => setChangeTicketDatesIsOpen(!changeTicketDatesIsOpen)}>Modify</Button>
                            <Button type="primary" onClick={() => setForceCancelIsOpen(!forceCancelIsOpen)}>Force Cancel</Button>
                        </div>
                    )
                }
            </div>
            <Row className="m-0">
                <Col lg="12" xl="6">
                    <div className="general-information-container">
                        <h3 className="markdown-header">General Information</h3>
                    </div>
                    <div className="general-information-table-container">
                        <div className="general-information-col">
                            <p className="information-tab">Confirmation Number</p>
                            <p>{ticket.confirmationNumber}</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Operator</p>
                            <p>{ticket.busline}</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Status</p>
                            <p><Tag color={ticket.status.toLowerCase() === 'cancelled' ? 'orange' : ticket.status.toLowerCase() === 'success' ? 'green' : 'red'}>{ticket.status}</Tag></p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Date</p>
                            <p>{ticket.date}</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Type</p>
                            <p>{ticket.type.toLowerCase()}</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Adults</p>
                            <p>{ticket.adult}</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Booked At</p>
                            <p>{moment(ticket.createdAt).format("HH:mm DD.MM.YYYY")}</p>
                        </div>
                        {ticket.status.toLowerCase() === 'cancelled' && (
                            <div className="general-information-col">
                                <p className="information-tab">Round Trip</p>
                                <p>{ticket.roundTrip ? 'true' : 'false'}</p>
                            </div>
                        )}
                        <div className="general-information-col">
                            <p className="information-tab">Stripe Charge Id</p>
                            <p>{ticket.stripeChargeId}</p>
                        </div>
                        <div className="general-information-col">
                            <p className="information-tab">Payment Method</p>
                            <p>{ticket.snowPass ? 'SnowPass' : ticket.useCredits ? 'Credit' : 'Credit Card'}</p>
                        </div>
                    </div>
                </Col>
                <Col lg="12" xl="6">
                    <div className="trip-information-heading-container">
                        <h3 className="markdown-header">Trip Information</h3>
                        <Table
                            columns={tripColumn}
                            dataSource={tripInforamtion}
                            bordered
                            className="tickets-table-container"
                            pagination={false}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="m-0">
                {
                    ticket.userId && (
                        <Col lg="12" xl="6">
                            <div className="general-information-container payment-container">
                                <h3 className="markdown-header">Snowclub Details</h3>
                            </div>
                            <div className="general-information-table-container">
                                <div className="general-information-col">
                                    <p className="information-tab">Email</p>
                                    <p>{userInfo.email}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">First Name</p>
                                    <p>{userInfo.firstName}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Last Name</p>
                                    <p>{userInfo.lastName}</p>
                                </div>
                                {
                                    ticket.snowPass && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Passes</p>
                                            <p>{userProducts !== '' ? userProducts.map(item => (
                                                <span>{item.product.name.toLowerCase()}</span>
                                            )) : ''}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </Col>
                    )
                }
                <Col lg="12" xl="6">
                    <div className="passengers-information-heading-container">
                        <h3 className="markdown-header">Passengers Information</h3>
                        <Table
                            columns={columns}
                            dataSource={passengersData}
                            bordered
                            className="tickets-table-container"
                            pagination={false}
                        />
                    </div>
                </Col>
                {((ticket.luggage && ticket.luggage.quantity) || (ticket.equipment && ticket.equipment.quantity) || (ticket.insurance && ticket.insurance.count)) &&
                    <Col lg="12" xl="6">
                        <div className="extra-transportation">
                            <div className="general-information-container payment-container">
                                <h3 className="markdown-header">Extra Transportation</h3>
                            </div>
                            <div className="general-information-table-container">
                                {ticket.luggage && <div className="general-information-col">
                                    <p className="information-tab">More Luggage</p>
                                    <p>{ticket.luggage.quantity}(pieces)</p>
                                </div>}

                                {ticket.equipment && <div className="general-information-col">
                                    <p className="information-tab">More Equipment</p>
                                    <p>{ticket.equipment.quantity}(pieces)</p>
                                </div>}

                                {(ticket.insurance && ticket.insurance.count) && <div className="general-information-col">
                                    <p className="information-tab">insurance</p>
                                    <p>INCLUDED</p>
                                </div>}
                            </div>
                        </div>
                    </Col>
                }

                <Col lg="12" xl="6">
                        <div className="payment-information">
                            <div className="general-information-container payment-container">
                                <h3 className="markdown-header">Payment Information</h3>
                            </div>
                            <div className="general-information-table-container">
                                <div className="general-information-col">
                                    <p className="information-tab">Ticket Price</p>
                                    <p>${getTransportationInformation('ticket-price').ticketPrice.toFixed(2)}</p>
                                </div>
                                {
                                    ticket.roundTrip && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Round Trip Discount</p>
                                            <p>-${(getTransportationInformation('round-trip-discount').roundTripDiscount).toFixed(2)}</p>
                                        </div>
                                    )
                                }
                                {
                                    ticket.agentDiscount && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Agent Discount</p>
                                            <p>{(getTransportationInformation().agentDiscount) > 0 ? "-" : ""}${(getTransportationInformation().agentDiscount).toFixed(2)}</p>
                                        </div>
                                    )
                                }
                                {
                                    ticket.snowPass && (
                                        <div className="general-information-col">
                                            <p className="information-tab">SnowPass Discount</p>
                                            <p>-${(getTransportationInformation('snowpass').snowPassDiscount).toFixed(2)}</p>
                                        </div>
                                    )
                                }
                                {
                                    getTransportationInformation('transportation').transportationPrice > 0 && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Extras Transportation</p>
                                            <p>${(getTransportationInformation('transportation').transportationPrice).toFixed(2)}</p>
                                        </div>
                                    )
                                }
                                {
                                    userProducts.length > 0 && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Products</p>
                                            <p>${(getTransportationInformation('products').productsPrice).toFixed(2)}</p>
                                        </div>
                                    )
                                }
                                {
                                    userInfo && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Promo Code Discount</p>
                                            <p>{(getTransportationInformation('promo-discount').discount) > 0 ? "-" : ""}${(getTransportationInformation('promo-discount').discount).toFixed(2)}</p>
                                        </div>
                                    )
                                }
                                {
                                    userInfo && (
                                        <div className="general-information-col">
                                            <p className="information-tab">Credits Used</p>
                                            <p>{(getTransportationInformation().credits) > 0 ? "-" : ""}${ getTransportationInformation().credits.toFixed(2) }</p>
                                        </div>
                                    )
                                }
                                <div className="general-information-col">
                                    <p className="information-tab">Sub Total</p>
                                    <p>${getTransportationInformation('sub-total').subTotal.toFixed(2)  }</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Driver Tip</p>
                                    <p>${ticket.driverTip ? ( ticket.roundTrip ?  2 * ticket.driverTip : ticket.driverTip).toFixed(2) : 0}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Tax</p>
                                    <p>${getTransportationInformation('tax').tax.toFixed(2)}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Total</p>
                                    <p>${((ticket.amountForStripe ? ticket.amountForStripe : 0) / 100).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                {
                    (ticket.creditsObject && ticket.creditsObject !== {}) && (
                        <Col lg="12" xl="6">
                            <div className="general-information-container payment-container">
                                <h3 className="markdown-header">Credits Used</h3>
                            </div>
                            <div className="general-information-table-container">
                                <div className="general-information-col">
                                    <p className="information-tab">Credit</p>
                                    <p>{typeof ticket.creditsObject.balanceUsed !== 'undefined' ? ("$" + (ticket.creditsObject.balanceUsed / 100).toFixed(2)) : ''}</p>
                                    <p>{typeof ticket.creditsObject.usedFromBalance !== 'undefined' ? ("$" + (ticket.creditsObject.usedFromBalance / 100).toFixed(2)) : ''}</p>
                                </div>
                                <div className="general-information-col">
                                    <p className="information-tab">Credits Promo</p>
                                    <p>{typeof ticket.creditsObject.promoBalanceUsed !== 'undefined' ? ("$" + (ticket.creditsObject.promoBalanceUsed / 100).toFixed(2)) : ''}</p>
                                    <p>{typeof ticket.creditsObject.usedFromPromoBalance !== 'undefined' ? ("$" + (ticket.creditsObject.usedFromPromoBalance / 100).toFixed(2)) : ''}</p>
                                </div>
                            </div>
                        </Col>
                    )
                }
                {ticketInformation !== undefined && ticketInformation.ticketLogs.length > 0 && <ViewsLogsComponent ticketInformation={ticketInformation} />}
            </Row>

            <CancellationModal
                viewPage
                pending={ticketsData.cancellTicketStatus}
                confirmTicketCancel={confirmTicketCancel}
                refund={refund}
                creditCardRefundOptions={creditCardRefundOptions}
                onChangeRefundValue={onChangeRefundValue}
                paymentType={paymentType}
                ticketId={ticketId}
                creditCardAmountChange={creditCardAmountChange}
                isCancelable={isCancelable}
                walletRefundOptions={walletRefundOptions}
                walletRefundOptionsChange={walletRefundOptionsChange}
                walletAmountChange={walletAmountChange}
                tickets={ticket}
                toggle={toggleCancellationModal}
                creditCardRefundOptionsChange={creditCardRefundOptionsChange}
                cancelIsOpen={isCanceledOpened}
            />
            <ChangeTicketsModal
                item={ticket}
                selectedMountain={selectedMountain}
                toggleTicketDatesModal={toggleTicketDatesModal}
                changeTicketDatesIsOpen={changeTicketDatesIsOpen}
            />
            <ForceCancelModal
                forceCancelIsOpen={forceCancelIsOpen}
                toggle={handleForceCancelationOpen}
                handleTicketForceCancel={handleTicketForceCancel}
            />
        </div>
    )
}

export default ViewComponent;
