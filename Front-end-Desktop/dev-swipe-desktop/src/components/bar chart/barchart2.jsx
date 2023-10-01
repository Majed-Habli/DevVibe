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

const BarChart2 = ({label1, label2, data1, data2}) =>{
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Male V.S. Female',
          },
        },
      };
      
      const labels = [' '];
      
      const data = {
        labels,
        datasets: [
          {
            label:`${label1}`,
            data:  `${data1}`,
            backgroundColor: '#FCC860',
          },
          {
            label: `${label2}`,
            data:  `${data2}`,
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

export default BarChart2;