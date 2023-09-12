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
        const userId = localStorageAction("user_id");

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
                // console.log("analysis res", response)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data;
                    // console.log("analysis obj",obj)
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
    // console.log(stats.matched_count)

    useEffect(()=>{
        setStats({liked_count: stats && stats.liked_count ? stats.liked_count: '0',matched_count: stats && stats.matched_count ? stats.matched_count: '0',skipped_count: stats && stats.skipped_count ? stats.skipped_count: '0',viewed_count: stats && stats.viewed_count ? stats.viewed_count: '0'})
        getStats();
    },[]);

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
                    <Donut value={stats.matched_count} backgroundColor={'#3C8DBC'}/>
                    <div>matched</div>
                </div>
                <div className={`${styles.chart_container} ${styles.spacing}`}>
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