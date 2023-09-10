import React from "react";
import styles from './dashboard.module.css';
import InterestedTable from "../../components/interested users/interested";
import MatchedTable from "../../components/matched users/matched";

const Dashboard = () =>{

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}>
                <div className={styles.statement}>Welcome, </div> {/*{localStorageAction("user_name")}*/}

            </div>
            <div className={styles.component_container}>
                <div className={styles.component_container_left}>
                    <div className={styles.component_vertical_layout}>
                        <InterestedTable/>
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