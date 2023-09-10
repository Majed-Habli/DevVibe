import React from "react";

const CustomImageButton = ({image_name, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, onClick}) => {
    const image_url = `/${image_name}`

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor: 'pointer', display, alignItems, justifyContent}}
        onClick={onClick}>
            <img src= {image_url} alt="" />
        </div>
    )
}

export default CustomImageButton;