import React from 'react';
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

const BarChart = ({label1, label2, data1, data2}) =>{
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Developers V.S. Recruiters /year',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September', 'October', 'November', 'December'];
      
      const data = {
        labels,
        datasets: [
          {
            label:`${label1}`,
            data: data1 ? Object.values(data1).map((dat)=>dat.count) : [],
            backgroundColor: '#FCC860',
          },
          {
            label: `${label2}`,
            data: data2 ? Object.values(data2).map((da)=>da.count) : [],
            backgroundColor: '#1E282C',
          },
        ],
      };

    return(
        <div className={styles.container}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarChart;