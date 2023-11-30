import styles from "src/pages/manage/Management/management.module.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import CustomDatePicker from 'src/components/CustomDatePicker';
import dayjs from 'dayjs';
import { ItemGroup, PopupFormControlLabel, ComboControlLabel } from 'src/components/modal/ItemGroup';
import CustomCombo from 'src/components/combobox/CustomCombo';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { BaseButton, DangerButton, NormalButton } from 'src/components/CustomButton';
import AgGrid from "src/components/AgGrid";
import ImagePreviewModal from "src/pages/manage/modal/ImagePreviewModal";
import {
    itemList,
    materialData,
    countryData,
    organization1List,
    organization2List,
    materialList,
    countryList,
    broughtReasonData,
    relatedTopicData
} from 'src/jsonData';

const TempStorage = () => {
    const imgSize = { maxHeight: "100%", maxWidth: "100%", cursor: "pointer", display: "flex" };
    const [searchTable, setSearchTable] = useState(false);
    const [startDt, setStartDt] = useState(dayjs(new Date()).subtract(1, "month"))
    const [endDt, setEndDt] = useState(dayjs(new Date()));
    const [organization1, setOrganization1] = useState(""); //기관1
    const [organization2, setOrganization2] = useState(""); //기관2
    const [material1, setMaterial1] = useState("") //재질
    const [material2, setMaterial2] = useState("") //재질
    const [startNumber, setStartNumber] = useState(""); //시작번호
    const [endNumber, setEndNumber] = useState(""); //끝번호
    const [pageCnt, setPageCnt] = useState(10); //그리드 갯수
    const [materialCheckItems, setMaterialCheckItems] = useState([]); //재질 체크박스
    const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(itemList); // Set rowData to Array of Objects, one Object per Row
    const [selectedRow, setSelectedRow] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [content, setContent] = useState("");
    const [openPreview, setOpenPreview] = useState(false); //이미지 미리보기 컨트롤 state
    const [singleCurrRowData, setSingleCurrRowData] = useState({});

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'number',
            headerName: 'No.',
            flex: 1,
            cellStyle: { textAlign: "center", whiteSpace: 'normal' },
            autoHeight: true,
            headerCheckboxSelection: true,
            checkboxSelection: true,
        },
        {
            field: 'image', headerName: '대표 이미지', flex: 1, cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center", whiteSpace: 'normal' }, autoHeight: true,
            cellRenderer: function (row) {
                if (row.data.imageList && row.data.imageList.length > 0) {
                    return (
                        <div style={{ width: '50px', height: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onClick={(e) => { openPreviewModal(row.data) }}>
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
        { field: 'affiliation', headerName: '소장품 소속', flex: 1, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'number', headerName: '소장품 번호', flex: 1, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'detailNumber', headerName: '세부 번호', flex: 1.5, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'name', headerName: '명칭', flex: 1.5, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'mainCnt', headerName: '주수량', flex: 1, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: 'subCnt', headerName: '부수량', flex: 1, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
        { field: '', headerName: '임시저장일', flex: 1.5, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true,
        cellRenderer: function (row) {
            return (
              <div>{dayjs(new Date()).format("YYYY-MM-DD")}</div>
            )
          }
        },
    ]);

    //체크박스 default 전체 선택
    useEffect(() => {
        let tempMaterialList = [];
        for (let i = 0; i < materialData.length; i++) {
            tempMaterialList.push(materialData[i].cd);
        }
        setMaterialCheckItems(tempMaterialList);
    }, [])

    //토글 검색 테이블
    const toggleSearchTable = () => {
        setSearchTable(!searchTable)
    }

    const setFirstValue = (cd, targetData) => {
        if (targetData === "organization1") {
            setOrganization1(organization1List[cd].title)
        } else if (targetData === "organization2") {
            setOrganization2(organization2List[cd].title)
        } else if (targetData === "material1") {
            setMaterial1(materialList[cd].title)
        } else if (targetData === "material2") {
            setMaterial2(materialList[cd].title)
        }
    }

    const onChangeMaterial = (e) => {
        let isChecked = e.target.checked;

        if (e.target.value != "") {
            if (isChecked) {
                setMaterialCheckItems(prev => [...prev, e.target.value]);
            } else {
                setMaterialCheckItems(materialCheckItems.filter((el) => el !== e.target.value));
            }
            //전체선택일때
        } else {
            if (isChecked) {
                let idArray = [];
                materialData.map((data) => {
                    idArray.push(data.cd);
                })
                setMaterialCheckItems(idArray);
            } else {
                setMaterialCheckItems([]);
            }
        }
    }

    const onChangePageSize = (e) => {
        setPageCnt(e.target.value)
    };

    const onRowClicked = (row: any) => {
        setSelectedRow(row);
    }

    const openPreviewModal = (row) => {
        setSingleCurrRowData(row);
        if (row.imageList.length > 0) {
            setOpenPreview(true);
        } else {
            setContent("등록된 이미지가 없습니다.");
            setAlertOpen(true);
        }
    }

    const closePreviewModal = () => {
        setOpenPreview(false);
    }

    return (
        <div className={styles.search_main}>
            <div className={styles.search_container}>
                <div className={styles.search_title}>
                    임시저장 리스트
                </div>
                <div className={styles.search_controller_container}>
                    <div className={styles.search_controller}>
                        <div className={styles.search_header}>
                            <div className={styles.search_header_title}>검색 조건</div>
                            <div className={styles.search_header_toggle} onClick={(e) => toggleSearchTable()}>{searchTable ? "검색 조건 닫기" : "검색 조건 열기"}
                                {searchTable ?
                                    <div className={styles.search_header_topArrow_icon}></div>
                                    :
                                    <div className={styles.search_header_downArrow_icon}></div>
                                }
                            </div>
                        </div>
                        {searchTable ?
                            <div className={styles.search_list}>
                                <table className={styles.search_table}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>등록일</td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <CustomDatePicker startDt={startDt} endDt={endDt} setStartDt={setStartDt} setEndDt={setEndDt} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>보관 소속</td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={organization1List} value={organization1} targetData={"organization1"} codeChange={(e) => setOrganization1(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={organization2List} value={organization2} targetData={"organization2"} codeChange={(e) => setOrganization2(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>소장품 번호</td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>시작 번호</td>
                                            <td style={{ width: '35%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={materialList} value={material1} targetData={"material1"} codeChange={(e) => setMaterial1(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<TextField fullWidth size="small" value={startNumber} inputProps={{ maxLength: 20, min: 0 }} onChange={(e) => setStartNumber(e.target.value)} type="number" />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>끝 번호</td>
                                            <td style={{ width: '35%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={materialList} value={material2} targetData={"material2"} codeChange={(e) => setMaterial2(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<TextField fullWidth size="small" value={endNumber} inputProps={{ maxLength: 20, min: 0 }} onChange={(e) => setEndNumber(e.target.value)} type="number" />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>재질</td>
                                            <td colSpan={4} style={{ width: '90%' }}>

                                                <label className={styles.normal_checkbox_lable}>
                                                    <input type="checkbox" onChange={(e) => onChangeMaterial(e)} value={""} checked={materialCheckItems.length === materialData.length ? true : false} />
                                                    전체
                                                </label>
                                                {
                                                    materialData.length > 0 && materialData.map((data, index) => {
                                                        return (
                                                            <label className={styles.normal_checkbox_lable} key={index}>
                                                                <input type="checkbox" onChange={(e) => onChangeMaterial(e)} value={data.cd} checked={materialCheckItems.includes(data.cd) ? true : false} />
                                                                {data.name}
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>검색어 입력</td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <Box sx={{ width: 300 }}>
                                                    <TextField fullWidth inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='검색어를 입력하세요' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} style={{ backgroundColor: '#F7F7F7', textAlign: 'right' }}>
                                                <button className={styles.search_btn}>검색</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
                <div className={styles.item_list_container}>
                    <div className={styles.item_list_area}>
                        <div className={styles.item_list_result}>
                            검색결과
                            <p>(Total {itemList.length}건)</p>
                        </div>
                        <div className={styles.item_list_button_controller}>
                            <div className={styles.float_left}>
                                <DangerButton>삭제</DangerButton>
                            </div>
                            <div className={styles.float_right}>
                                <select className={styles.ag_pageCnt_select} onChange={onChangePageSize} value={pageCnt}>
                                    <option value="1">1</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                        <Box noValidate component="form" autoComplete="off" sx={{ display: 'flex' }}>
                            <AgGrid
                                setRef={setgridState} // Ref for accessing Grid's API
                                rowData={rowData} // Row Data for Rows
                                columnDefs={columnDefs} // Column Defs for Columns
                                onRowClicked={onRowClicked}
                                heightVal={660}
                                pageCnt={pageCnt}
                            />
                        </Box>
                    </div>
                </div>
            </div>

            {/* 이미지 미리보기 모달 */}
            <ImagePreviewModal
                openPreview={openPreview}
                closePreviewModal={closePreviewModal}
                singleCurrRowData={singleCurrRowData}
            />
        </div>
    )
}
export default TempStorage;