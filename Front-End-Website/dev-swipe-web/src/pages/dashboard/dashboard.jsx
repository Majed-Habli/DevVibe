import React from "react";
import styles from './dashboard.module.css';
import InterestedTable from "../../components/interested users/interested";
import MatchedTable from "../../components/matched users/matched";
import AnalyticsComponent from "../../components/analytics/analytics";

const Dashboard = () =>{

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}>
                <div className={styles.statement}>Dashboard</div>
            </div>
            <div className={styles.component_container}>
                <div className={styles.component_container_left}>
                    <div className={styles.component_vertical_layout}>
                        <InterestedTable/>
                        <AnalyticsComponent/>
                    </div>
                </div>
                <div className={styles.component_container_right}>
                    <MatchedTable/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;