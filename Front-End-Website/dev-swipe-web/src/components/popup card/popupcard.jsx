import React from "react";
import styles from './popupcard.module.css';
import CustomImageButton from "../custom button/customImageButton";

const PopUpCard = ({isOpen}) =>{

    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.user_profile}>
                    <img src="/testuser.png" alt="profile image" />
                </div>
                <div className={styles.user_detail}>
                    <div className={styles.user_name}></div>
                    <div className={styles.user_date}></div>
                </div>
            </div>
            <div className={styles.container_right}>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#F47878"} onClick={hideModel}/>
            </div>
        </div>
    )
}

export default PopUpCard;