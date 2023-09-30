import React, { useEffect, useState } from "react";
import styles from './analytics.module.css';
import Donut from "../charts/donut/donut";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import { localStorageAction } from "../../utils/functions/localStorage";

const AnalyticsComponent = () =>{
    const [stats, setStats] = useState([]);
    const [error,setError] = useState('')

    const getStats = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/analysis",
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data;
                    setStats(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    useEffect(()=>{
        setStats({liked_count: stats && stats.liked_count ? stats.liked_count: '0',matched_count: stats && stats.matched_count ? stats.matched_count: '0',skipped_count: stats && stats.skipped_count ? stats.skipped_count: '0',view_count: stats && stats.view_count ? stats.view_count: '0'});
        getStats();
    },[]);

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                Statistics
            </div>
            <div className={styles.container_body}>
                <div className={styles.row_container}>
                    <div className={styles.count_container}>
                        <div className={styles.box_container}>
                            <div className={styles.txt}>{stats.view_count}</div>
                        </div>
                        <div className={styles.component_text}>Viewed</div>
                    </div>
                    <div className={styles.vertical_line}></div>
                </div>
                <div className={styles.chart_container}>
                    <Donut value={stats.matched_count} backgroundColor={'#3C8DBC'}/>
                    <div>matched</div>
                </div>
                <div className={styles.chart_container}>
                    <Donut value={stats.skipped_count} backgroundColor={'#00A65A'}/>
                    <div>skipped</div>
                </div>
                <div className={styles.chart_container}>
                    <Donut value={stats.liked_count} backgroundColor={'#39CCCC'}/>
                    <div>liked</div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsComponent;