import React from "react"
import swal from "sweetalert";

const SuccessErrorModal = ({ success,error, url }) => {
    if(error){
        setTimeout(async () => {
            const a = await swal({
                title: "Error",
                text: error ? error : "Something went wrong.Please try again",
                icon: "error",
                dangerMode: false,
                className: ""
            });
            if (a === true || a === null) {
                window.location.reload(true);
            }
        }, 200);
    }
    if(success){
        setTimeout(async () => {
            const a = await swal({
                title: "Success",
                text:  success,
                icon: "success",
                dangerMode: false,
                className: ""
            });
            if ((a === true || a === null) && !url) {
                window.location.reload(true);
            }
            if((a === true || a === null) && url){
                window.location.href = `/${url}`
            }
        }, 200);
    }
    return(
        <></>
    )
};

export default SuccessErrorModal