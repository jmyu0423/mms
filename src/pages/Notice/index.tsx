import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import { indigo } from '@mui/material/colors';
import { red, grey } from '@mui/material/colors';

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

const BaseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: indigo[400],
  width: 80,
  height: 30,
  fontSize: 15,
  marginRight: 5,
  '&:hover': {
    backgroundColor: indigo[600],
  },
}));

const DangerButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: red[300],
  width: 80,
  height: 30,
  fontSize: 15,
  marginRight: 0,
  '&:hover': {
    backgroundColor: red[400],
  },
}));

const Notice = () => {
  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const [selectedRow, setSelectedRow] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'resionNm', headerName: '번호', flex: 2, align: 'center', cellStyle: { textAlign: "center" } },
    { field: 'custNm', headerName: '제목', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'fullAddr', headerName: '이름', flex: 3, align: 'center', textAlign: 'center' },
    { field: 'custId', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'rtuSeq', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'multi', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'loraDevEui', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'eventCnt', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'dataEventSt', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'genCnt', headerName: '항목1', flex: 2, align: 'center', textAlign: 'center' }
  ]);

  const onRowClicked = (row: any) => {
    setSelectedRow(row);
  }

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading="공지사항" />
        <BaseButton>등록</BaseButton>
        <DangerButton>삭제</DangerButton>
        {/* <Button variant="outlined" size="small">등록</Button> */}
      </PageTitleWrapper>
      <PageContainer>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <WngCard style={{ display: 'block' }}>
              <Grid xs={12}>
                <CardContent sx={{ padding: 0, flexGrow: 8 }}>
                  <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                    <AgGrid
                      setRef={setgridState} // Ref for accessing Grid's API
                      rowData={rowData} // Row Data for Rows
                      columnDefs={columnDefs} // Column Defs for Columns
                      onRowClicked={onRowClicked}
                      heightVal={850}
                    />
                  </Box>
                </CardContent>
              </Grid>
            </WngCard>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Notice;