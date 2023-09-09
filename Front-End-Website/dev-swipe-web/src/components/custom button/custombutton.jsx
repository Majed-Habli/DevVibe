import React from "react";

const CustomButton = ({title, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, textAlign, color, onClick}) => {

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor: 'pointer', display, alignItems, justifyContent, textAlign, color}}
        onClick={{onClick}}>
            <div>{title}</div>
        </div>
    )
}

export default CustomButton;