import { NormalButton, DangerButton, BaseButton, AddButton, HelpButton } from 'src/components/CustomButton';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

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

const UserRegister = () => {
    const navigate = useNavigate(); //for redirect
    const [useYn, setUseYn] = useState("Y"); //활성여부
    const [statCheckYn, setStatCheckYn] = useState("Y"); //통계 조회 권한
    const [itemCheckYn, setItemCheckYn] = useState("Y"); //박물 조회 권한
    const [itemRegisterYn, setItemRegisterYn] = useState("Y"); //박물 등록 권한
    const [itemUpdateYn, setItemUpdateYn] = useState("Y"); //박물 수정 권한
    const [userCheckYn, setUserCheckYn] = useState("Y"); //관리자 계정관리 권한 

    const goUserManagemnet = () => {
        let path = '/UserManagement';
        navigate(path);
    }

    //활성여부
    const changeUseYn = (e) => {
        setUseYn(e.target.value)
    }

    //통계 조회 권한
    const changeStatCheckYn = (e) => {
        setStatCheckYn(e.target.value)
    }

    //박물 조회 권한
    const changeItemCheckYn = (e) => {
        setItemCheckYn(e.target.value);
    }

    //박물 등록 권한
    const changeItemRegisterYn = (e) => {
        setItemRegisterYn(e.target.value);
    }

    //박물 수정 권한
    const changeitemUpdateYn = (e) => {
        setItemUpdateYn(e.target.value);
    }

    //관리자 계정관리 권한 
    const changeUserCheckYn = (e) => {
        setUserCheckYn(e.target.value);
    }

    return (
        <div className='user-management-main'>
            <div className='user-management-state' style={{ marginBottom: '5px' }}>
                <div>
                    관리자등록
                </div>
            </div>
            <div className='user-management-container'>
                <div style={{ marginBottom: '5px' }} className='user-management-item-area'>
                    <table className='user-management-search-table' style={{ fontWeight: 'bold' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>관리자명</td>
                                <td style={{ width: '85%' }}>
                                    <CustomTextField
                                        control={<TextField fullWidth inputProps={{ style: { height: '4px', fontSize: 14, backgroundColor: 'white' } }} placeholder='' />}
                                        label=""
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>소속</td>
                                <td style={{ width: '85%' }}>
                                    <CustomTextField
                                        control={<TextField fullWidth inputProps={{ style: { height: '4px', fontSize: 14, backgroundColor: 'white' } }} placeholder='' />}
                                        label=""
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>생성일</td>
                                <td style={{ width: '85%' }}>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>최근 로그인</td>
                                <td style={{ width: '85%' }}>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>활성 여부</td>
                                <td style={{ width: '85%' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='useYn'
                                                    value='Y'
                                                    checked={useYn === "Y"}
                                                    onChange={(e) => changeUseYn(e)}
                                                />
                                                O
                                            </label>
                                        </div>
                                        <div style={{}}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='useYn'
                                                    value='N'
                                                    checked={useYn === "N"}
                                                    onChange={(e) => changeUseYn(e)}
                                                />
                                                X
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>통계 조회 권한</td>
                                <td style={{ width: '85%' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='statCheckYn'
                                                    value='Y'
                                                    checked={statCheckYn === "Y"}
                                                    onChange={(e) => changeStatCheckYn(e)}
                                                />
                                                O
                                            </label>
                                        </div>
                                        <div style={{}}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='statCheckYn'
                                                    value='N'
                                                    checked={statCheckYn === "N"}
                                                    onChange={(e) => changeStatCheckYn(e)}
                                                />
                                                X
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>박물 조회 권한</td>
                                <td style={{ width: '85%' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='itemCheckYn'
                                                    value='Y'
                                                    checked={itemCheckYn === "Y"}
                                                    onChange={(e) => changeItemCheckYn(e)}
                                                />
                                                O
                                            </label>
                                        </div>
                                        <div style={{}}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='itemCheckYn'
                                                    value='N'
                                                    checked={itemCheckYn === "N"}
                                                    onChange={(e) => changeItemCheckYn(e)}
                                                />
                                                X
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>박물 등록 권한</td>
                                <td style={{ width: '85%' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='itemRegisterYn'
                                                    value='Y'
                                                    checked={itemRegisterYn === "Y"}
                                                    onChange={(e) => changeItemRegisterYn(e)}
                                                />
                                                O
                                            </label>
                                        </div>
                                        <div style={{}}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='itemRegisterYn'
                                                    value='N'
                                                    checked={itemRegisterYn === "N"}
                                                    onChange={(e) => changeItemRegisterYn(e)}
                                                />
                                                X
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>박물 수정 권한</td>
                                <td style={{ width: '85%' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='itemUpdateYn'
                                                    value='Y'
                                                    checked={itemUpdateYn === "Y"}
                                                    onChange={(e) => changeitemUpdateYn(e)}
                                                />
                                                O
                                            </label>
                                        </div>
                                        <div style={{}}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='itemUpdateYn'
                                                    value='N'
                                                    checked={itemUpdateYn === "N"}
                                                    onChange={(e) => changeitemUpdateYn(e)}
                                                />
                                                X
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', textAlign: 'center' }}>관리자 계정관리 권한</td>
                                <td style={{ width: '85%' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='userCheckYn'
                                                    value='Y'
                                                    checked={userCheckYn === "Y"}
                                                    onChange={(e) => changeUserCheckYn(e)}
                                                />
                                                O
                                            </label>
                                        </div>
                                        <div style={{}}>
                                            <label>
                                                <input
                                                    style={{ position: 'relative', top: '1px' }}
                                                    type='radio'
                                                    name='userCheckYn'
                                                    value='N'
                                                    checked={userCheckYn === "N"}
                                                    onChange={(e) => changeUserCheckYn(e)}
                                                />
                                                X
                                            </label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='user-management-space-between'>
                    <div>
                        <DangerButton sx={{ width: '100px' }} style={{ padding: 0, margin: 0 }}>삭제</DangerButton>
                    </div>
                    <div>
                        <NormalButton sx={{ width: '100px' }} onClick={() => { goUserManagemnet() }}>취소</NormalButton>
                        <BaseButton sx={{ width: '100px' }} style={{ padding: 0, margin: 0 }}>등록</BaseButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserRegister;