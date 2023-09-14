import React from "react";
import styles from '../../styles/dashboard.module.css'
import AnalyticsCard from "../../components/analytics card/card";

const Dashboard = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Dashboard</span>
            </div>
            <div className={styles.card_conatiner}>
                <AnalyticsCard/>
            </div>
        </div>
    )
}

export default Dashboard;