import React from "react";
import styles from '../../styles/analytics-card.module.css';
import { TbUsersPlus } from 'react-icons/ai';

const AnalyticsCard = () => {

    return(
        <div className={styles.container}>
            <div className={styles.left_container}>
                <div className={styles.number_container}>120</div>
                <div className={styles.statement}>new users</div>
            </div>
            <div className={styles.right_container}>
                <TbUsersPlus fill="white" />
            </div>
        </div>
    )
}

export default AnalyticsCard;