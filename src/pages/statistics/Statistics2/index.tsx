import React, { useEffect, useState } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import PageTitle from 'src/components/layout/PageTitle';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import BarChart from 'src/components/chart/BarChart';

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

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading="재질별 등록통계" />
      </PageTitleWrapper>
      <PageContainer>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <WngCard style={{ display: 'block', marginBottom: '20px' }}>
              <Grid xs={12}>
                <CardContent sx={{ padding: 0, flexGrow: 8 }}>
                <BarChart options={options1} data={data1} />
                  
                </CardContent>
              </Grid>
            </WngCard>
            <WngCard style={{ display: 'block' }}>
              <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                {/* <AgGrid
                  setRef={setgridState} // Ref for accessing Grid's API
                  rowData={rowData} // Row Data for Rows
                  columnDefs={columnDefs} // Column Defs for Columns
                  onRowClicked={onRowClicked}
                  heightVal={850}
                /> */}
              </Box>
            </WngCard>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Statistics2;