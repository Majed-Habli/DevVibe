import React from "react";

const CustomButton = ({title, width, height, backgroundColor, borderRadius}) => {

    return(
        <div style={{width, height, backgroundColor, borderRadius, cursor: 'pointer'}}>
            <div>{title}</div>
        </div>
    )
}

export default CustomButton;