import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import BaseButton from 'src/components/button/BaseButton'
import DangerButton from 'src/components/button/DangerButton'
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

const Management = ({ }) => {
  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const [selectedRow, setSelectedRow] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'resionNm', headerName: '지역', flex: 2, align: 'center', cellStyle: { textAlign: "center" } },
    { field: 'custNm', headerName: '고객명', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'fullAddr', headerName: '주소', flex: 3, align: 'center', textAlign: 'center' },
    { field: 'custId', headerName: '고객ID', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'rtuSeq', headerName: 'RTU일련번호', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'multi', headerName: '멀티번호', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'loraDevEui', headerName: 'LoRa장비EUI', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'eventCnt', headerName: '시스템장애수', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'dataEventSt', headerName: '데이터오류여부', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'genCnt', headerName: '발전데이터수', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'genEventSt', headerName: '발전데이터수집여부', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'useCnt', headerName: '소비데이터수', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'useEventSt', headerName: '소비데이터수집여부', flex: 2, align: 'center', textAlign: 'center' },
    { field: 'comment', headerName: '메모', flex: 2, align: 'center', textAlign: 'center' }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    headerClass: function (params: any) {
      // logic to return the correct class
      return 'header-one';
    }
  }), []);

  const onRowClicked = (row: any) => {
    setSelectedRow(row);
  }

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading="박물관리" />
        <BaseButton value={"등록"} marginRightValue={5} />
        <DangerButton value={"삭제"} marginRightValue={0} />
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
                      defaultColDef={defaultColDef} // Default Column Properties
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

export default Management;