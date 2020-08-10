import React,{ useState,useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button, Select } from 'antd';
import swal from "sweetalert";
import LeavingFromToComponent from "./NotificationsComponent/LeavingFromToComponent";
import MessageComponent from "./NotificationsComponent/MessageComponent";
import DropOffPickUpLocationsComponent from "./NotificationsComponent/DropOffPickUpLocationsComponent";
import CalendarComponent from "./NotificationsComponent/CalendarComponent";
import Spinner from "../SpinnerComponent/SpinnerComponent"
import { FetchedMountain } from "../../store/actions/fetchedMountain";
import { search } from "../../store/actions/searchAction";
import { SendNotificationData } from "../../store/actions/sendNotificationdataAction";
import "../TicketsComponent/modals/modal.scss";
import "../TicketsComponent/Stripe/ChangeTicketDates.css";
import "./PassengerNotification.scss";

const PassengerNotificationComponent = ({ form, fetchedMountain, mountainList, search, stops, sendNotificationData, pending, startDateList, notificationDataSuccess }) => {
    const [ state,setState ] = useState({
        mountain:"Whistler",
        startDate:"",
        from:"",
        to:"",
        message:"",
        pickup:[],
        dropOff:"",
        filterItem:[],
        time:[],
        timeRequired: false
    });
    const [ phoneMessage,setPhoneMessage ] = useState(false);
    const { from, to, mountain, startDate, message, messageType, pickup, filterItem, time, timeRequired } = state;
    const { getFieldDecorator } = form;
    const { Option } = Select;

    useEffect(() => {
        fetchedMountain()
    },[]);

    useEffect(() => {
        const pickupData = startDateList && startDateList.filter(i => pickup.includes(i.pickUp.supplierPickupName));
        let filterItem = [];
        if(pickupData){
            filterItem = [...new Set(pickupData.map(data => data.pickUp.supplierPickupTime))];
            if (stops.dep.pickup.length === pickup.length) {
                if (filterItem.length > 4) {
                    const selectedTimes = filterItem.slice(0,4);
                    setState({
                        ...state,
                        time: selectedTimes,
                        filterItem
                    })
                } else{
                    setState({
                        ...state,
                        time: filterItem,
                        filterItem
                    })
                }
            } else{
                setState({
                    ...state,
                    filterItem
                })
            }
        }
    },[pickup]);

    useEffect(()=>{
        if (startDate.length > 0 && from.length > 0 && to.length > 0){
            const searchDate = {
                from,
                to,
                startDate,
                traveler: { adult: 1, total: 1}
            };
            search(searchDate)
        }
    },[from,to,startDate]);

    const handleChangeMountain = (eventValue,name) => {
        if(name === "time"){
            if (eventValue && eventValue.length && eventValue.includes("all")) {
                if(eventValue.length === filterItem.length + 1){
                    setState({
                        ...state,
                        [name]:[]
                    });
                    return [];
                } else{
                    setState({
                        ...state,
                        [name]:filterItem
                    })
                    return filterItem
                }
            } else {
                setState({
                    ...state,
                    [name]: eventValue
                })
                return eventValue;
            }
        }
        if(name === "pickup"){
            if(eventValue && eventValue.length && eventValue.includes("all")){
                if(eventValue.length === stops.dep.pickup.length + 1){
                    setState({
                        ...state,
                        [name]:[]
                    })
                    return []
                } else{
                    setState({
                        ...state,
                        [name]: stops.dep.pickup
                    })
                    return stops.dep.pickup
                }
            } else{
                setState({
                    ...state,
                    [name]: eventValue
                });
                return eventValue
            }
        }

        if (name === "message"){
            const { value } = eventValue.target;
            setState({
                ...state,
                [name]:value
            })
            return;
        }
        if (name === "mountain"){
            setState({
                ...state,
                [name]:eventValue,
                from:"",
                to:""
            });
            return;
        }

        setState({
            ...state,
            [name]:eventValue
        });
    };

    const sendFormDate = (e) => {
        e.preventDefault();
        let messageValidation = true;
        if (messageType === "phone" && message.length > 160){
            messageValidation = false;
            setPhoneMessage(true)
        }
        if ( (messageType === "phone" && message.length < 160) || (messageType === "email" && message.length > 160) ){
            setPhoneMessage(false)
        }
        form.validateFields((err, values) => {
            if ( time.length === 0 ) {
                return setState({
                    ...state,
                    timeRequired: true
                })
            }
            if (time.length > 0 && timeRequired){
                return setState({
                    ...state,
                    timeRequired: false
                })
            }
            if ( !err && messageValidation ) {
                const requestData = {
                    departure:from,
                    destination:to,
                    date:startDate,
                    time:time,
                    fromSpot:pickup,
                    message:message,
                    type:messageType
                }
                sendNotificationData(requestData)
            }
        });
    };

    if(notificationDataSuccess){
        setTimeout(async () => {
            const a = await swal({
                title: "Success",
                text: "You have successfully send your notification",
                icon: "success",
                dangerMode: false,
                className: ""
            });
            if (a === true || a === null) {
                window.location.reload();
            }
        }, 200);
    }

    if(notificationDataSuccess === false){
        setTimeout(async () => {
            const a = await swal({
                title: "Error",
                text: "Something went wrong.Please try again",
                icon: "error",
                dangerMode: false,
                className: ""
            });
            if (a === true || a === null) {
                window.location.reload();
            }
        }, 200);
    };

    return(
        <>
            <div className="notification-data notification-component">
                <h2 className="markdown-header">Passenger Notifications</h2>
                <Form onSubmit={sendFormDate}>
                    <LeavingFromToComponent
                        mountainList={mountainList}
                        to={to}
                        mountain={mountain}
                        handleChangeMountain={handleChangeMountain}
                        getFieldDecorator={getFieldDecorator}
                        from={from}
                    />
                    <CalendarComponent
                        getFieldDecorator={getFieldDecorator}
                        handleChangeMountain={handleChangeMountain}
                    />
                    <DropOffPickUpLocationsComponent
                        getFieldDecorator={getFieldDecorator}
                        stops={stops}
                        handleChangeMountain={handleChangeMountain}
                    />
                    <div className="notification-item time-item">
                        <Form.Item
                            name="time"
                            rules={[{ required: true, }]}
                        >
                            <label htmlFor="" className="ant-form-item-required time-label">Time</label>
                                <Select placeholder="Time" value={time}  mode="multiple" onChange={(value) => handleChangeMountain( value,"time")}>
                                    { filterItem !== null &&  filterItem.length > 0 &&  <Option key="all" value="all">All times</Option> }
                                    { filterItem !== null &&  filterItem.length > 0 && filterItem.map((item,index) => (
                                        <Option key={index} value={item}>{item}</Option>
                                    )) }
                                </Select>
                        </Form.Item>
                        { timeRequired && <div className="required-remainder">
                            Please Select Time!
                        </div> }
                    </div>
                   <MessageComponent
                       phoneMessage={phoneMessage}
                       handleChangeMountain={handleChangeMountain}
                       getFieldDecorator={getFieldDecorator}
                   />
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            { pending &&  <Spinner/> }
        </>
    )
};

const mapStateToProps = state => ({
    mountainList:state.notification.mountainsListData,
    stops: state.search.stops,
    pending:state.notification.pending,
    startDateList:state.search.startDateList,
    notificationDataSuccess:state.notification.notificationDataSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchedMountain: () => dispatch(FetchedMountain()),
    search: (data) => dispatch(search(data)),
    sendNotificationData: (data) => dispatch(SendNotificationData(data))
});

const PassengerNotification = Form.create({ name: 'snowgroup_login' })(PassengerNotificationComponent);

export default connect(mapStateToProps,mapDispatchToProps) (PassengerNotification)