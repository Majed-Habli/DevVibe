import React, {useState, useEffect} from 'react';
import styles from '../../styles/dashboard.module.css';
import AnalyticsCard from '../../components/analytics card/card';
import InfoBox from '../../components/widgets/info-box';
import { localStorageAction } from '../../utils/functions/localStorage';
import { sendRequest } from '../../utils/functions/axios';
import { requestMethods } from '../../utils/functions/requestMethods.';
import BarChart3 from '../../components/bar chart/barchart3';
import CardCarouselComp from '../../components/carousel/card';

const Stats = () =>{
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [chart, setChart] = useState('');
    const [carousel, setCarousel] = useState([]);
    const [labels,setLabels] = useState([])
    const [obj,setObj] = useState([])

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
                    setChart(data.popular);
                    setCarousel(data.popular_users);

                }else{
                    setError("failed to get data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api returned with a fail:", error);
          }
    }


      const mapLabels = (information) =>{ 

        const lab = information.map((item)=>{
          return item.skill.name 
        })

        let labels = []; 
        labels.push(...lab); 

        const info = information.map((item)=>{
          return {name: item.skill.name ,data: item.count ,background: 'rgba(53, 162, 235, 0.5)'}
        })
        
        let obj= [];
        obj.push(...info)

      setLabels(labels)
      setObj(obj)
    }

    useEffect(()=>{
        getAnalytics();
    },[]);

    useEffect(()=>{
    if(chart){
        mapLabels(chart)
    }
    },[chart])

    console.log('carosuel',carousel)

    //   const majed = [{name: 'PHP', data: 2, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'Bootstrap', data: 2, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'Html', data: 1, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'C++', data: 1, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'Node.js', data: 1, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'Flutter', data: 1, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'React', data: 1, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'Git', data: 1, background: 'rgba(53, 162, 235, 0.5)'},
    //   {name: 'MySQL', data: 1, background: 'rgba(53, 162, 235, 0.5)'}]

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Stats</span>
            </div>
            <div className={styles.card_conatiner}>
                <AnalyticsCard data={info.new_recs_count} type={'recs'} title={'New Recruiters'} backgroundColor={'#17A2B8'} color={'#1591A5'} location={'dashboard/users/new-recruiters'}/>
                <AnalyticsCard data={info.new_devs_count} type={'devs'} title={'New Developers'} backgroundColor={'#28A745'} color={'#228E3B'} location={'dashboard/users/new-developers'}/>
                <AnalyticsCard data={info.skills_count} type={'skills'} title={'Skills'} backgroundColor={'#F8B020'} color={'#E5AD06'} location={'dashboard/skills'}/>
                <AnalyticsCard data={info.countries_count} type={'countries'} title={'Countries'} backgroundColor={'#DC3545'} color={'#C6303E'} location={'dashboard'}/>
            </div>
            <div className={`${styles.card_conatiner} ${styles.cont_two}`}>
                <div className={styles.left_container}>
                    <BarChart3 lab={labels} chartss={obj}/>
                </div>
                <div className={styles.right_container}>
                    <CardCarouselComp information={carousel} issue={error}/>
                    {/* <BarChart label1={'Developers'} label2={"Recruiters"} data1={info.developers_chart_count} data2={info.recruiters_chart_count}/> */}
                    {/* <BarChart2 label1={'male'} label2={"female"} data1={info.male_count} data2={info.female_count}/> */}
                </div>
            </div>
        </div>
    )
}

export default Stats;