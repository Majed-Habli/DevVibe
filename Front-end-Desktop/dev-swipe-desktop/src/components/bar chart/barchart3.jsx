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
            text: 'Top 10 skills w/ user count',
          },
        },
      };
      
      const labels = [];

      const data = {
        labels: lab,
        datasets: chartss
          ? [
              {
                label: "count",
                data: chartss.map((item) => item.data),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ]
          : [],
      };
      
    return(
        <div className={`${styles.container} ${styles.container_two}`}>
            {data &&<Bar options={options} data={data} />}
        </div>
    )
}

export default BarChart3;