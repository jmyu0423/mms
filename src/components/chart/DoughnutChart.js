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
  import { Chart, Doughnut } from 'react-chartjs-2';
  import React, { useEffect, useState } from 'react';
  import { styled } from '@mui/material/styles';
  import {
      Box, Stack, Table, TableBody, TableCell, TableRow, Typography
  } from '@mui/material';
  
  ChartJS.register(ArcElement, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);
  
  const BarChart = ({ options, data }) => {
  
      return (
        <div style={{width: '100%', height: '100%'}}>
            <Doughnut options={options} data={data} />
        </div>
      )
  }
  export default BarChart;