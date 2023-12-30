
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register( ArcElement, Tooltip, Legend);



export function MyChart() {

    const data = {
        labels: ['Sent', 'Received'],
        datasets: [
            {
                label: '# of Votes',
                data: [599, 336],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <Doughnut data={data} />
            <Doughnut data={data} />
            <Doughnut data={data} />
            <Doughnut data={data} />
        </>
    )
}
