import './userManagement.css';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { NormalButton, BaseButton, AddButton, HelpButton } from 'src/components/CustomButton';
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import {
    authMenuData,
    userAuthData
} from 'src/jsonData';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";

const CustomTextField = styled(FormControlLabel)(({ theme }) => ({
    width: 'auto',
    alignItems: 'baseline',
    marginLeft: '2px',

    '& .MuiFormControlLabel-label': {
        fontSize: '16px',
        color: '#e57373',
        fontWeight: 'bold'
    },
    '& .MuiInputBase-input': {
        padding: '10px',
        height: '12px',
    },
    '& .MuiTextField-root': {
        width: '250px',
        background: '#fcfcfc',
        '.Mui-disabled': {
            background: '#f7f7f7',
        }
    },
}));

const User = () => {
    const [authMenu, setAuthMenu] = useState([]);
    const [autoCheckItems, setAutoCheckItems] = useState([]); //권한메뉴 체크박스
    const [userData, setUserData] = useState([]); //사용자 리스트
    const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
    const [pageCnt, setPageCnt] = useState(10); //그리드 갯수

    const [columnDefs, setColumnDefs] = useState([
        { 
          field: 'seq', 
          headerName: 'No.', 
          flex: 1, 
          cellStyle: { textAlign: "center", whiteSpace: 'normal' }, 
          autoHeight: true,
          headerCheckboxSelection: false,
          checkboxSelection: false,
          cellRenderer: function (row) {
            return (
              <div>{row.rowIndex + 1}</div>
            )
          }
        },
        { field: 'userNm', headerName: '관리자명', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'statAuth', headerName: '통계 조회', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'manageAuth', headerName: '박물 조회', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'registerAuth', headerName: '박물 등록', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'updateAuth', headerName: '박물 수정', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'userManageAuth', headerName: '관리자 계정관리', flex: 1.5, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'approvalAuth', headerName: '수정 승인', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'itemManageAtth', headerName: '항목 관리', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'regDt', headerName: '등록일', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        {
          field: '', headerName: 'action', flex: 1.5, cellStyle: { textAlign: "center" },
          cellRenderer: function (row) {
            return (
              <div>
                <NormalButton onClick={(e) => openUpdateModal(row)}>권한 수정</NormalButton>
              </div>
            )
          }
        }
    ]);

    useEffect(() => {
        setAuthMenu(authMenuData);
        setUserData(userAuthData);

        //권한 메뉴 체크박스 전체선택
        let tempMaterialList = [];
        for(let i=0; i<authMenuData.length; i++){
            tempMaterialList.push(authMenuData[i].cd);
        }
        setAutoCheckItems(tempMaterialList);
    }, [])

    const onChangeMaterial = (e) =>{
        let isChecked = e.target.checked;
    
        if(e.target.value != ""){
          if(isChecked){
            setAutoCheckItems(prev => [...prev, e.target.value]);
          }else{
            setAutoCheckItems(autoCheckItems.filter((el) => el !== e.target.value));
          }
        }
    }

    const onRowClicked = (row: any) => {
    }

    const openUpdateModal = (row) => {
    }

    return (
        <div className='user-management-main'>
            <div className='user-management-state' style={{ marginBottom: '5px' }}>
                <div>
                    관리자계정관리
                </div>
            </div>
            <div className='user-management-container'>
                <div style={{ marginBottom: '5px' }} className='user-management-item-area'>
                    <table className='user-management-search-table'>
                        <tbody>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>권한 메뉴</td>
                                <td style={{ width: '85%' }}>
                                    {authMenu.length > 0 && authMenu.map((data) => {
                                        return (
                                            <label className='user-management-checkbox' key={data.cd}>
                                                <input type="checkbox" onChange={(e) => onChangeMaterial(e)} value={data.cd} checked={autoCheckItems.includes(data.cd) ? true : false} />
                                                {data.name}
                                            </label>
                                        )
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>검색어</td>
                                <td>
                                    <CustomTextField
                                        control={<TextField fullWidth inputProps={{ style: { height: '6px', fontSize: 14, backgroundColor: 'white' } }} placeholder='검색어를 입력하세요' />}
                                        label=""
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='user-management-float-right'>
                    <BaseButton sx={{width: '100px'}} style={{padding: 0, margin: 0}}>조회</BaseButton>
                </div>
                <div className='user-management-float-right' style={{marginTop: '20px', marginBottom: '5px'}}>
                    <NormalButton >엑셀 다운로드</NormalButton>                    
                    <BaseButton sx={{width: '100px'}} style={{padding: 0, marginRight: 0}}>관리자등록</BaseButton>                    
                </div>
                <div className='user-management-item-area'>
                    <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                        <AgGrid
                            setRef={setgridState} // Ref for accessing Grid's API
                            rowData={userData} // Row Data for Rows
                            columnDefs={columnDefs} // Column Defs for Columns
                            onRowClicked={onRowClicked}
                            heightVal={660}
                            pageCnt={pageCnt}
                        />
                    </Box>                    
                </div>
            </div>
        </div>
    )
}

export default User;