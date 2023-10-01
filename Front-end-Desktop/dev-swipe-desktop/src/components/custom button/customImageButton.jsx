import React from "react";

const CustomImageButton = ({image_name, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, onClick ,image_width, image_height, text, columnGap, padding, boxShadow, flexDirection, cursor, color, fontsize, fontweight}) => {

    const image_url = `/${image_name}`;
    const txt = text;

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor, display, alignItems, justifyContent, columnGap, padding, boxShadow, flexDirection}}
        onClick={onClick}>
            <img style={{width: image_width,height: image_height}} src= {image_url} alt="" />
            {txt &&(
                <div style={{color, fontsize, fontweight}}>{text}</div>
            )}
        </div>
    )
}

export default CustomImageButton;