import React, { useEffect, useState } from 'react';
import './../Statistics.css';
import BarChart from '../../../components/chart/BarChart';

const Statistics1 = ({ }) => {
  let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  let options1 = {
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
  }

  let data1 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5, 6, 7], //실제 그려지는 데이터(Y축 숫자)
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [2, 3, 4, 5, 4, 7, 8],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  let options2 = {
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
  }

  let data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5, 6, 7], //실제 그려지는 데이터(Y축 숫자)
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [2, 3, 4, 5, 4, 7, 8],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div>
      <div className='dashboard-stat'>
        <div className="dashboard-stat-table">
          <div className='stat-table'>
            <div className='stat-title'>
              총 등록 박물 수
            </div>
            <div className='stat-value'>
              3,976 건
            </div>
          </div>
        </div>

        <div className="dashboard-stat-table">
          <div className='stat-table'>
            <div className='stat-title'>
              총 유실 건 수
            </div>
            <div className='stat-value'>
              98 건
            </div>
          </div>
        </div>

        <div className="dashboard-stat-table">
          <div className='stat-table'>
            <div className='stat-title'>
              총 파손 건 수
            </div>
            <div className='stat-value'>
              198 건
            </div>
          </div>
        </div>
      </div>

      <div className='dashboard-chart'>
        <div className='dashboard-chart-table'>
          <BarChart options={options1} data={data1} />
        </div>
        <div className='dashboard-chart-table'>
          <BarChart options={options2} data={data2} />
        </div>
      </div>
    </div>
  );
};

export default Statistics1;