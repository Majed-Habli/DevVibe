import React, { useState } from "react";
import styles from '../../styles/dashboard.module.css'
import AnalyticsCard from "../../components/analytics card/card";
import InfoBox from "../../components/widgets/info-box";

const Dashboard = () =>{
    const [error, setError] = useState('');

    

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Dashboard</span>
            </div>
            <div className={styles.card_conatiner}>
                <AnalyticsCard/>
                <InfoBox/>
            </div>
        </div>
    )
}

export default Dashboard;