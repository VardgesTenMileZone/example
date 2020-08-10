import React, {useEffect, useState} from "react";
import InnerPageComponent from "../../components/InnerPageComponent/InnerPageComponent";
import PassengerNotificationComponent from "../../components/PassengerNotifications/PassengerNotifications";

const PassengerNotificationsContainer = () => {
    const [name,setName] = useState("Vardges");

    useEffect(() => {
        console.log(name)
    },[name])
    return(
        <>
            <InnerPageComponent>
                <PassengerNotificationComponent/>
            </InnerPageComponent>
        </>
    )
};

export default PassengerNotificationsContainer