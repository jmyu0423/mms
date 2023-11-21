import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import ManagementRegistModal from "src/pages/manage/modal/ManagementRegistModal"
import ManagementUpdateModal from "src/pages/manage/modal/ManagementUpdateModal"
import ImagePreviewModal from "src/pages/manage/modal/ImagePreviewModal";
import {BaseButton, DangerButton} from 'src/components/CustomButton';
import {itemList} from 'src/jsonData';

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

const ObjectRegister = ({ }) => {
  const imgSize = { maxHeight: "100%", maxWidth: "100%", cursor: "pointer", display: "flex" };
  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(itemList); // Set rowData to Array of Objects, one Object per Row
  const [selectedRow, setSelectedRow] = useState([]);

  //등록모달 컨트롤 state
  const [openRegist, setOpenRegist] = useState(false);

  //수정모달 컨트롤 state
  const [openUpdate, setOpenUpdate] = useState(false);
  const [singleCurrRowData, setSingleCurrRowData] = useState({});

  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'number', headerName: '번호', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'itemNm', headerName: '명칭', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'storage', headerName: '보관장소', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'texture', headerName: '재질', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'count', headerName: '건', flex: 1.5, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'piece', headerName: '점', flex: 1.5, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'comment', headerName: '제작시대/용도기능', flex: 3, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'size', headerName: '크기(cm)', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'getReason', headerName: '입수연유', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    { field: 'country', headerName: '국가명', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true },
    {
      field: 'giver', headerName: '증정자이름/직책', flex: 2, cellStyle: { textAlign: "center", 'white-space': 'normal' }, autoHeight: true
    },
    {
      field: 'image', headerName: '이미지', flex: 2, cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center", 'white-space': 'normal' }, autoHeight: true,
      cellRenderer: function (row) {
        if (row.data.imageList && row.data.imageList.length > 0) {
          return (
            <div style={{width: '50px', height: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onClick={(e) => { openPreviewModal(row) }}>
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
    {
      field: '', headerName: '설정', flex: 2, cellStyle: { textAlign: "center" },
      cellRenderer: function (row) {
        return (
          <div>
            <Button style={{ padding: 0, fontWeight: "bold" }} onClick={(e) => openUpdateModal(row)}>수정</Button>
          </div>
        )
      }
    }
  ]);

  const onRowClicked = (row: any) => {
    setSelectedRow(row);
  }

  const openRegistModal = () => {
    setOpenRegist(true);
  }

  const closeRegistModal = () => {
    setOpenRegist(false)
  }

  const openUpdateModal = (row) => {
    setSingleCurrRowData(row.data);
    setOpenUpdate(true);
  }

  const closeUpdateModal = () => {
    setOpenUpdate(false)
  }

  const deleteRowData = () => {
    let seqNos = [];
    let currRowData = [];

    if (window.confirm("정말 삭제하시겠습니까?")) {
      if (selectedRow.length > 0) {
        selectedRow.map((data) => {
          seqNos.push(data.seqNo);
        })
      }

      //삭제할 array 제외
      if (rowData.length > 0) {
        currRowData = rowData.filter(it => !seqNos.includes(it.seqNo));
      }
      setRowData(currRowData)
    } else {
      console.log("취소")
    }
  }

  //깜빡임 없이 aggrid update
  const updateRow = (obj) => {
    let rowNode = gridState.current.api.getRowNode(gridState.current.api.getSelectedNodes()[0].rowIndex);
    let newData = { ...rowNode.data }
    Object.assign(newData, {
      itemNm: obj.itemNm,
      number: obj.number,
      storage: obj.storage,
      texture: obj.texture,
      count: obj.count,
      piece: obj.piece,
      comment: obj.comment,
      size: obj.size,
      getReason: obj.getReason,
      country: obj.country,
      giver: obj.giver,
      characteristic: obj.characteristic,
      fileList: obj.fileList,
      image: obj.image
    });
    rowNode.setData(newData)
  }

  const openPreviewModal = (row) => {
    setSingleCurrRowData(row.data);
    setOpenPreview(true);
  }

  const closePreviewModal = () => {
    setOpenPreview(false);
  }

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading="박물조회" />
        <BaseButton onClick={(e) => openRegistModal()}>등록</BaseButton>
        <DangerButton onClick={(e) => deleteRowData()}>삭제</DangerButton>
        {/* <Button variant="outlined" size="small">등록</Button> */}
      </PageTitleWrapper>
      <PageContainer>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <WngCard style={{ display: 'block' }}>
              <Grid xs={12}>
                <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                  <AgGrid
                    setRef={setgridState} // Ref for accessing Grid's API
                    rowData={rowData} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    onRowClicked={onRowClicked}
                    heightVal={820}
                  />
                </Box>
              </Grid>
            </WngCard>
          </Grid>
        </Grid>
      </PageContainer>

      {/* 등록모달 */}
      <ManagementRegistModal
        openRegist={openRegist}
        closeRegistModal={closeRegistModal}
        setRowData={setRowData}
        rowData={rowData}
      />

      {/* 수정모달 */}
      <ManagementUpdateModal
        openUpdate={openUpdate}
        closeUpdateModal={closeUpdateModal}
        setSingleCurrRowData={setSingleCurrRowData}
        singleCurrRowData={singleCurrRowData}
        updateRow={updateRow}
      />

      <ImagePreviewModal
        openPreview={openPreview}
        closePreviewModal={closePreviewModal}
        singleCurrRowData={singleCurrRowData}
      />
    </>
  );
};

export default ObjectRegister;