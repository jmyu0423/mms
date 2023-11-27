import React, { useEffect, useState } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import PageTitle from 'src/components/layout/PageTitle';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import BarChart from 'src/components/chart/BarChart';
import CustomDatePicker from 'src/components/CustomDatePicker';
import dayjs from 'dayjs';
import {BaseButton, DangerButton, NormalButton} from 'src/components/CustomButton';
import AgGrid from "src/components/AgGrid";

const PageContainer = styled(Container)(
  ({ theme }) => `
		// & .MuiContainer-root: {
		//  @media (min-width: ${theme.breakpoints.values.lg}px) {
		//    max-width:none;
		//  };
		// };
		
		padding-bottom: 10px;
		@media (min-width: ${theme.breakpoints.values.lg}px) {
		  max-width:none;
		};
		@media (min-width: ${theme.breakpoints.values.sm}px) {
		  padding-left: 10px;
		  padding-right: 10px;
  
		};
	`
);

const WngCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 12px'
}));

const Statistics2 = ({}) => {
  const imgSize = { maxHeight: "100%", maxWidth: "100%", cursor: "pointer", display: "flex" };
  const [startDt, setStartDt] = useState(dayjs(new Date()).subtract(1, "month"))
  const [endDt, setEndDt] = useState(dayjs(new Date()));
  // const [endDt, setEndDt] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]);
  const [singleCurrRowData, setSingleCurrRowData] = useState({});
  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false);
  //수정모달 컨트롤 state
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'number', headerName: 'No.', flex: 1.5, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    {
      field: 'image', headerName: '대표 이미지', flex: 2.5, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true,
      cellRenderer: function (row) {
        if (row.data.imageList && row.data.imageList.length > 0) {
          return (
            <div className="" onClick={(e) => { openPreviewModal(row) }}>
              <img
                style={imgSize}
                loading="lazy"
                src={row.data.imageList[0].imageSrc}
              />
            </div>
          );
        } else return null;
      },
    },
    { field: 'affiliation', headerName: '소장품 소속', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'number', headerName: '소장품 번호', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'detailNumber', headerName: '세부 번호', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'name', headerName: '명칭', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'mainCnt', headerName: '주수량', flex: 1.2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'subCnt', headerName: '부수량', flex: 1.2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    {
      field: '', headerName: 'action', flex: 2, cellStyle: { textAlign: "center" },
      cellRenderer: function (row) {
        return (
          <div>
            <Button style={{ padding: 0, fontWeight: "bold" }} onClick={(e) => openUpdateModal(row)}>수정</Button>
          </div>
        )
      }
    }
  ]);
  
  let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  let options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
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

  const openPreviewModal = (row) => {
    setSingleCurrRowData(row.data);
    setOpenPreview(true);
  }

  const openUpdateModal = (row) => {
    setSingleCurrRowData(row.data);
    setOpenUpdate(true);
  }

  const onRowClicked = (row: any) => {
    setSelectedRow(row);
  }

  //최근 7일
  const setDate1 = () =>{
    setStartDt(dayjs(new Date()).subtract(7, "day"))
    setEndDt(dayjs(new Date()))
  }

  //당월
  const setDate2 = () =>{
    setStartDt(dayjs(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)))
    setEndDt(dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), 0)))
  }

  //3개월
  const setDate3 = () =>{
    setStartDt(dayjs(new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate())))
    setEndDt(dayjs(new Date()))
  }

  //6개월
  const setDate4 = () =>{
    setStartDt(dayjs(new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate())))
    setEndDt(dayjs(new Date()))
  }

  //조회
  const searchData = () =>{

  }

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading="재질별 등록 통계" />
      </PageTitleWrapper>
      <PageContainer>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <WngCard style={{ display: 'block', marginBottom: '10px' }}>
              <Grid xs={12} style={{height: '220px'}}>
                <BarChart options={options1} data={data1} />
              </Grid>
            </WngCard>
            <WngCard style={{ display: 'block', marginBottom: '10px' }}>
              <Box>
                <Box sx={{float: 'left'}}>
                  <CustomDatePicker startDt={startDt} endDt={endDt} setStartDt={setStartDt} setEndDt={setEndDt}/>
                </Box>
                <Box sx={{float: 'right', position: 'relative', top: '5px'}}>
                    <NormalButton onClick={(e) => setDate1()}>최근 7일</NormalButton>
                    <NormalButton onClick={(e) => setDate2()}>당월</NormalButton>
                    <NormalButton onClick={(e) => setDate3()}>3개월</NormalButton>
                    <NormalButton onClick={(e) => setDate4()}>6개월</NormalButton>
                    <BaseButton onClick={(e) => searchData()}>조회</BaseButton>
                </Box>
              </Box>
              
            </WngCard>
            <WngCard style={{ display: 'block' }}>
              <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                <AgGrid
                  setRef={setgridState} // Ref for accessing Grid's API
                  rowData={rowData} // Row Data for Rows
                  columnDefs={columnDefs} // Column Defs for Columns
                  onRowClicked={onRowClicked}
                  heightVal={485}
                />
              </Box>
            </WngCard>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Statistics2;