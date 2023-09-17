import React, { useEffect } from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from '../../styles/charts.module.css';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart3 = ({lab,chartss}) =>{
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Developers vs Recruiters /year',
          },
        },
      };
      
      const labels = [];
    //   const obj = [];

    //   const setLabels = (information) =>{ 
    //     console.log(information,"my information is here")

    //     const lab = information.map((item)=>{
    //       return item.skill.name 
    //     })

    //     labels.length = 0; 
    //     labels.push(...lab); 

    //     const info = information.map((item)=>{
    //       return {label: item.skill.name ,data: item.count ,background: 'rgba(53, 162, 235, 0.5)'}
    //     })
        
    //     obj.length = 0;
    //     obj.push(...info)

    //   return lab
    // }

    // const lolo =[]
    // const heythere = ()=>{
    //   const meh = obj.map((item)=>{
    //     return item.data
    //   })
    //   lolo.push(...meh)

    // }

      // useEffect(()=>{
      //   if(information){
      //     setLabels(information)
      //     heythere()
      //   }
      console.log(lab,'lab was here u butt')
      console.log(chartss,'chartssssssss')
      // console.log(obj,'here u go obj')
      // console.log(lolo,'here u go lolo')

      // },[information])

      const data = {
        labels : lab,
        datasets:  [
          chartss ? chartss.map((value)=> ({
            label: value.name,
            data:  2,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          })) : {
            label:"hey",
            data:  2,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },

        ],
        // [
          // {
          //   label: `${label2}`,
          //   data:  `${data2}`,
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
        // ],
      };

    return(
        <div className={styles.container}>
            {data &&<Bar options={options} data={data} />}
        </div>
    )
}

export default BarChart3;