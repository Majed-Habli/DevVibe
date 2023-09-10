import React from "react";
import {Doughnut} from 'react-chartjs-2';
import styles from './donut.module.css';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(
    ArcElement, Tooltip, Legend
);

const Donut = () =>{

    const data  = {
        labels: [],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgroundColor: ['#F56954', '#EEEEEE'],
        }]
    }

    const options = {

    }

    return(
        <div className={styles.container}>
            <Doughnut data={data} options={options}/>
        </div>
    )
}

export default Donut;