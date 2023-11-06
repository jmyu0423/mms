import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ArcElement,
} from 'chart.js';
import { Chart, Bar  } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box, Stack, Table, TableBody, TableCell, TableRow, Typography
} from '@mui/material';

ChartJS.register(ArcElement, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

const BarChart = ({ options, data }) => {

    return (
        <Bar options={options} data={data} />
    )
}
export default BarChart;