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

const BarChart3 = ({information}) =>{
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

      const setLabels = (information) =>{ 
        console.log(information,"my information is here")

        const here = information.map((item)=>{
          return item.skill.name 
        })

        labels.length = 0; 
        labels.push(...here); 

      return here
    }

      useEffect(()=>{
        if(information){
          setLabels(information)

        }
      console.log(labels,'here u go')

      },[information])

      const data = {
        labels,
        datasets: [
          // {
          //   label:`${label1}`,
          //   data:  `${data1}`,
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          // },
          // {
          //   label: `${label2}`,
          //   data:  `${data2}`,
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
        ],
      };

    return(
        <div className={styles.container}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarChart3;