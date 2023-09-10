import React from "react";
import styles from './analytics.module.css';
import Donut from "../charts/donut/donut";

const AnalyticsComponent = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                Statistics
            </div>
            <div className={styles.container_body}>
                <div className={`${styles.chart_container} ${styles.spacing}`}>
                    <Donut value={30} backgroundColor={'#F56954'}/>
                    <div>Viewed</div>
                </div>
                <div className={styles.chart_container}>
                    <Donut value={55} backgroundColor={'#3C8DBC'}/>
                    <div>matched</div>
                </div>
                <div className={`${styles.chart_container} ${styles.spacing}`}>
                    <Donut value={13} backgroundColor={'#00A65A'}/>
                    <div>skipped</div>
                </div>
                <div className={styles.chart_container}>
                    <Donut value={70} backgroundColor={'#39CCCC'}/>
                    <div>liked</div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsComponent;