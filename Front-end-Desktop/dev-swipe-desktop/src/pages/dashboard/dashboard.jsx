import React, { useState,useEffect } from "react";
import styles from '../../styles/dashboard.module.css'
import AnalyticsCard from "../../components/analytics card/card";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import InfoBox from "../../components/widgets/info-box";
import BarChart from "../../components/bar chart/barchart";
import Map from "../../components/bar chart/map";
import BarChart2 from "../../components/bar chart/barchart2";

const Dashboard = () =>{
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [mapInfo,setMapInfo] = useState('');
    const [mapData,setMapData] = useState('');

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
                const token = " ";
    
                if(data.status == 'success'){
                    setInfo(data);
                    setMapData(data.country_people_count)

                }else{
                    setError("failed to get data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api returned with a fail:", error);
          }
    }

    function transformCountryPeopleCount(countryPeopleCount) {
        return countryPeopleCount.reduce((result, item) => {
          result[item.country] = item.count;
          return result;
        }, {});
    }
    
    useEffect(()=>{
        getAnalytics();
    },[]);

    useEffect(()=>{
        if(mapData){
            setMapInfo(transformCountryPeopleCount(mapData));
        }
    },[mapData])

    return(
        <div className={styles.container}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css" type="text/css" media="screen"/>
            <div className={styles.page_header}>
                <span>Summary</span>
            </div>
            <div className={styles.card_conatiner}>
                <InfoBox data={info.users_count} type={'user'} title={'Users'} backgroundColor={'#17A2B8'} color={'#1591A5'}/>
                <InfoBox data={info.developer_count} type={'devs'} title={'Developers'} backgroundColor={'#28A745'} color={'#228E3B'}/>
                <InfoBox data={info.recruiters_count} type={'recs'} title={'Recruiters'} backgroundColor={'#F8B020'} color={'#E5AD06'}/>
                <InfoBox data={info.matches_count} type={'matches'} title={'Matches'} backgroundColor={'#DC3545'} color={'#C6303E'}/>
            </div>
            <div className={`${styles.card_conatiner} ${styles.cont}`}>
                <div className={styles.left_container}>
                    <Map mapData={mapInfo}/>
                </div>
                <div className={styles.right_container}>
                    <BarChart label1={'Developers'} label2={"Recruiters"} data1={info.developers_chart_count} data2={info.recruiters_chart_count}/>
                    <BarChart2 label1={'Male'} label2={"Female"} data1={info.male_count} data2={info.female_count}/>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;