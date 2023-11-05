import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import React, { useEffect, useState } from 'react';

Chart.register(...registerables)
const BarChart = ({ options, data }) => {
    console.log(options)
    console.log(data)

    return (
        <Bar options={options} data={data} />
    )
}
export default BarChart;