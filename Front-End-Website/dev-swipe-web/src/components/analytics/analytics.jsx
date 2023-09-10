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
                <Donut/>
                <Donut/>
                <Donut/>
                <Donut/>

            </div>
        </div>
    )
}

export default AnalyticsComponent;