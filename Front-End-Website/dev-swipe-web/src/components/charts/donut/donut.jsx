import React from "react";
import {Doughnut} from 'react-chartjs-2';
import styles from './donut.module.css';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(
    ArcElement, Tooltip, Legend
);

const Donut = ({backgroundColor, value}) =>{

    const data  = {
        labels: [],
        datasets: [{
            label: '',
            data: [`${value}`,100],
            backgroundColor: [`${backgroundColor}`, '#EEEEEE'],
        }]
    }

    const options = {
        responsive: true,
        plugins: {
        tooltip: {
            enabled: false
        }
        }
    }

    const centerText = {
        id: 'centerText',
        beforeDatasetsDraw(chart, args, pluginOptions){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 12px sans-serif';
            ctx.fillStyle = `${backgroundColor}`;
            ctx.textAlign = 'center';
            ctx.textBaseLine = 'middle';
            ctx.fillText(data.datasets[0].data[0], chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }

    return(
        <div className={styles.container}>
            <Doughnut data={data} options={options} plugins={[ centerText]}/>
        </div>
    )
}

export default Donut;