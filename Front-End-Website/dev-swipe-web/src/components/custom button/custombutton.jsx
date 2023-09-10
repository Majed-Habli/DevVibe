import React from "react";

const CustomButton = ({title, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, textAlign,fontSize, fontWeight, color, onClick}) => {

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor: 'pointer', display, alignItems, justifyContent}}
        onClick={onClick}>
            <div style={{ textAlign, fontSize, fontWeight, color}}>{title}</div>
        </div>
    )
}

export default CustomButton;