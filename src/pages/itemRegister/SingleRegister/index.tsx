import styles from "../register.module.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { NormalButton, BaseButton, AddButton } from 'src/components/CustomButton';
import dayjs from 'dayjs';
import { ItemGroup, PopupFormControlLabel, ComboControlLabel } from 'src/components/modal/ItemGroup';
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
import PreviewModal from "src/pages/manage/modal/PreviewModal";
import SimpleSearchModal from "src/pages/manage/modal/SimpleSearchModal";
import CountrySimpleSearchModal from "src/pages/manage/modal/CountrySimpleSearchModal";
import PersonnelSearchModal from "src/pages/manage/modal/PersonnelSearchModal";
import AgGrid from "src/components/AgGrid";
import axios from 'axios';

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

const SingleRegister = ({ }) => {
  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [pageCnt, setPageCnt] = useState(10); //그리드 갯수

  const [rowData, setRowData] = useState(historyData); // Set rowData to Array of Objects, one Object per Row

  const [singleCurrRowData, setSingleCurrRowData] = useState(""); //최근 선택한 이미지 url

  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false); //미리보기 모달 오픈
  const [simpleSearchModal, setSimpleSearchModal] = useState(false); //간단조회 모달 오픈
  const [countrySimpleSearchModal, setCountrySimpleSearchModal] = useState(false); //나라명 간단조회 모달 오픈
  const [personnelSearchModal, setPersonnelSearchModal] = useState(false); //인사검색 모달

  const [alertOpen, setAlertOpen] = useState(false);
  const [content, setContent] = useState("");
  const addImageInput = useRef(null); //이미지 정보 넘길 ref
  const [imageList, setImageList] = useState([]); //이미지 리스트
  const [imageListUrl, setImageListUrl] = useState([]); //미리보기 이미지 리스트
  const [iamgeCount, setImageCount] = useState(0);

  const addPersonImageInput = useRef(null); //인사정보 이미지 넘길 ref
  const [personImageList, setPersonImageList] = useState([]); //인사정보 이미지 리스트
  const [personImageListUrl, setPersonImageListUrl] = useState([]); //인사정보 미리보기 이미지 리스트

  const [sosokList, setSosokList] = useState([]);
  const [sosokSubList, setSosokSubList] = useState([]);
  const [regSosokSubList1, setSosokSubList1] = useState([]);
  const [regSosokSubList2, setSosokSubList2] = useState([]);
  const [countrySubList, setcountrySubList] = useState([]);
  const [instSosokSubList, setInstSosokSubList] = useState([]);

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

  const [columnDefs, setColumnDefs] = useState([
    { field: 'updDt', headerName: '수정일', flex: 2.5, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'updContents', headerName: '수정 내용', flex: 10, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'updNm', headerName: '수정자', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'regNm', headerName: '승인자', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
  ]);



  useEffect(() => {
    //미리보기 이미지 갯수 최신화 하기 위함
    setImageCount(imageListUrl.length)
  }, [imageListUrl])

  useEffect(() => {
    selectOrganization();
  }, [])

  useEffect(() => {
    for (let i = 0; i < sosokList.length; i++) {
      if (sosokList[i].code === organization1) {
        setSosokSubList(sosokList[i].sub);
        break;
      }
    }
  }, [organization1])

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
  }, [continent])


  useEffect(() => {
    for (let i = 0; i < sosokList.length; i++) {
      if (sosokList[i].code === regSosok1) {
        setSosokSubList1(sosokList[i].sub);
        break;
      }
    }
  }, [regSosok1])

  useEffect(() => {
    for (let i = 0; i < sosokList.length; i++) {
      if (sosokList[i].code === regSosok2) {
        setSosokSubList2(sosokList[i].sub);
        break;
      }
    }
  }, [regSosok2])

  useEffect(() => {
    for (let i = 0; i < sosokList.length; i++) {
      if (sosokList[i].code === inserSosok) {
        setInstSosokSubList(sosokList[i].sub);
        break;
      }
    }
  }, [inserSosok])

  const closePreviewModal = () => {
    setOpenPreview(false);
  }

  const alertClose = () => {
    setAlertOpen(false);
  }

  const closeSimpleSearchModal = () => {
    setSimpleSearchModal(false);
  }

  const closeCountrySimpleSearchModal = () => {
    setCountrySimpleSearchModal(false);
  }

  const setFirstValue = (cd, targetData) => {
    if (targetData === "organization1") {
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
    } else if (targetData === "continent") {
      for (let i = 0; i < countryData.length; i++) {
        if (countryData[i].cd === cd) {
          setContinent(countryData[i].cd);
          break;
        }
      }
    } else if (targetData === "country") {
      for (let i = 0; i < countrySubList.length; i++) {
        if (countrySubList[i].cd === cd) {
          setCountry(countrySubList[i].cd);
          break;
        }
      }
    } else if (targetData === "storage") {
      for (let i = 0; i < storageList.length; i++) {
        if (storageList[i].cd === cd) {
          setStorage(storageList[i].cd);
          break;
        }
      }
    } else if (targetData === "regSosok1") {
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
    } else if (targetData === "regSosok2") {
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
    } else if (targetData === "inserSosok") {
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

  const simpleSearch = (e) => {
    setSimpleSearchModal(true)
  }

  const countrySimpleSearch = (e) => {
    setCountrySimpleSearchModal(true);
  }

  const firstIcon = (e, index) => {
    e.stopPropagation();
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

  //그리드 row 클릭
  const onRowClicked = (row: any) => {
  }

  //인사검색 모달 닫기
  const closePersonnelSearchModal = () => {
    setPersonnelSearchModal(false);
  }

  //인사검색 모달 열기
  const personnelSearch = (e) => {
    setPersonnelSearchModal(true);
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

  //등록
  const insertItem = async () => {
    // "http://smus.scjmatthias.net:5000/artifact"

    //딸림자료 유무로 인한 수량 체크
    let tempCnt = 0;
    if (useYn === "Y") {
      tempCnt = useNumber;
    }

    let sizeObj = Object.assign({}, sizeArr);

    //보관소속 이름 추출
    let org1Value = "";
    let org2Value = "";
    for (let i = 0; i < sosokList.length; i++) {
      if (sosokList[i].code == organization1) {
        org1Value = sosokList[i].name;
        break;
      }
    }

    for (let i = 0; i < sosokSubList.length; i++) {
      if (sosokSubList[i].code == organization2) {
        org2Value = sosokSubList[i].name;
        break;
      }
    }

    let tempProdYear = "";
    if (yearType != "00") {
      tempProdYear = prodYear;
    }

    //raw data
    const object = {
      today: today, //등록일
      organization1: organization1, //보관소속1
      organization2: organization2, //보관소속2
      org1Value: org1Value, //보관소속1 명칭
      org2Value: org2Value, //보관소속2 명칭
      name: name, //명칭
      subName: subName, //이명
      engName: engName, //영어이름
      oriName: oriName, //원어명칭
      mainNumber: mainNumber, //주수량
      subNumber: subNumber, //부수량
      useYn: useYn, //딸람자료 유무
      useNumber: tempCnt, //딸림수량
      material: material, //재질
      sizeObj: sizeObj, //사이즈
      addMemo: addMemo, //추가상세기술

      continent: continent, //대륙
      country: country, //나라
      yearType: yearType, //년도 유형
      prodYear: tempProdYear, //제작시기
      producer: producer, //제작사
      getReason: getReason, //입수연유
      getYear: getYear, //입수년도
      eventTitle: eventTitle, //행사명
      eventCount: eventCount, //차수
      getLocation: getLocation, //입사장소
      getName: getName, //수상자
      donorName1: donorName1, //기증자1
      do1Sosok: do1Sosok, //기증자1 소속/직책
      donorName2: donorName2, //기증자2
      do2Sosok: do2Sosok, //기증자2 소속/직책
      impoGrade: impoGrade, //중요등급

      documnet: documnet, //소장품 설명
      prodGrage: prodGrage, //소장품 가치 등급
      subImfo: subImfo, //딸림자료 정보
      docMemo: docMemo, //기타

      storage: storage, //보관 구분
      regSosok1: regSosok1, //보관처1
      regSosokSub1: regSosokSub1, //보관처1 서브
      regSosok2: regSosok2, //보관처2
      regSosokSub2: regSosokSub2, //보관처2 서브
      prodState: prodState, //상태

      register: register, //등록자
      inserSosok: inserSosok, //등록자 소속1
      inserSosokSub: inserSosokSub, //등록자 소속1 서브
      regPosition: regPosition, //직책

      openMoreFlag: false, //더보기 플래그
    }

    const params = new FormData();
    //사진정보
    // for (let i = 0; i < imageList.length; i++) {
    //   params.append('file', imageList[i]);
    // }

    params.append('data', JSON.stringify(object));

    await axios
      .post("http://smus.scjmatthias.net:5000/artifact", params)
      .then(function (response) {
        if (response.statusText === "OK") {
          alert("등록완료");
          window.location.reload();
          // resetData();
          window.scrollTo(0, 0);
        } else {
        }
      })
      .catch(function (error) {
        console.log("실패", error);
      })
  }

  //등록 후 데이터 리셋
  const resetData = () => {
    setOrganization1(sosokList[0].code);
    setOrganization2(sosokSubList[0].code);
    setName("");
    setSubName("");
    setEngName("");
    setOriName("");
    setMainNumber(0);
    setSubNumber(0);
    setUseYn("N");
    setUseNumber(0);

    setAddMemo("");

    setContinent(countryData[0].cd);
    setCountry(countrySubList[0].cd);
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
    <div className={styles.search_main}>
      <div className={styles.page_state}>
        <div>
          {"박물등록 > 개별등록"}
        </div>
        <div>
          <NormalButton>임시저장</NormalButton>
        </div>
      </div>
      <div className={styles.search_container}>
        <div className={styles.register_step_title}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            1. 박물 조회
          </div>
          <div>
            <BaseButton onClick={(e) => simpleSearch(e)}>간단조회</BaseButton>
          </div>
        </div>
        <div className={styles.search_controller_container}>
          <div className={styles.search_controller}>
            <div className={styles.search_list}>
              <table className={styles.search_table}>
                <tbody>
                  <tr>
                    <td style={{ width: '10%', textAlign: 'center' }}>등록일</td>
                    <td colSpan={4} style={{ width: '90%' }}>
                      {today}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>보관 소속</td>
                    <td colSpan={2}>
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
                    <td style={{ textAlign: 'center', backgroundColor: '#deebff' }}>소장품 번호</td>
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
        <div>
          <NormalButton>임시저장</NormalButton>
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
                    <select name="yearType" onChange={(e) => setYearType(e.target.value)}>
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
                        onChange={(e) => setGetReason(e.target.value)}
                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                    </Box>
                  </td>
                  <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>입수 년도</td>
                  <td style={{ width: '30%' }}>
                    <Box sx={{ width: '80%' }}>
                      <TextField
                        fullWidth
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
                        onChange={(e) => setEventTitle(e.target.value)}
                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                    </Box>
                  </td>
                  <td style={{ textAlign: 'center', backgroundColor: '#deebff' }}>차수</td>
                  <td>
                    <Box sx={{ width: '80%' }}>
                      <TextField
                        fullWidth
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
                        onChange={(e) => setGetLocation(e.target.value)}
                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='text' />
                    </Box>
                  </td>
                  <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>수상자</td>
                  <td style={{ width: '30%' }}>
                    <Box sx={{ width: '80%' }}>
                      <TextField
                        fullWidth
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
                        onChange={(e) => setDonorName1(e.target.value)}
                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='한글로 기재' />
                    </Box>
                  </td>
                  <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>소속/직책</td>
                  <td style={{ width: '30%' }}>
                    <Box sx={{ width: '80%' }}>
                      <TextField
                        fullWidth
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
                        onChange={(e) => setDonorName2(e.target.value)}
                        inputProps={{ style: { height: '0px', fontSize: 14, backgroundColor: 'white' } }} placeholder='영어로 기재' />
                    </Box>
                  </td>
                  <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>소속/직책</td>
                  <td style={{ width: '30%' }}>
                    <Box sx={{ width: '80%' }}>
                      <TextField
                        fullWidth
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
        <div>
          <NormalButton>임시저장</NormalButton>
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
      {/* <div className={styles.register_step_title}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          6. History
        </div>
      </div>
      <div className={styles.search_controller_container}>
        <div className={styles.search_controller}>
          <div className={styles.search_list}>
            <AgGrid
              setRef={setgridState} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              onRowClicked={onRowClicked}
              heightVal={300}
              pageCnt={pageCnt}
            />
          </div>
        </div>
      </div> */}
      <div className={styles.register_float_right}>
        {/* <NormalButton sx={{ backgroundColor: 'gray', width: '100px' }}>수정</NormalButton> */}
        <BaseButton sx={{ width: '100px' }} onClick={(e) => insertItem()}>등록</BaseButton>
      </div>

      {/* 이미지 미리보기 */}
      <PreviewModal
        openPreview={openPreview}
        closePreviewModal={closePreviewModal}
        singleCurrRowData={singleCurrRowData}
      />

      {/* 알림창 */}
      <AlertModal
        open={alertOpen}
        onClose={alertClose}
        content={content}
      />

      {/* 간단조회 미리보기 */}
      <SimpleSearchModal
        open={simpleSearchModal}
        onClose={closeSimpleSearchModal}
      />

      {/* 나라명 간편조회 */}
      <CountrySimpleSearchModal
        open={countrySimpleSearchModal}
        onClose={closeCountrySimpleSearchModal}
      />

      {/* 인사검색 */}
      <PersonnelSearchModal
        open={personnelSearchModal}
        onClose={closePersonnelSearchModal}
      />
    </div>
  );
};

export default SingleRegister;