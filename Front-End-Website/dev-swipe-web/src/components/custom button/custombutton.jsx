import React from "react";
import styles from './custombutton.module.css';

const CustomButton = ({title, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, textAlign,fontSize, fontWeight, color, grow, onClick}) => {

    return(
        <div style={{width, height, backgroundColor, borderRadius, 
        cursor: 'pointer', display, alignItems, justifyContent}}
        onClick={onClick}>
            <div style={{ textAlign, fontSize, fontWeight, color}} className={grow ? styles.grow : ''}>{title}</div>
        </div>
    )
}

export default CustomButton;