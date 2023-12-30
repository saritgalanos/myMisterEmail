// import { MyChart } from "../cmps/MyChart";
import React from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale,
    CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import { Pie, Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import faker from 'faker';



ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title);

export function Dashboard() {

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
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Pie Chart',
            },
        },
    };


    //////////////////////////////////////////////////////////////




    const options1 = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
            legend: {
                position: 'bottom',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data1 = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Dataset 3',
                data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ],
    };

    ///////////////////////////////////////////////////////////
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data2 = {
        labels2,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };





    ///////////////////////////////////////////////////////////////////////
    return (
        <div className="dashboard">
            <h1>Your Email Account Statistics</h1>

            <div className="charts-area">
                <div className="chart"> <Bar options={options1} data={data1} /></div>
                <div className="chart"> <Bar options={options2} data={data2} /></div>
                {/* <div className="chart"> <PolarArea data={data} /></div> */}
                <div className="chart">  <Pie options={options} data={data} /></div>

            </div>
        </div>
    )
}



