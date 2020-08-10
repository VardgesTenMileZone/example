import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import Spinner from '../../SpinnerComponent/SpinnerComponent';
import { find } from 'lodash';
import './modal.scss';

const TicketCancellationModal = ({
    toggle,
    isCancelable,
    pending,
    viewPage,
    creditCardRefundOptionsChange,
    confirmTicketCancel,
    onChangeRefundValue,
    creditCardAmountChange,
    walletAmountChange,
    walletRefundOptions,
    creditCardRefundOptions,
    refund,
    paymentType,
    ticketId,
    tickets,
    cancelIsOpen,
    walletRefundOptionsChange
}) => {
    const onChangeRefundsValue = type => {
        onChangeRefundValue(type);
    }

    const TicketConditions = () => {
        return (
            <div className="busline-service-contents-item-container">
                <p className="busline-service-text">
                    <h6>Refunds, Cancelations</h6>
                    <p><i>All refunds and changes are processed by you through your “Member Account” or through the “My Tickets” section of the site. No changes or cancelations are permitted within an hour of pick up time, after which time tickets will be deemed lost. </i></p>
                    <p><strong>Cancelation/Refund Fees</strong></p>
                    <div>
                        <p>Refund as credit to your member account:</p>
                        <ul>
                            <li>Outside 48hrs of original pick up time – Free</li>
                            <li>Within 48hrs of the original pick-up time - $2 per ticket fee.</li>
                            <li>Within 24hrs of the original pick-up time - $10 per ticket fee</li>
                        </ul>
                    </div>
                    <div>
                        <p>Refund to your credit card:</p>
                        <ul>
                            <li>Anytime - $15</li>
                            <li>Within 24hrs of original pickup time – No refund</li>
                        </ul>
                    </div>
                    <div>
                        <p>Tickets under the following conditions are Non-refundable:</p>
                        <ul>
                            <li>If using a discount, coupon, or promo-code.</li>
                            <li>If purchased through third party vendor</li>
                            <li>If you miss your departure</li>
                        </ul>
                    </div>
                    <p><strong>AIRPORT (within 24hrs)</strong></p>
                    <p><i>Valid only in the event of a delayed or cancelled flight and by contacting our offices prior to bus departure time. To claim your refund, you must provide proof of delayed or canceled flight.</i></p>

                    <div>
                        <ul>
                            <li>Refunds are subject to a $5 fee per ticket</li>
                            <li>Changes are subject to a $5 fee per ticket</li>
                        </ul>
                    </div>

                    <p><i>SNOWBUS will not be responsible for delays caused by breakdowns, road conditions, weather, or other conditions beyond the carriers' control. Refunds will not be granted for these circumstances. Alcohol and Smoking onboard is strictly prohibited by law.</i></p>

                </p>
            </div>
        )
    };

    const selectedTicketForCancel = !viewPage ? (ticketId && tickets) ? (find(tickets, (i) => i.uuid === ticketId)) : null : tickets;

    return (
        <Modal
            className="cancellation-modal-container"
            isOpen={cancelIsOpen}
            toggle={toggle}
        >
            {pending === 'pending' && (
                <Spinner />
            )}
            <ModalHeader toggle={toggle}>Confirm Cancellation </ModalHeader>
            <ModalBody>
                {
                    isCancelable ? (
                        <>
                            {TicketConditions()}
                            {(!selectedTicketForCancel || (selectedTicketForCancel && !selectedTicketForCancel.snowPass)) && (paymentType !== "Credits") &&
                                <div className="radio-card">
                                    <div className="row m-0">
                                        <div className="col-sm-12">
                                            <h5 style={{ textAlign: "center", margin: "0.5rem" }}>
                                                Where You want to refund the money?
                                            </h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="radio" onClick={() => { onChangeRefundsValue('wallet') }}>
                                                {refund === 'wallet' ?
                                                    <i className="fa fa-circle" aria-hidden="true"></i>
                                                    :
                                                    <i className="fa fa-circle-o" aria-hidden="true"></i>
                                                }
                                                Refund money to my wallet
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="radio" onClick={() => { onChangeRefundsValue('creditCard') }}>
                                                {refund === 'creditCard' ?
                                                    <i className="fa fa-circle" aria-hidden="true"></i>
                                                    :
                                                    <i className="fa fa-circle-o" aria-hidden="true"></i>
                                                }
                                                Refund money to Credit Card
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                refund === 'wallet' && (
                                    <div className="redund-options row">
                                        <div className="col-sm-5">
                                            <Input type="select" onChange={walletRefundOptionsChange} name="select">
                                                <option value="default">Default</option>
                                                <option value="custom">Custom</option>
                                            </Input>
                                        </div>
                                        <div className="col-sm-7">
                                            {
                                                walletRefundOptions.type === 'custom' && (
                                                    <Input
                                                        onChange={walletAmountChange}
                                                        placeholder="value"
                                                        value={walletRefundOptions.value}
                                                        type="number"
                                                        name="walletRefundAmount"
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            {
                                refund === 'creditCard' && (
                                    <div className="redund-options row">
                                        <div className="col-sm-5">
                                            <Input type="select" onChange={creditCardRefundOptionsChange} name="select">
                                                <option value="default">Default</option>
                                                <option value="partial">Partial</option>
                                                <option value="full">Full</option>
                                            </Input>
                                        </div>
                                        <div className="col-sm-7">
                                            {
                                                creditCardRefundOptions.type === 'partial' && (
                                                    <Input
                                                        onChange={creditCardAmountChange}
                                                        placeholder="value"
                                                        value={creditCardRefundOptions.amount}
                                                        type="number"
                                                        name="walletRefundAmount"
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                            <h1>This ticket is not cancelable</h1>
                        )
                }
            </ModalBody>
            <ModalFooter>
                <div className="edit-buttons">
                    <button className="cencel" onClick={toggle}>Close</button>
                    <button className="modify" onClick={ev => confirmTicketCancel(ev)}>Confirm</button>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default TicketCancellationModal;