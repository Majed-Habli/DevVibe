import React from "react";
import styles from './analytics.module.css';

const AnalyticsComponent = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                Statistics
            </div>
            <div className={styles.container_body}></div>
        </div>
    )
}

export default AnalyticsComponent;