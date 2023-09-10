import React from "react";
import styles from './viewall.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";

const ViewAllPopUp = ({isOpen}) =>{
    
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>People interested in me</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel}/>
            </div>
            <div className={styles.popup_body}>
                <PopUpCard/>
            </div>
        </div>
    )
}

export default ViewAllPopUp;