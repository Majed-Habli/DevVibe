import React, { useState,useEffect } from "react";
import styles from '../../styles/dashboard.module.css'
import AnalyticsCard from "../../components/analytics card/card";
import InfoBox from "../../components/widgets/info-box";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const Dashboard = () =>{
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const getAnalytics = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: '/user/admin/analytics',
                    method: requestMethods.GET,
                });
                const data = response;
                console.log(data)
                const token = " ";
    
                if(data.status == 'success'){
                    setInfo(data);

                }else{
                    setError("failed to get data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api returned with a fail:", error);
          }
    }
// console.log(info,"dev count")
    useEffect(()=>{
        getAnalytics();
    },[]);

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Dashboard</span>
            </div>
            <div className={styles.card_conatiner}>
                <AnalyticsCard data={info.new_devs_count} type={'devs'} backgroundColor={'#17A2B8'}/>
                <AnalyticsCard data={info.new_recs_count} type={'recs'} backgroundColor={'#17A2B8'}/>
                <AnalyticsCard data={info.new_recs_count} type={'skills'} backgroundColor={'#FCC860'}/>
                <AnalyticsCard data={info.new_recs_count} type={'recs'} backgroundColor={'#17A2B8'}/>
                {/* <InfoBox/> */}
            </div>
        </div>
    )
}

export default Dashboard;