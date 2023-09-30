import React from "react";
import styles from './custombutton.module.css';

const CustomButton = ({title, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, textAlign,fontSize, fontWeight, color, grow, image_url, onClick}) => {

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor: 'pointer', display, alignItems, justifyContent}}
        onClick={onClick}>
            <div style={{ textAlign, fontSize, fontWeight, color}} className={grow ? styles.grow : ''}>{title} {image_url? <img style={{image_width: width, image_height: height}} src={image_url}/> : ''}</div>
            
        </div>
    )
}

export default CustomButton;