import React from "react";
import styles from '../../styles/analytics-card.module.css';
import { TbUsersPlus } from 'react-icons/tb';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const AnalyticsCard = ({data}) => {

    return(
        <div className={styles.container}>
            <div className={styles.top_container}>
                <div className={styles.left_container}>
                    <div className={styles.number_container}>{120}</div>
                    <div className={styles.statement}>new users</div>
                </div>
                <div className={styles.right_container}>
                    <TbUsersPlus  color="#00A3CB" size={80}/>
                </div>
            </div>
            <div className={styles.cta}>
                <span>More info</span>
                <BsFillArrowRightCircleFill fill="white" color="white" size={14}/>
            </div>
        </div>
    )
}

export default AnalyticsCard;