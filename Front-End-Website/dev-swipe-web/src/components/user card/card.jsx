import React from "react";
import styles from './card.module.css';
import CustomButton from "../custom button/custombutton";

const Card = ({button}) =>{

    return(
        <div className={styles.card_container}>
            <div className={styles.container_left}>
                <div className={styles.profile_image_container}>
                    <img src="/testuser.png" alt="" />
                </div>
                <div className={styles.user_name}>majed</div>
            </div>
            {/* <div className={styles.container_rigth}></div> */}
            {button &&(
                <CustomButton title={"view profile"}/>
            )}
        </div>
    )
}

export default Card;