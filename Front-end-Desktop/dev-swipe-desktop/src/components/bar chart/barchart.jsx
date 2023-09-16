import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
            text: 'Chart.js Bar Chart',
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: `${label2}`,
            data: data2 ? Object.values(data2).map((da)=>da.count) : [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return(
        <Bar options={options} data={data} />
    )
}

export default BarChart;