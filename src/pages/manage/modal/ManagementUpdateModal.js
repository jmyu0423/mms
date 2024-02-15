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
import AlertModal from 'src/components/modal/AlertModal';
import axios from 'axios';

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

    const [simpleSearchModal, setSimpleSearchModal] = useState(false); //간단조회 모달 오픈
    const [sosokList, setSosokList] = useState([]);
    const [sosokSubList, setSosokSubList] = useState([]);
    const [imageListUrl, setImageListUrl] = useState([]); //미리보기 이미지 리스트
    const [imageList, setImageList] = useState([]); //이미지 리스트
    const [content, setContent] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const addImageInput = useRef(null); //이미지 정보 넘길 ref
    const [iamgeCount, setImageCount] = useState(0);
    const [openPreview, setOpenPreview] = useState(false); //미리보기 모달 오픈

    const [countrySubList, setcountrySubList] = useState([]);
    const [countrySimpleSearchModal, setCountrySimpleSearchModal] = useState(false); //나라명 간단조회 모달 오픈
    const [personnelSearchModal, setPersonnelSearchModal] = useState(false); //인사검색 모달
    const addPersonImageInput = useRef(null); //인사정보 이미지 넘길 ref
    const [personImageList, setPersonImageList] = useState([]); //인사정보 이미지 리스트
    const [personImageListUrl, setPersonImageListUrl] = useState([]); //인사정보 미리보기 이미지 리스트

    const [regSosokSubList1, setSosokSubList1] = useState([]);
    const [regSosokSubList2, setSosokSubList2] = useState([]);
    const [instSosokSubList, setInstSosokSubList] = useState([]);

    const [rowData, setRowData] = useState([]);

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

    //-------------------------- 배경정보 ------------------------------------//
    const [continent, setContinent] = useState(""); //대륙
    const [country, setCountry] = useState(""); //나라
    const [yearType, setYearType] = useState(yearTypeList[0].cd); //년도 유형
    const [prodYear, setProdYear] = useState(""); //제작시기
    const [producer, setProducer] = useState(""); //제작사
    const [getReason, setGetReason] = useState(""); //입수연유
    const [getYear, setGetYear] = useState(""); //입수년도
    const [eventTitle, setEventTitle] = useState(""); //행사명
    const [eventCount, setEventCount] = useState(""); //차수
    const [getLocation, setGetLocation] = useState(""); //입수장소
    const [getName, setGetName] = useState(""); //수상자
    const [donorName1, setDonorName1] = useState(""); //기증자1
    const [do1Sosok, setDo1Sosok] = useState(""); //기증자1 소속/직책
    const [donorName2, setDonorName2] = useState(""); //기증자2
    const [do2Sosok, setDo2Sosok] = useState(""); //기증자2 소속/직책
    const [impoGrade, setImpoGrade] = useState(""); //중요등급
    //-------------------------- 배경정보 ------------------------------------//

    //-------------------------- 설명정보 ------------------------------------//
    const [documnet, setDocument] = useState(""); //소장품 설명
    const [prodGrage, setProdGrade] = useState(""); //소장품 가치 등급
    const [subImfo, setSubImfo] = useState(""); //딸림자료 정보
    const [docMemo, setDocMemo] = useState(""); //기타
    //-------------------------- 설명정보 ------------------------------------//

    //-------------------------- 보관/보존정보 ------------------------------------//
    const [storage, setStorage] = useState(""); //보관구분
    const [regSosok1, setRegSosok1] = useState(""); //보관처1 소속1
    const [regSosokSub1, setRegSosokSub1] = useState(""); //보관처1 소속2
    const [regSosok2, setRegSosok2] = useState(""); //보관처2 소속1
    const [regSosokSub2, setRegSosokSub2] = useState(""); //보관처2 소속2
    const [prodState, setProdState] = useState(""); //상태
    //-------------------------- 보관/보존정보 ------------------------------------//

    //-------------------------- 등록자 정보 ------------------------------------//
    const [register, setRegister] = useState(""); //등록자
    const [inserSosok, setInserSosok] = useState("") //등록자 소속1
    const [inserSosokSub, setInserSosokSub] = useState("") //등록자 소속1
    const [regPosition, setRegiPosition] = useState(""); //직책
    //-------------------------- 등록자 정보 ------------------------------------//

    useEffect(() => {
        if (openUpdate) {
            selectOrganization();
            setPrdData(singleCurrRowData)
        }
    }, [openUpdate, singleCurrRowData])

    useEffect(() => {
        if (!openUpdate) {
            resetData();
        }
    }, [openUpdate])

    useEffect(() => {
        for (let i = 0; i < sosokList.length; i++) {
            if (sosokList[i].code === organization1) {
                setSosokSubList(sosokList[i].sub);
                break;
            }
        }
    }, [organization1, sosokList])

    useEffect(() => {
        let tempList = [];
        let tempArr = {};

        for (let i = 0; i < countryData.length; i++) {
            if (countryData[i].cd === continent) {
                tempArr = countryData[i].nations;
                break;
            }
        }

        for (let objKey in tempArr) {
            if (tempArr.hasOwnProperty(objKey)) {
                tempList.push(tempArr[objKey]);
                Object.assign(tempArr[objKey], { cd: objKey });
            }
        }
        setcountrySubList(tempList);
        if (tempList.length > 0) {
            setCountry(tempList[0].cd)
        }
    }, [continent, countryData])

    useEffect(() => {
        for (let i = 0; i < sosokList.length; i++) {
            if (sosokList[i].code === regSosok1) {
                setSosokSubList1(sosokList[i].sub);
                break;
            }
        }
    }, [regSosok1, sosokList])

    useEffect(() => {
        for (let i = 0; i < sosokList.length; i++) {
            if (sosokList[i].code === regSosok2) {
                setSosokSubList2(sosokList[i].sub);
                break;
            }
        }
    }, [regSosok2, sosokList])

    useEffect(() => {
        for (let i = 0; i < sosokList.length; i++) {
            if (sosokList[i].code === inserSosok) {
                setInstSosokSubList(sosokList[i].sub);
                break;
            }
        }
    }, [inserSosok, sosokList])

    //물품 정보 셋팅
    const setPrdData = (data) => {
        //박물 조회
        if (data.organization1) {
            setOrganization1(data.organization1)
        }
        setOrganization2(data.organization2)
        setName(data.name ? data.name : "");
        setSubName(data.subName ? data.subName : "");
        setEngName(data.engName ? data.engName : "");
        setOriName(data.oriName ? data.engName : "");
        setMainNumber(data.mainNumber ? data.mainNumber : 0);
        setSubNumber(data.subNumber ? data.subNumber : 0);
        setUseYn(data.useYn ? data.useYn : "N");
        setUseNumber(data.useNumber ? data.useNumber : 0);
        setMaterial(data.material ? data.material : "");
        if (data.sizeObj) {
            let tempList = [];
            Object.entries(data.sizeObj).map(([key, value]) => {
                tempList.push(value);
            })
            setSizelArr(tempList);
        } else {
            setSizelArr([{ name: sizeType[0].name, cd: sizeType[0].cd, size: "" }]);
        }
        setAddMemo(data.addMemo ? data.addMemo : "");

        //배경 정보
        if (data.continent) {
            setContinent(data.continent);
            setCountry(data.country);
        }
        setYearType(data.yearType ? data.yearType : "");
        setProdYear(data.prodYear ? data.prodYear : "");
        setProducer(data.producer ? data.producer : "");
        setGetReason(data.getReason ? data.getReason : "");
        setGetYear(data.getYear ? data.getYear : "");
        setEventTitle(data.eventTitle ? data.eventTitle : "");
        setEventCount(data.eventCount ? data.eventCount : "");
        setGetLocation(data.getLocation ? data.getLocation : "");
        setGetName(data.getName ? data.getName : "");
        setDonorName1(data.donorName1 ? data.donorName1 : "");
        setDo1Sosok(data.do1Sosok ? data.do1Sosok : "");
        setDonorName2(data.donorName2 ? data.donorName2 : "");
        setDo2Sosok(data.do2Sosok ? data.do2Sosok : "");
        setImpoGrade(data.impoGrade ? data.impoGrade : "");

        //설명 정보
        setDocument(data.documnet ? data.documnet : "");
        setProdGrade(data.prodGrage ? data.prodGrage : "");
        setSubImfo(data.subImfo ? data.subImfo : "");
        setDocMemo(data.docMemo ? data.docMemo : "");

        //보관/보존정보
        if (data.storage) {
            setStorage(data.storage);
        }
        setRegSosok1(data.regSosok1 ? data.regSosok1 : "");
        setRegSosokSub1(data.regSosokSub1 ? data.regSosokSub1 : "");
        setRegSosok2(data.regSosok2 ? data.regSosok2 : "");
        setRegSosokSub2(data.regSosokSub2 ? data.regSosokSub2 : "");
        setProdState(data.prodState ? data.prodState : "");

        //등록자 정보
        setRegister(data.register ? data.register : "");
        setInserSosok(data.inserSosok ? data.inserSosok : "");
        setInserSosokSub(data.inserSosokSub ? data.inserSosokSub : "");
        setRegiPosition(data.regPosition ? data.regPosition : "");
    }

    //모달 닫기 후 데이터 초기화
    const resetData = () => {
        //박물 조회
        setName("");
        setSubName("");
        setEngName("");
        setOriName("");
        setMainNumber(0);
        setSubNumber(0);
        setUseYn("N");
        setUseNumber(0);
        setMaterial("");
        setSizelArr([{ name: sizeType[0].name, cd: sizeType[0].cd, size: "" }]);
        setAddMemo("");

        //배경 정보
        setYearType("");
        setProdYear("");
        setProducer("");
        setGetReason("");
        setGetYear("");
        setEventTitle("");
        setEventCount("");
        setGetLocation("");
        setGetName("");
        setDonorName1("");
        setDo1Sosok("");
        setDonorName2("");
        setDo2Sosok("");
        setImpoGrade("");

        //설명 정보
        setDocument("");
        setProdGrade("");
        setSubImfo("");
        setDocMemo("");

        //보관/보존정보
        setProdState("");

        //등록자 정보
        setRegister("");
        setRegiPosition("");
    }

    //소속 리스트 호출
    const selectOrganization = async () => {

        // "http://smus.scjmatthias.net:5000/sosok"
        axios.get("http://smus.scjmatthias.net:5000/sosok").then((response) => {
            setSosokList(response.data);
        }).catch((e) => {
            console.log(e);
        })
    }

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
        if (targetData === "organization1" && (organization1 == undefined || organization1 == "")) {
            for (let i = 0; i < sosokList.length; i++) {
                if (sosokList[i].code === cd) {
                    setOrganization1(sosokList[i].code);
                    break;
                }
            }
        } else if (targetData === "organization2") {
            for (let i = 0; i < sosokSubList.length; i++) {
                if (sosokSubList[i].code === cd) {
                    setOrganization2(sosokSubList[i].code);
                    break;
                }
            }
        } else if (targetData === "continent" && (continent == undefined || continent == "")) {
            for (let i = 0; i < countryData.length; i++) {
                if (countryData[i].cd === cd) {
                    // setContinent(countryData[i].cd);
                    break;
                }
            }
        } else if (targetData === "country" && (country == undefined || country == "")) {
            for (let i = 0; i < countrySubList.length; i++) {
                if (countrySubList[i].cd === cd) {
                    setCountry(countrySubList[i].cd);
                    break;
                }
            }
        } else if (targetData === "storage" && (storage == undefined || storage == "")) {
            for (let i = 0; i < storageList.length; i++) {
                if (storageList[i].cd === cd) {
                    setStorage(storageList[i].cd);
                    break;
                }
            }
        } else if (targetData === "regSosok1" && (regSosok1 == undefined || regSosok1 == "")) {
            for (let i = 0; i < sosokList.length; i++) {
                if (sosokList[i].code === cd) {
                    setRegSosok1(sosokList[i].code);
                    break;
                }
            }
        } else if (targetData === "regSosokSub1") {
            for (let i = 0; i < regSosokSubList1.length; i++) {
                if (regSosokSubList1[i].code === cd) {
                    setRegSosokSub1(regSosokSubList1[i].code);
                    break;
                }
            }
        } else if (targetData === "regSosok2" && (regSosok2 == undefined || regSosok2 == "")) {
            for (let i = 0; i < sosokList.length; i++) {
                if (sosokList[i].code === cd) {
                    setRegSosok2(sosokList[i].code);
                    break;
                }
            }
        } else if (targetData === "regSosokSub2") {
            for (let i = 0; i < regSosokSubList2.length; i++) {
                if (regSosokSubList2[i].code === cd) {
                    setRegSosokSub2(regSosokSubList2[i].code);
                    break;
                }
            }
        } else if (targetData === "inserSosok" && (inserSosok == undefined || inserSosok == "")) {
            for (let i = 0; i < sosokList.length; i++) {
                if (sosokList[i].code === cd) {
                    setInserSosok(sosokList[i].code);
                    break;
                }
            }
        } else if (targetData === "inserSosokSub") {
            for (let i = 0; i < instSosokSubList.length; i++) {
                if (instSosokSubList[i].code === cd) {
                    setInserSosokSub(instSosokSubList[i].code);
                    break;
                }
            }
        }
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

    //미리보기 이미지 다운로드
    const downloadImage = (e) => {

        if (imageListUrl.length > 0) {
            for (let i = 0; i < imageListUrl.length; i++) {
                let url = imageListUrl[i];
                let fileNm = imageList[i].name;

                fetch(url, { method: 'GET' })
                    .then((res) => {
                        return res.blob();
                    })
                    .then((blob) => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = fileNm;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout((_) => {
                            window.URL.revokeObjectURL(url);
                        }, 60000);
                        a.remove();
                    })
                    .catch((err) => {
                        console.error('err: ', err);
                    });
            }
        } else {
            setContent("다운로드할 이미지가 없습니다.");
            setAlertOpen(true);
        }
    }

    //미리보기 이미지 업로드 버튼
    const addPrevImage = (e) => {
        addImageInput.current.click();
    }

    //미리보기 이미지 업로드
    const imageUpload = (e) => {
        let files = addImageInput.current.files;
        let tempList = [...imageList];
        let tempUrlList = [...imageListUrl];

        let imageListCnt = tempList.length; //기존 이미지 리스트 갯수
        let addImageListCnt = files.length; //추가된 이미지 리스트 갯수

        if (imageListCnt + addImageListCnt > 10) {
            setContent("최대 등록 가능한 이미지 갯수를 초과 하였습니다.");
            setAlertOpen(true);
            e.target.value = ''; //값 초기화
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            tempUrlList.push(URL.createObjectURL(addImageInput.current.files[i]));
            tempList.push(addImageInput.current.files[i])
        }
        setImageList(tempList);
        setImageListUrl(tempUrlList);

        e.target.value = ''; //값 초기화
    }

    //미리보기 이미지 클릭
    const selectPreviewImage = (e, data) => {
        setSingleCurrRowData(data);
        setOpenPreview(true);
    }

    const firstIcon = (e, index) => {
        e.stopPropagation();
    }

    //미리보기 이미지 제거
    const removePreviewImage = (e, index) => {
        e.stopPropagation();

        let tempList = [...imageList];
        let tempUrlList = [...imageListUrl];

        tempList.splice(index, 1);
        tempUrlList.splice(index, 1);
        setImageList(tempList);
        setImageListUrl(tempUrlList);
    }

    const countrySimpleSearch = (e) => {
        setCountrySimpleSearchModal(true);
    }

    //인사검색 모달 열기
    const personnelSearch = (e) => {
        setPersonnelSearchModal(true);
    }

    //인사 이미지 업로드 버튼
    const addPrevPersonImage = (e) => {
        addPersonImageInput.current.click();
    }

    //인사정보 사진 업로드
    const personImageUpload = (e) => {
        let files = addPersonImageInput.current.files;
        let tempList = [...personImageList];
        let tempUrlList = [...personImageListUrl];

        let imageListCnt = tempList.length; //기존 이미지 리스트 갯수
        let addImageListCnt = files.length; //추가된 이미지 리스트 갯수

        if (imageListCnt > 0) {
            setContent("이미 등록된 이미지가 있습니다.");
            setAlertOpen(true);
            e.target.value = ''; //값 초기화
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            tempUrlList.push(URL.createObjectURL(addPersonImageInput.current.files[i]));
            tempList.push(addPersonImageInput.current.files[i])
        }
        setPersonImageList(tempList);
        setPersonImageListUrl(tempUrlList);

        e.target.value = ''; //값 초기화
    }

    //인사정보 미리보기 이미지 제거
    const removePreviewPersonImage = (e, index) => {
        e.stopPropagation();

        let tempList = [...personImageList];
        let tempUrlList = [...personImageListUrl];

        tempList.splice(index, 1);
        tempUrlList.splice(index, 1);
        setPersonImageList(tempList);
        setPersonImageListUrl(tempUrlList);
    }

    //경고창 닫기
    const alertClose = () => {
        setAlertOpen(false);
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
                                                        <AddButton style={{ fontSize: '12px' }} onClick={(e) => addMaterial(e)}>+크기 추가</AddButton>
                                                    </div>
                                                    <div style={{ marginBottom: '3px', marginTop: '3px' }}>
                                                        <AddButton style={{ fontSize: '12px' }} onClick={(e) => removeMaterial(e)}>-크기 삭제</AddButton>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'center', backgroundColor: '#deebff' }}>크기</td>
                                                <td colSpan={3}>
                                                    <div style={{ display: "flex" }}>
                                                        {sizeArr.map((data, index) => {
                                                            return (
                                                                <div>
                                                                    {data.cd != "00" ?
                                                                        <select name="sizeType" value={data.cd} style={{ marginRight: "2px", width: "80px" }} onChange={(e) => { handleSizeType(e, index) }}>
                                                                            {sizeType.map((data1) => {
                                                                                return (
                                                                                    <option value={data1.cd} key={data1.cd}>
                                                                                        {data1.name}
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                        :
                                                                        <input type="text" style={{ marginRight: "2px", width: "80px", height: "20px" }} onChange={(e) => handleEditType(e, index)}></input>
                                                                    }
                                                                    <div>
                                                                        <input type="text" style={{ width: "80px" }} value={data.size} onChange={(e) => { handleSize(e, index) }}></input>
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
                    <div className={styles.preview_image_title}>
                        <ul>
                            <li>
                                <div>
                                    <span style={{ marginRight: '10px' }}>사진 정보</span>
                                    <NormalButton onClick={(e) => { downloadImage(e) }}>다운로드</NormalButton>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.preview_image_container}>
                        <div className={styles.preview_image_list}>
                            <div className={styles.preview_image_add} onClick={(e) => addPrevImage(e)}>
                                <div style={{ textAlign: 'center' }}>
                                    <div className={styles.camera_image}></div>
                                    <span style={{ fontSize: '20px' }}>{iamgeCount}/10</span>
                                    <input onChange={imageUpload} ref={addImageInput} type="file" multiple hidden accept="image/*" />
                                </div>
                            </div>
                            {imageListUrl.length > 0 && imageListUrl.map((data, index) => {
                                return (
                                    index === 0 ?
                                        <div className={styles.preview_image_add} onClick={(e) => selectPreviewImage(e, data)} key={index}>
                                            <div className={styles.preview_first_icon} onClick={(e) => firstIcon(e, index)}>대표</div>
                                            <div className={styles.preview_image_remove} onClick={(e) => removePreviewImage(e, index)}></div>
                                            <img
                                                style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
                                                src={data}
                                                alt="img"
                                            />
                                        </div>
                                        :
                                        <div className={styles.preview_image_add} onClick={(e) => selectPreviewImage(e, data)} key={index}>
                                            <div className={styles.preview_image_remove} onClick={(e) => removePreviewImage(e, index)}></div>
                                            <img
                                                style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
                                                src={data}
                                                alt="img"
                                            />
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.register_step_title}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            2. 배경 정보
                        </div>
                    </div>
                    <div className={styles.search_controller_container}>
                        <div className={styles.search_controller}>
                            <div className={styles.search_list}>
                                <table className={styles.search_table}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>박물국적</td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countrySubList} value={country} targetData={"country"} codeChange={(e) => setCountry(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <AddButton onClick={(e) => countrySimpleSearch(e)}>간편 조회</AddButton>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>제작 시기</td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>년도 유형</td>
                                            <td style={{ width: '30%' }}>
                                                <select name="yearType" value={yearType} onChange={(e) => setYearType(e.target.value)}>
                                                    {yearTypeList.map((data) => {
                                                        return (
                                                            <option value={data.cd}>
                                                                {data.name}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>제작시기</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={prodYear}
                                                        onChange={(e) => setProdYear(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }}
                                                        placeholder='text'
                                                        disabled={yearType == "00" ? true : false}
                                                    />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>제작사</td>
                                            <td colSpan={4}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        onChange={(e) => setProducer(e.target.value)}
                                                        value={producer}
                                                        fullWidth
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }}
                                                        placeholder='text'
                                                    />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>입수 연유</td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>입수 연유</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={getReason}
                                                        onChange={(e) => setGetReason(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>입수 년도</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={getYear}
                                                        onChange={(e) => setGetYear(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>행사명</td>
                                            <td colSpan={2}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={eventTitle}
                                                        onChange={(e) => setEventTitle(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                            <td style={{ textAlign: 'center', backgroundColor: '#deebff' }}>차수</td>
                                            <td>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={eventCount}
                                                        onChange={(e) => setEventCount(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>장소/수상자</td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>입수 장소</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={getLocation}
                                                        onChange={(e) => setGetLocation(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>수상자</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={getName}
                                                        onChange={(e) => setGetName(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={4} style={{ width: '10%', textAlign: 'center' }}>기증자 or 구입자
                                                <AddButton onClick={(e) => personnelSearch(e)}>인사 검색</AddButton>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>기증자명</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={donorName1}
                                                        onChange={(e) => setDonorName1(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='한글로 기재' />
                                                </Box>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>소속/직책</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={do1Sosok}
                                                        onChange={(e) => setDo1Sosok(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='한글로 기재' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>기증자명</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={donorName2}
                                                        onChange={(e) => setDonorName2(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='영어로 기재' />
                                                </Box>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>소속/직책</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={do2Sosok}
                                                        onChange={(e) => setDo2Sosok(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='영어로 기재' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>중요등급</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        fullWidth
                                                        value={impoGrade}
                                                        onChange={(e) => setImpoGrade(e.target.value)}
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder="text" />
                                                </Box>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}></td>
                                            <td style={{ width: '30%' }}>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>사진</td>
                                            <td style={{ width: '30%' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div className={styles.preview_person_image_add} onClick={(e) => addPrevPersonImage(e)}>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '5px' }}>
                                                                <div className={styles.camera_person_image}></div>
                                                            </div>
                                                            <span style={{ fontSize: '14px' }}>사진 등록</span>
                                                            <input onChange={personImageUpload} ref={addPersonImageInput} type="file" hidden accept="image/*" />
                                                        </div>
                                                    </div>
                                                    {personImageListUrl.length > 0 && personImageListUrl.map((data, index) => {
                                                        return (
                                                            <div className={styles.preview_person_image_add} onClick={(e) => selectPreviewImage(e, data)} key={index} >
                                                                <div className={styles.preview_image_remove} onClick={(e) => removePreviewPersonImage(e, index)}></div>
                                                                <img
                                                                    style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
                                                                    src={data}
                                                                    alt="img"
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.register_step_title}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            3. 설명 정보
                        </div>
                    </div>
                    <div className={styles.search_controller_container}>
                        <div className={styles.search_controller}>
                            <div className={styles.search_list}>
                                <table className={styles.search_table}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '11%', textAlign: 'center' }}>
                                                <div>
                                                    소장품 설명
                                                </div>
                                                <div>
                                                    (용도, 의미 등)
                                                </div>
                                            </td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <TextField
                                                        value={documnet}
                                                        onChange={(e) => setDocument(e.target.value)}
                                                        multiline
                                                        rows={3}
                                                        fullWidth
                                                        inputProps={{ style: { padding: 0, fontSize: 14, backgroundColor: 'white' } }} placeholder='text area' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>
                                                소장품 가치 등급
                                            </td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <Box sx={{ width: '20%' }}>
                                                    <TextField
                                                        value={prodGrage}
                                                        onChange={(e) => setProdGrade(e.target.value)}
                                                        fullWidth
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>
                                                딸림자료 정보
                                            </td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <TextField
                                                        value={subImfo}
                                                        onChange={(e) => setSubImfo(e.target.value)}
                                                        multiline
                                                        rows={3}
                                                        fullWidth
                                                        inputProps={{ style: { padding: 0, fontSize: 14, backgroundColor: 'white' } }} placeholder='text area' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>
                                                셋트 소장품 여부
                                            </td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <AddButton >간편 조회</AddButton>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>
                                                기타
                                            </td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <TextField
                                                        value={docMemo}
                                                        onChange={(e) => setDocMemo(e.target.value)}
                                                        rows={1}
                                                        fullWidth
                                                        inputProps={{ style: { fontSize: 14, backgroundColor: 'white' } }} placeholder='text area' />
                                                </Box>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.register_step_title}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            4. 보관 / 보존정보
                        </div>
                    </div>
                    <div className={styles.search_controller_container}>
                        <div className={styles.search_controller}>
                            <div className={styles.search_list}>
                                <table className={styles.search_table}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>보관구분</td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={storageList} value={storage} targetData={"storage"} codeChange={(e) => setStorage(e.target.value)} />}
                                                    labelPlacement="start"
                                                    label=""
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>보관처</td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>보관처1</td>
                                            <td style={{ width: '20%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={sosokList} value={regSosok1} targetData={"regSosok1"} codeChange={(e) => setRegSosok1(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={regSosokSubList1} value={regSosokSub1} targetData={"regSosokSub1"} codeChange={(e) => setRegSosokSub1(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                            </td>

                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>보관처2</td>
                                            <td style={{ width: '20%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={sosokList} value={regSosok2} targetData={"regSosok2"} codeChange={(e) => setRegSosok2(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={regSosokSubList2} value={regSosokSub2} targetData={"regSosokSub2"} codeChange={(e) => setRegSosokSub2(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                            </td>

                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>
                                                <div>
                                                    보존상태
                                                </div>
                                                <div>
                                                    / 보존상태
                                                </div>
                                            </td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <AddButton>추가 생성</AddButton>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>
                                                상태
                                            </td>
                                            <td colSpan={8} style={{ width: '90%' }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <TextField
                                                        value={prodState}
                                                        onChange={(e) => setProdState(e.target.value)}
                                                        rows={1}
                                                        fullWidth
                                                        inputProps={{ style: { fontSize: 14, backgroundColor: 'white' } }} placeholder='text area' />
                                                </Box>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.register_step_title}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            5. 등록자 정보
                        </div>
                    </div>
                    <div className={styles.search_controller_container}>
                        <div className={styles.search_controller}>
                            <div className={styles.search_list}>
                                <table className={styles.search_table}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>등록자</td>
                                            <td colSpan={4} style={{ width: '90%' }}>
                                                <Box sx={{ width: '20%' }}>
                                                    <TextField
                                                        value={register}
                                                        onChange={(e) => setRegister(e.target.value)}
                                                        fullWidth
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='등록자' />
                                                </Box>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '10%', textAlign: 'center' }}>소속/직책</td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>소속</td>
                                            <td style={{ width: '30%' }}>
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={sosokList} value={inserSosok} targetData={"inserSosok"} codeChange={(e) => setInserSosok(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                                <ComboControlLabel
                                                    control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={instSosokSubList} value={inserSosokSub} targetData={"inserSosokSub"} codeChange={(e) => setInserSosokSub(e.target.value)} />}
                                                    label=""
                                                    labelPlacement="start"
                                                />
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>직책</td>
                                            <td style={{ width: '30%' }}>
                                                <Box sx={{ width: '80%' }}>
                                                    <TextField
                                                        value={regPosition}
                                                        onChange={(e) => setRegiPosition(e.target.value)}
                                                        fullWidth
                                                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='직책' />
                                                </Box>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>

            {/* 알림창 */}
            <AlertModal
                open={alertOpen}
                onClose={alertClose}
                content={content}
            />
        </UpdateModal>
    )
}
export default ManagementUpdateModal;