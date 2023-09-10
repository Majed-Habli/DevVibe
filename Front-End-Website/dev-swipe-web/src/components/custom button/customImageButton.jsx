import React from "react";

const CustomImageButton = ({image_name, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, onClick ,image_width, image_hieght}) => {

    const image_url = `/${image_name}`;

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor: 'pointer', display, alignItems, justifyContent}}
        onClick={onClick}>
            <img style={{width: image_width,height: image_hieght}} src= {image_url} alt="" />
        </div>
    )
}

export default CustomImageButton;