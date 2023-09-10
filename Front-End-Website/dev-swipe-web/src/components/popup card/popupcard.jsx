import React from "react";
import styles from './popup.module.css';

const PopUpCard = () =>{

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
                
            </div>
        </div>
    )
}

export default PopUpCard;