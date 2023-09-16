import React, { useState,useEffect } from "react";
import styles from '../../styles/dashboard.module.css'
import AnalyticsCard from "../../components/analytics card/card";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import InfoBox from "../../components/widgets/info-box";
import BarChart from "../../components/bar chart/barchart";

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
    useEffect(()=>{
        getAnalytics();
    },[]);
    console.log(info.developers_chart_count,'counting here')
    console.log(info.recruiters_chart_count,'nthn here')

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Dashboard</span>
            </div>
            {/* <div className={styles.card_conatiner}>
                <AnalyticsCard data={info.new_recs_count} type={'recs'} title={'New Recruiters'} backgroundColor={'#17A2B8'} color={'#1591A5'}/>
                <AnalyticsCard data={info.new_devs_count} type={'devs'} title={'New Developers'} backgroundColor={'#28A745'} color={'#228E3B'}/>
                <AnalyticsCard data={info.skills_count} type={'skills'} title={'Skills'} backgroundColor={'#F8B020'} color={'#E5AD06'}/>
                <AnalyticsCard data={info.countries_count} type={'countries'} title={'Countries'} backgroundColor={'#DC3545'} color={'#C6303E'}/>
            </div> */}
            <div className={styles.card_conatiner}>
                <InfoBox data={info.users_count} type={'user'} title={'Users'} backgroundColor={'#17A2B8'} color={'#1591A5'}/>
                <InfoBox data={info.developer_count} type={'devs'} title={'Developers'} backgroundColor={'#28A745'} color={'#228E3B'}/>
                <InfoBox data={info.recruiters_count} type={'recs'} title={'Recruiters'} backgroundColor={'#F8B020'} color={'#E5AD06'}/>
                <InfoBox data={info.matches_count} type={'matches'} title={'Matches'} backgroundColor={'#DC3545'} color={'#C6303E'}/>
            </div>
            <div className={styles.card_conatiner}>
                <div className={styles.left_container}></div>
                <div className={styles.right_container}>
                    <BarChart label1={'Developers'} label2={"Recruiters"} data1={info.developers_chart_count} data2={info.recruiters_chart_count}/>
                    <BarChart label1={'Developers'} label2={"Recruiters"} data1={info.developers_chart_count} data2={info.recruiters_chart_count}/>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;