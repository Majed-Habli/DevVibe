import React from "react";
import styles from '../../styles/analytics-card.module.css';
import { TbUsersPlus } from 'react-icons/tb';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const AnalyticsCard = () => {

    return(
        <div className={styles.container}>
            <div className={styles.top_container}>
                <div className={styles.left_container}>
                    <div className={styles.number_container}>120</div>
                    <div className={styles.statement}>new users</div>
                </div>
                <div className={styles.right_container}>
                    <TbUsersPlus fill="white" color="white" size={80}/>
                </div>
            </div>
            <div className={styles.cta}>
                <span>More info</span>
                <BsFillArrowRightCircleFill fill="white" color="white"/>
            </div>
        </div>
    )
}

export default AnalyticsCard;