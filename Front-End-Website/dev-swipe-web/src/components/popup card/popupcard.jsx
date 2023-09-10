import React from "react";
import styles from './popupcard.module.css';
import CustomImageButton from "../custom button/customImageButton";

const PopUpCard = ({}) =>{

    return(
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.user_profile}>
                    <img src="/testuser.png" alt="profile image" />
                </div>
                <div className={styles.user_detail}>
                    <div className={styles.user_name}>majed</div>
                    <div className={styles.user_date}>7/12/2022</div>
                </div>
            </div>
            <div className={styles.container_right}>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#F47878"}/>
                <CustomImageButton image_name={"Done.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} backgroundColor={"#A7E392"}/>
            </div>
        </div>
    )
}

export default PopUpCard;