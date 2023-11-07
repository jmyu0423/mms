import React, { useEffect, useState } from 'react';
import './../Statistics.css';
import BarChart from '../../../components/chart/BarChart';
import DoughnutChart from '../../../components/chart/DoughnutChart';
import LineChart from 'src/components/chart/LineChart';
import MapChart from 'src/components/chart/MapChart';
import { redirect, useNavigate  } from 'react-router-dom';

const Statistics1 = ({ }) => {
  const navigate = useNavigate();
  let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  let options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      // title: {
      //   display: true,
      //   text: '재질별 등록통계',
      //   font: {
      //     size: 20,
      //     family: 'helvetical Neue'
      //   }
      // },
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart',
      // },
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

  let options3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart',
      // },
    },
  };

  let data3 = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ],
    text: "Total: 9000+"
  };



  // map chart
  let options4 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart',
      // },
    },
  }

  let data4 = {
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

  const redirectDetail = (e) =>{
    let type = e.currentTarget.title;

    if(type === "texture-detail"){
      navigate('/statistics/statistics2');
    }else if(type === "event-detail"){
      navigate('/statistics/statistics3');
    }else if(type === "year-detail"){
      navigate('/statistics/statistics4');
    }else if(type === "country-detail"){
      navigate('/statistics/statistics5');
    }else if(type === "donor-detail"){
      navigate('/statistics/statistics6');
    }
  }

  return (
    <div className='dashboard'>
      <div className='dashboard-main'>
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
            <div className='dashboard-chart-header'>
              <div className='dashboard-chart-title'>
                ● 재질별 등록 통계
              </div>
              <div className='dashboard-chart-detail-btn' title={'texture-detail'} onClick={(e)=>{redirectDetail(e)}}>
                <div className='detail-icon'></div>
              </div>
            </div>
            <BarChart options={options1} data={data1} />
          </div>
          <div className='dashboard-chart-table'>
            <div className='dashboard-chart-header'>
              <div className='dashboard-chart-title'>
                ● 행사별 등록 통계
              </div>
              <div className='dashboard-chart-detail-btn' title={'event-detail'} onClick={(e)=>{redirectDetail(e)}}>
                <div className='detail-icon'></div>
              </div>
            </div>
            <LineChart options={options2} data={data2} />
          </div>
        </div>

        <div className='dashboard-chart'>
          <div className='dashboard-chart-table'>
            <div className='dashboard-chart-header'>
              <div className='dashboard-chart-title'>
                ● 연도별 등록 통계
              </div>
              <div className='dashboard-chart-detail-btn' title={'year-detail'} onClick={(e)=>{redirectDetail(e)}}>
                <div className='detail-icon'></div>
              </div>
            </div>
            <DoughnutChart options={options3} data={data3} />
          </div>
          <div className='dashboard-chart-table'>
            <div className='dashboard-chart-header'>
              <div className='dashboard-chart-title'>
                ● 국가별 등록 통계
              </div>
              <div className='dashboard-chart-detail-btn' title={'country-detail'} onClick={(e)=>{redirectDetail(e)}}>
                <div className='detail-icon'></div>
              </div>
            </div>
            <MapChart options={options4} data={data4} />
          </div>
        </div>

        <div className='dashboard-chart'>
          <div className='dashboard-chart-table'>
            <div className='dashboard-chart-header'>
              <div className='dashboard-chart-title'>
                ● 기증자 등급별 등록 통계
              </div>
              <div className='dashboard-chart-detail-btn' title={'donor-detail'} onClick={(e)=>{redirectDetail(e)}}>
                <div className='detail-icon'></div>
              </div>
            </div>
            <DoughnutChart options={options3} data={data3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics1;