import React from "react";
import UserSnowPasses from "./UserSnowPasses";
import UserRental from "./UserRental";
import DiscountTable from "./DiscountTable";
import {Col} from "reactstrap";

const UserProduct = ({ individualUser, userDiscount, deleteDiscount }) => {
    const snowPasses = individualUser.products.filter(i => i.type === "snowpass");
    const rentalName = ["rental-skies","rental-snowboards"];
    const rentalTrips = individualUser.products.filter(i => rentalName.includes(i.type));
    return(
        <>
            <Col lg="12" xl="6">
                { snowPasses.length > 0 && <UserSnowPasses individualUser={individualUser}/> }
                { rentalTrips.length > 0 && <UserRental individualUser={individualUser}/> }
                { userDiscount.length > 0 && <DiscountTable userDiscount={userDiscount} deleteDiscount={deleteDiscount}/> }
            </Col>
        </>
    )
};

export default UserProduct