import { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, TextField, styled, Button, DialogContent, Grid, Typography, formControlClasses } from "@mui/material";
import UpdateModal from 'src/components/modal/UpdateModal';
import { ItemGroup, PopupFormControlLabel, ComboControlLabel } from 'src/components/modal/ItemGroup';
import StorageCombo from 'src/components/combobox/StorageCombo';
import CountryCombo from 'src/components/combobox/CountryCombo';
import { indigo } from '@mui/material/colors';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NormalButton, BaseButton, AddButton } from 'src/components/CustomButton';
import styles from "src/pages/itemRegister/register.module.css";
import dayjs from 'dayjs';
import CustomCombo from 'src/components/combobox/CustomCombo';
import {
    materialData,
    countryData,
    organization1List,
    organization2List,
    countryList,
    broughtReasonData,
    relatedTopicData,
    historyData,
    storageList,
    sizeType,
    yearTypeList,
} from 'src/jsonData';

const FileDownloadButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    width: 90,
    height: 37,
    fontSize: 12,
    '&:hover': {
        backgroundColor: indigo[600],
    },
}));

const CustomDatePicker = styled(DatePicker)`
    width: 200px;
    height: 35px;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid darkgray;
    font-size: 15px;
`;

const ManagementUpdateModal = ({ openUpdate, closeUpdateModal, setSingleCurrRowData, singleCurrRowData, updateRow }) => {
    //컬럼의 상태관리

    //컬럼의 에러관리
    const [paramError, setParamError] = useState({
    })

    const [simpleSearchModal, setSimpleSearchModal] = useState(false); //간단조회 모달 오픈
    const [sosokList, setSosokList] = useState([]);
    const [sosokSubList, setSosokSubList] = useState([]);

    //-------------------------- 박물조회 ------------------------------------//
    const [today, setToday] = useState(dayjs(new Date()).format('YYYY-MM-DD')); //등록일
    const [organization1, setOrganization1] = useState(""); //보관소속1
    const [organization2, setOrganization2] = useState(""); //보관소속2
    const [name, setName] = useState(""); //명칭
    const [subName, setSubName] = useState(""); //이명
    const [engName, setEngName] = useState(""); //영어명칭
    const [oriName, setOriName] = useState(""); //원어명칭
    const [mainNumber, setMainNumber] = useState(0); //주수량
    const [subNumber, setSubNumber] = useState(0); //부수량
    const [useYn, setUseYn] = useState("N"); //딸림자료 유/무
    const [useNumber, setUseNumber] = useState(0); //딸림수량
    const [material, setMaterial] = useState(materialData[0].cd); //재질
    const [sizeArr, setSizelArr] = useState([{ name: sizeType[0].name, cd: sizeType[0].cd, size: "" }]); //크기
    const [addMemo, setAddMemo] = useState(""); //추가상세기술
    //-------------------------- 박물조회 ------------------------------------//

    useEffect(() => {
        if (openUpdate) {
            console.log(singleCurrRowData)
        }
    }, [openUpdate, singleCurrRowData])

    //물품수정
    const updateItem = () => {
        let tempList = {
            ...singleCurrRowData,
        };

        setSingleCurrRowData(tempList);
        updateRow(tempList)

        closeUpdateModal();
    }

    //간단조회
    const simpleSearch = (e) => {
        setSimpleSearchModal(true)
    }

    const setFirstValue = (cd, targetData) => {
    }

    //딸림자료 유/무
    const changeUseYn = (e) => {
        setUseYn(e.target.value)
    }

    //재질 추가
    const addMaterial = (e) => {
        let tempList = [...sizeArr];
        if (tempList.length > 4) {
            return false;
        }
        tempList.push({ name: sizeType[0].name, cd: sizeType[0].cd, size: "" });
        setSizelArr(tempList);
    }

    //재질 삭제
    const removeMaterial = (e) => {
        let tempList = [...sizeArr];
        if (tempList.length === 1) {
            if (tempList[0].cd == "00") {
                tempList[0].name = sizeType[0].name;
                tempList[0].cd = sizeType[0].cd;
                setSizelArr(tempList);
            }
            return false;
        }
        tempList.splice(tempList.length - 1);
        setSizelArr(tempList);
    }

    //사이즈 선택
    const handleSizeType = (e, index) => {
        let tempList = [...sizeArr];

        for (let i = 0; i < sizeType.length; i++) {
            if (sizeType[i].cd == e.target.value) {
                tempList[index].name = sizeType[i].name;
                tempList[index].cd = sizeType[i].cd;
                break;
            }
        }
        setSizelArr(tempList)
    }

    //직접 사이즈 입력
    const handleEditType = (e, index) => {
        let tempList = [...sizeArr];

        tempList[index].name = e.target.value;
        setSizelArr(tempList)
    }

    //사이즈 크기
    const handleSize = (e, index) => {
        let tempList = [...sizeArr];

        tempList[index].size = e.target.value;
        setSizelArr(tempList)
    }

    return (
        <UpdateModal title="물품수정" open={openUpdate} onClose={closeUpdateModal} onOk={updateItem} >
            <DialogContent dividers sx={{ flexGrow: 1, minWidth: "1000px" }}>
                <div className={styles.search_main}>
                    <div className={styles.search_container}>
                        <div className={styles.register_step_title} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                1. 박물 조회
                            </div>
                            <div>
                                <BaseButton style={{ margin: '0px' }} onClick={(e) => simpleSearch(e)}>간단조회</BaseButton>
                            </div>
                        </div>
                        <div className={styles.search_controller_container}>
                            <div className={styles.search_controller}>
                                <div className={styles.search_list}>
                                    <table className={styles.search_table}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '10%', textAlign: 'center' }}>수정일</td>
                                                <td colSpan={4} style={{ width: '90%' }}>
                                                    {today}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>보관 소속</td>
                                                <td colSpan={2} style={{ width: '40%' }}>
                                                    <ComboControlLabel
                                                        control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={sosokList} value={organization1} targetData={"organization1"} codeChange={(e) => setOrganization1(e.target.value)} />}
                                                        label=""
                                                        labelPlacement="start"
                                                    />
                                                    <ComboControlLabel
                                                        control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={sosokSubList} value={organization2} targetData={"organization2"} codeChange={(e) => setOrganization2(e.target.value)} />}
                                                        label=""
                                                        labelPlacement="start"
                                                    />
                                                </td>
                                                <td style={{ textAlign: 'center', backgroundColor: '#deebff', width: '10%' }}>소장품 번호</td>
                                                <td >
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>명칭</td>
                                                <td colSpan={4}>
                                                    <Box sx={{ width: '80%' }}>
                                                        <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                    </Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>명칭(이명)</td>
                                                <td colSpan={4}>
                                                    <Box sx={{ width: '80%' }}>
                                                        <TextField value={subName} onChange={(e) => setSubName(e.target.value)} fullWidth inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                    </Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>영어명칭</td>
                                                <td colSpan={4}>
                                                    <Box sx={{ width: '80%' }}>
                                                        <TextField value={engName} onChange={(e) => setEngName(e.target.value)} fullWidth inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                    </Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>원어명칭</td>
                                                <td colSpan={4}>
                                                    <Box sx={{ width: '80%' }}>
                                                        <TextField value={oriName} onChange={(e) => setOriName(e.target.value)} fullWidth inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                    </Box>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '10%', textAlign: 'center' }}>수량</td>
                                                <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>주 수량(건)</td>
                                                <td style={{ width: '30%' }}>
                                                    <ComboControlLabel
                                                        control={<TextField fullWidth size="small" value={mainNumber} inputProps={{ maxLength: 20, min: 0 }}
                                                            onChange={(e) => {
                                                                let value = parseInt(e.target.value)
                                                                setMainNumber(value)
                                                            }}
                                                            onBlur={(e) => {
                                                                if (e.target.value === "") {
                                                                    setMainNumber(0)
                                                                }
                                                            }}
                                                            type="number"
                                                        />}
                                                        label=""
                                                        labelPlacement="start"
                                                    />
                                                </td>
                                                <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>부 수량(점)</td>
                                                <td style={{ width: '30%' }}>
                                                    <ComboControlLabel
                                                        control={<TextField fullWidth size="small" value={subNumber} inputProps={{ maxLength: 20, min: 0 }}
                                                            onChange={(e) => {
                                                                let value = parseInt(e.target.value)
                                                                setSubNumber(value)
                                                            }}
                                                            onBlur={(e) => {
                                                                if (e.target.value === "") {
                                                                    setSubNumber(0)
                                                                }
                                                            }}
                                                            type="number"
                                                        />}
                                                        label=""
                                                        labelPlacement="start"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '10%', textAlign: 'center' }}>딸림자료</td>
                                                <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>유/무</td>
                                                <td style={{ width: '30%' }}>
                                                    <div className={styles.checkbox_container}>
                                                        <div className={styles.checkbox_item}>
                                                            <label>
                                                                <input
                                                                    type='radio'
                                                                    name='useYn'
                                                                    value='N'
                                                                    checked={useYn === "N"}
                                                                    onChange={(e) => changeUseYn(e)}
                                                                />
                                                                무
                                                            </label>
                                                        </div>
                                                        <div className={styles.checkbox_item}>
                                                            <label>
                                                                <input
                                                                    type='radio'
                                                                    name='useYn'
                                                                    value='Y'
                                                                    checked={useYn === "Y"}
                                                                    onChange={(e) => changeUseYn(e)}
                                                                />
                                                                유
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>딸림수량</td>
                                                <td style={{ width: '30%' }}>
                                                    <ComboControlLabel
                                                        control={<TextField fullWidth size="small" value={useNumber} inputProps={{ maxLength: 20, min: 0 }}
                                                            onChange={(e) => {
                                                                let value = parseInt(e.target.value)
                                                                setUseNumber(value)
                                                            }}
                                                            onBlur={(e) => {
                                                                if (e.target.value === "") {
                                                                    setUseNumber(0)
                                                                }
                                                            }}
                                                            type="number"
                                                            disabled={useYn === "N" ? true : false}
                                                        />}
                                                        label=""
                                                        labelPlacement="start"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>재질/크기</td>
                                                <td style={{ textAlign: 'center', backgroundColor: '#deebff' }}>재질</td>
                                                <td colSpan={3}>
                                                    <select name="material" style={{ marginRight: "2px", width: "80px" }} onChange={(e) => setMaterial(e.target.value)}>
                                                        {materialData.map((data) => {
                                                            return (
                                                                <option value={data.cd}>
                                                                    {data.name}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div style={{ marginBottom: '5px', marginTop: '3px' }}>
                                                        <AddButton onClick={(e) => addMaterial(e)}>+크기 추가</AddButton>
                                                    </div>
                                                    <div style={{ marginBottom: '3px', marginTop: '3px' }}>
                                                        <AddButton onClick={(e) => removeMaterial(e)}>-크기 삭제</AddButton>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'center', backgroundColor: '#deebff' }}>크기</td>
                                                <td colSpan={3}>
                                                    <div style={{ display: "flex" }}>
                                                        {sizeArr.map((data, index) => {
                                                            return (
                                                                <div>
                                                                    {data.cd != "00" ?
                                                                        <select name="sizeType" style={{ marginRight: "2px", width: "80px" }} onChange={(e) => { handleSizeType(e, index) }}>
                                                                            {sizeType.map((data) => {
                                                                                return (
                                                                                    <option value={data.cd} key={data.cd}>
                                                                                        {data.name}
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                        :
                                                                        <input type="text" style={{ marginRight: "2px", width: "80px", height: "20px" }} onChange={(e) => handleEditType(e, index)}></input>
                                                                    }
                                                                    <div>
                                                                        <input type="text" style={{ width: "80px" }} onChange={(e) => { handleSize(e, index) }}></input>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '10%', textAlign: 'center' }}>추가 상세 기술</td>
                                                <td colSpan={4} style={{ width: '90%' }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        <TextField onChange={(e) => setAddMemo(e.target.value)} value={addMemo} multiline rows={3} fullWidth inputProps={{ style: { padding: 0, fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                    </Box>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </UpdateModal>
    )
}
export default ManagementUpdateModal;