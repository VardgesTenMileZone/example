import React, { useState, useEffect } from 'react';
import _ from "lodash";
import axios from "axios";
import {Table, Input, Button, Select} from 'antd';
import { Row, Col } from 'reactstrap';
import InfiniteScroll from "react-infinite-scroller";
import Spinner from '../SpinnerComponent/SpinnerComponent';
import TicketsColumn from "./TicketsColumn";
import CancellationModal from "./modals/TicketCancellationModal";
import ChangeTicketsModal from "./modals/ChangeTicketsModal";
import './TicketsComponent.scss';

const TicketsComponent = ({   filterTickets,
                              tickets,
                              getTickets,
                              resendEmail,
                              ticketsData,
                              ticketCancellation
                          }) => {
    const [inputData, setInputData] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [paymentType, setPaymentType] = useState('wallet');
    const [ticketId, setTicketId] = useState(null);
    const [type, setType] = useState('lastName');
    const [isCancelable, setIsCancelable] = useState(null);
    const [isCancellationOpened, setIsCancellationOpened] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedMountain, setSelectedMountain] = useState(null);
    const [changeTicketDatesIsOpen, setChangeTicketDatesIsOpen] = useState(false);
    const [refund, setRefund] = useState('wallet');
    const [creditCardRefundOptions, setCreditCardRefundOptions] = useState({
        type: 'default',
        amount: ''
    });
    const [walletRefundOptions, setWalletRefundOptions] = useState({
        type: 'default',
        value: ''
    });
    const { Option } = Select;

    useEffect(() => {
        const loadMountain = async () => {
            getTickets({
                LastEvaluatedKey: {}
            });
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/mountains`);
            setSelectedMountain(res);
        }
        loadMountain()
    }, []);

    useEffect(() => {
        if (selectedMountain && selectedMountain.data && selectedTicket) {
            let selected = _.find(selectedMountain.data.Items, (i) => i.value === selectedTicket.to.city);
            setSelectedMountain(selected);
        }
    }, [selectedMountain, selectedTicket])
    useEffect(() => {
        if(tickets.data && !checked){
            setData(tickets.data);
            setChecked(true)
        }
    }, [tickets]);

    useEffect(() => {
        if(tickets.filteredData){
            setData(tickets.filteredData.data);
            if(tickets.filteredData.data.length <= 40){
                setHasMore(false);
            }
        }
    }, [tickets.filteredData])

    useEffect(() => {
        if(tickets && tickets.getDataStatus === 'success' && loading){
            let products = data;
            products = products.concat(tickets.data);
            setData(products);
            setLoading(false)
        }
    }, [tickets])

    const handleChange = e => {
        const { value } = e.target;

        setInputData(value);
    };
    const walletRefundOptionsChange = e => {
        setWalletRefundOptions({
            ...walletRefundOptions,
            type: e.target.value
        });
    }
    const toggleTicketDatesModal = () => {
        setChangeTicketDatesIsOpen(!changeTicketDatesIsOpen);
    };
    const creditCardRefundOptionsChange = e => {
        setCreditCardRefundOptions({
            ...creditCardRefundOptions,
            type: e.target.value
        });
    };
    const creditCardAmountChange = e => {
        const { value } = e.target;

        setCreditCardRefundOptions({
            ...creditCardRefundOptions,
            amount: value
        });
    };
    const onChangeRefundValue = type => {
        setRefund(type);
    };
    const walletAmountChange = e => {
        const { value } = e.target;

        setWalletRefundOptions({
            ...walletRefundOptions,
            value
        });
    }
    const confirmTicketCancel = () => {
        if (!isCancelable) {
            return setIsCancellationOpened(false);
        }
        const data = {
            input: {
                uuid: ticketId,
            }
        };

        if (refund === 'creditCard') {
            data.input.type = 'refund'
        }

        if(refund === 'wallet' && walletRefundOptions.type === 'custom'){
            data.input.forceParams = {};

            data.input.forceParams.value = Number(walletRefundOptions.value) * 100;
        }

        if(refund === 'creditCard' && creditCardRefundOptions.type !== 'default'){
            data.input.forceParams = {};

            data.input.forceParams.type = creditCardRefundOptions.type;

            if(creditCardRefundOptions.type === 'partial'){
                data.input.forceParams.amount = Number(creditCardRefundOptions.amount) * 100;
            }else{
                data.input.forceParams.amount = 0;
            }
        }

        ticketCancellation(data);
    };

    const handleClick = () => {
        const val = inputData;

        if(val === ''){
            return window.location.reload();
        }

        filterTickets({
            val,
            type,
            LastEvaluatedKey: {
                LastEvaluatedKey: tickets.LastEvaluatedKey
            }
        })
    }

    const handleInfiniteOnLoad = async() => {
        setLoading(true);
        getTickets({
            LastEvaluatedKey: {
                LastEvaluatedKey: tickets.LastEvaluatedKey
            }
        });
    };

    const handleChangeType = type => {
        setType(type);
    }

    const selectBefore = (
        <Select defaultValue={type} style={{ width: 152 }}>
          <Option value="lastName" onClick={() => handleChangeType('lastName')}>Last Name</Option>
          <Option value="email" onClick={() => handleChangeType('email')}>Email</Option>
          <Option value="confirmationCode" onClick={() => handleChangeType('confirmationCode')}>Confirmation Code</Option>
        </Select>
    );

    const renderTableHeader = () => {
        return (
            <Row>
                <Col lg="5" md="12">
                    <Row>
                        <Col md="10">
                            <Input placeholder="Search" addonAfter={selectBefore} onChange={handleChange} />
                        </Col>
                        <Col md="2">
                            <Button className="w-100 ticket-search-btn" type="primary" onClick={() => handleClick('name')}>Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    };
    const handleActionClick = (type, id) => {
        if (type === 'View') {
            window.location.href = `/tickets/view?id=${id}`
        }

        if (type === 'Resend Email') {
            resendEmail(id);
        }
        if (type === "Cancell") {
            let isCancelableData = _.find(tickets.data, (i) => i.uuid === id);

            setIsCancelable(isCancelableData.cancellable);
            setTicketId(id);

            setIsCancellationOpened(true)
        }

        if (type === "Modify") {
            let ticket = _.find(ticketsData, (i) => i.uuid === id);
            setSelectedTicket(ticket);
            setChangeTicketDatesIsOpen(true)
        }
    };

    const toggleCancellationModal = () => {
        setIsCancellationOpened(!isCancellationOpened);
    }
    const columns = TicketsColumn(handleActionClick);
    return (
        <>
            <div className="tickets-container">
                <h2 className="markdown-header">Tickets</h2>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={handleInfiniteOnLoad}
                    hasMore={!loading && hasMore}
                    threshold={20}
                    useWindow={false}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        className="tickets-table-container"
                        title={() => renderTableHeader()}
                        pagination={false}
                    />
                    { loading && <Spinner /> }
                </InfiniteScroll>
            </div>
            <CancellationModal ticketsComponent={true}
                               isCancelable={isCancelable}
                               pending={tickets.cancellTicketStatus}
                               confirmTicketCancel={confirmTicketCancel}
                               refund={refund}
                               creditCardAmountChange={creditCardAmountChange}
                               walletRefundOptionsChange={walletRefundOptionsChange}
                               onChangeRefundValue={onChangeRefundValue}
                               paymentType={paymentType}
                               ticketId={ticketId}
                               tickets={tickets.data}
                               creditCardRefundOptions={creditCardRefundOptions}
                               creditCardRefundOptionsChange={creditCardRefundOptionsChange}
                               walletRefundOptions={walletRefundOptions}
                               walletAmountChange={walletAmountChange}
                               toggle={toggleCancellationModal}
                               cancelIsOpen={isCancellationOpened} />
            <ChangeTicketsModal
                ticketsPage
                selectedMountain={selectedMountain}
                item={selectedTicket}
                toggleTicketDatesModal={toggleTicketDatesModal}
                changeTicketDatesIsOpen={changeTicketDatesIsOpen}
            />
        </>
    )
}

export default TicketsComponent;