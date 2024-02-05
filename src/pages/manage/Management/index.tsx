import styles from "./management.module.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import ManagementRegistModal from "src/pages/manage/modal/ManagementRegistModal"
import ManagementUpdateModal from "src/pages/manage/modal/ManagementUpdateModal"
import ImagePreviewModal from "src/pages/manage/modal/ImagePreviewModal";
import { BaseButton, DangerButton, NormalButton } from 'src/components/CustomButton';
import CustomDatePicker from 'src/components/CustomDatePicker';
import dayjs from 'dayjs';
import { ItemGroup, PopupFormControlLabel, ComboControlLabel } from 'src/components/modal/ItemGroup';
import CustomCombo from 'src/components/combobox/CustomCombo';
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
import CustomPagination from 'src/components/CustomPagination';
import AlertModal from 'src/components/modal/AlertModal';
import BatchUpdateModal from "src/pages/manage/modal/BatchUpdateModal";
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

const WngCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 12px'
}));

const Management = ({ }) => {
  const imgSize = { maxHeight: "100%", maxWidth: "100%", cursor: "pointer", display: "flex" };
  const [gridState, setgridState] = useState(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const [selectedRow, setSelectedRow] = useState([]);

  //등록모달 컨트롤 state
  const [openRegist, setOpenRegist] = useState(false);

  //수정모달 컨트롤 state
  const [openUpdate, setOpenUpdate] = useState(false);
  const [singleCurrRowData, setSingleCurrRowData] = useState({});

  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'number',
      headerName: 'No.',
      flex: 1.5,
      cellStyle: { textAlign: "center", whiteSpace: 'normal' },
      autoHeight: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: 'image', headerName: '대표 이미지', flex: 2, cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center", whiteSpace: 'normal' }, autoHeight: true,
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
    {
      field: '', headerName: '소장품 소속', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true,
      cellRenderer: function (row) {
        console.log(row)
        if (row.data.org1Value && row.data.org2Value) {
          return (
            <div>
              {row.data.org1Value + "/" + row.data.org2Value}
            </div>
          )
        } else {
          return null;
        }
      }
    },
    { field: 'number', headerName: '소장품 번호', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'detailNumber', headerName: '세부 번호', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'name', headerName: '명칭', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'mainNumber', headerName: '주수량', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'subNumber', headerName: '부수량', flex: 1.2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    {
      field: '', headerName: 'action', flex: 2, cellStyle: { textAlign: "center" },
      cellRenderer: function (row) {
        return (
          <div>
            <Button style={{ padding: 0, fontWeight: "bold" }} onClick={(e) => openUpdateModal(row)}>수정</Button>
          </div>
        )
      }
    }
  ]);

  //검색 테이블 on/off
  const [searchTable, setSearchTable] = useState(false);
  const [seachType, setSearchType] = useState("itemList");
  const [startDt, setStartDt] = useState(dayjs(new Date()).subtract(1, "month"))
  const [endDt, setEndDt] = useState(dayjs(new Date()));

  const [organization1, setOrganization1] = useState(""); //기관1
  const [organization2, setOrganization2] = useState(""); //기관2
  const [material1, setMaterial1] = useState("") //재질
  const [material2, setMaterial2] = useState("") //재질
  const [startNumber, setStartNumber] = useState(""); //시작번호
  const [endNumber, setEndNumber] = useState(""); //끝번호
  const [itemCountry, setItemCountry] = useState("") //상품국적
  const [broughtStartDt, setBroughtStartDt] = useState(dayjs(new Date()).subtract(1, "month")); //입수시기시작
  const [broughtEndDt, setBroughtEndDt] = useState(dayjs(new Date())); //입수시기끝
  const [donorCountry, setDonorCountry] = useState("") //기증자국적
  const [pageCnt, setPageCnt] = useState(10); //그리드 갯수
  const [page, setPage] = useState(1); //이미지리스트 현재 페이지
  const iamgeDetailBtn = useRef(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [content, setContent] = useState("");

  //재질 체크박스
  const [materialCheckItems, setMaterialCheckItems] = useState([]);
  //국적 체크박스
  const [countryCheckItems, setCountryCheckItems] = useState([]);
  //입수 연유 체크박스
  const [broughtReasonCheckItems, setBroughtReasonCheckItems] = useState([]);
  //연관 주제
  const [relatedTopicCheckItems, setRelatedTopicCheckItems] = useState([]);
  //기증자 국적 체크박스
  const [donorCountryCheckItems, setDonorCountryCheckItems] = useState([]);
  //이미지 리스트 체크박스
  const [imageListChckItems, setImageListChckItems] = useState([]);
  //이미지 리스트
  const [imageList, setImageList] = useState([]);
  //선택 일괄수정
  const [batchUpdateModal, setBatchUpdateModal] = useState(false);

  const [sosokList, setSosokList] = useState([]);
  const [sosokSubList, setSosokSubList] = useState([]);

  //체크박스 default 전체 선택
  useEffect(() => {
    let tempMaterialList = [];
    for (let i = 0; i < materialData.length; i++) {
      tempMaterialList.push(materialData[i].cd);
    }
    setMaterialCheckItems(tempMaterialList);

    let countryList = [];
    for (let i = 0; i < countryData.length; i++) {
      countryList.push(countryData[i].cd);
    }
    setCountryCheckItems(countryList);

    let broughtReasonList = [];
    for (let i = 0; i < broughtReasonData.length; i++) {
      broughtReasonList.push(broughtReasonData[i].cd);
    }
    setBroughtReasonCheckItems(broughtReasonList);
  }, [])

  //페이지네이션 작동
  useEffect(() => {
    let tempList = [...rowData];
    let currList = [];
    let offset = (page - 1) * pageCnt;
    currList = tempList.slice(offset, Number(offset) + Number(pageCnt));
    setImageList(currList);

    resetImageCheckbox();
  }, [pageCnt, page])

  //페이지 갯수 바꾸면 1페이지로 초기화
  useEffect(() => {
    setPage(1);
  }, [pageCnt]);

  //외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(e) {
      if (e.target.className !== styles.more_icon && iamgeDetailBtn.current) {
        let tempData = [...imageList];
        for (let i = 0; i < tempData.length; i++) {
          tempData[i].openMoreFlag = false;
        }
        setImageList(tempData);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [iamgeDetailBtn, imageList]);

  useEffect(() => {
    selectOrganization();
    selectItemList();
  }, [])

  useEffect(() => {
    for (let i = 0; i < sosokList.length; i++) {
      if (sosokList[i].code === organization1) {
        setSosokSubList(sosokList[i].sub);
        break;
      }
    }
  }, [organization1])

  //체크박스 초기화
  const resetImageCheckbox = () => {
    setImageListChckItems([]);
  }

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

  //데이터 리스트 호출
  const selectItemList = async () => {
    await axios
      .get("http://smus.scjmatthias.net:5000/artifact")
      .then(function (response) {
        if (response.statusText === "OK") {
          let resultData = [];
          if (response.data != "") {
            resultData = JSON.parse(response.data);
          }
          console.log(resultData)
          setRowData(resultData)
        } else {
        }
      })
      .catch(function (error) {
        console.log("실패", error);
      })
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

  //토글 검색 테이블
  const toggleSearchTable = () => {
    setSearchTable(!searchTable)
  }

  const handleListType = (value) => {
    //체크박스 초기화
    resetImageCheckbox();

    if (value === "itemList") {
      setSearchType("itemList")
    } else if (value === "imgList") {
      setSearchType("imgList");
    }
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
    } else if (targetData === "material1") {
      setMaterial1(materialList[cd].title)
    } else if (targetData === "material2") {
      setMaterial2(materialList[cd].title)
    } else if (targetData === "itemCountry") {
      setItemCountry(countryList[cd].title)
    } else if (targetData === "donorCountry") {
      setDonorCountry(countryList[cd].title)
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

  const onChangeCountry = (e) => {
    let isChecked = e.target.checked;

    if (e.target.value != "") {
      if (isChecked) {
        setCountryCheckItems(prev => [...prev, e.target.value]);
      } else {
        setCountryCheckItems(countryCheckItems.filter((el) => el !== e.target.value));
      }
      //전체선택일때
    } else {
      if (isChecked) {
        let idArray = [];
        countryData.map((data) => {
          idArray.push(data.cd);
        })
        setCountryCheckItems(idArray);
      } else {
        setCountryCheckItems([]);
      }
    }
  }

  const onChangeBroughtReson = (e) => {
    let isChecked = e.target.checked;

    if (e.target.value != "") {
      if (isChecked) {
        setBroughtReasonCheckItems(prev => [...prev, e.target.value]);
      } else {
        setBroughtReasonCheckItems(broughtReasonCheckItems.filter((el) => el !== e.target.value));
      }
      //전체선택일때
    } else {
      if (isChecked) {
        let idArray = [];
        broughtReasonData.map((data) => {
          idArray.push(data.cd);
        })
        setBroughtReasonCheckItems(idArray);
      } else {
        setBroughtReasonCheckItems([]);
      }
    }
  }

  const onChangeRelatedTopic = (e) => {
    let isChecked = e.target.checked;

    if (isChecked) {
      setRelatedTopicCheckItems(prev => [...prev, e.target.value]);
    } else {
      setRelatedTopicCheckItems(relatedTopicCheckItems.filter((el) => el !== e.target.value));
    }
  }

  const onChangeDonorCountry = (e) => {
    let isChecked = e.target.checked;

    if (e.target.value != "") {
      if (isChecked) {
        setDonorCountryCheckItems(prev => [...prev, e.target.value]);
      } else {
        setDonorCountryCheckItems(donorCountryCheckItems.filter((el) => el !== e.target.value));
      }
      //전체선택일때
    } else {
      if (isChecked) {
        let idArray = [];
        countryData.map((data) => {
          idArray.push(data.cd);
        })
        setDonorCountryCheckItems(idArray);
      } else {
        setDonorCountryCheckItems([]);
      }
    }
  }

  const onChangePageSize = (e) => {
    setPageCnt(e.target.value)
  };

  const onChangeSelectImageList = (e) => {
    let isChecked = e.target.checked;

    if (e.target.value != "") {
      if (isChecked) {
        setImageListChckItems(prev => [...prev, e.target.value]);
      } else {
        setImageListChckItems(imageListChckItems.filter((el) => el !== e.target.value));
      }
      //전체선택일때
    } else {
      if (isChecked) {
        let idArray = [];
        imageList.map((data) => {
          idArray.push(data.seqNo.toString());
        })

        setImageListChckItems(idArray);
      } else {
        setImageListChckItems([]);
      }
    }
  }

  const openMoreBtn = (e, index) => {
    let tempData = [...imageList];
    for (let i = 0; i < tempData.length; i++) {
      if (i === index) {
        tempData[i].openMoreFlag = !tempData[i].openMoreFlag;
      } else {
        tempData[i].openMoreFlag = false;
      }
    }
    setImageList(tempData);
  }

  const openDetailImageModal = (e, index) => {
    openPreviewModal(imageList[index])
  }

  const alertClose = () => {
    setAlertOpen(false);
  }

  const batchUpdate = (e) => {
    setBatchUpdateModal(true);
  }

  const closeBatchUpdateModal = () => {
    setBatchUpdateModal(false);
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

  return (
    <div className={styles.search_main}>
      <div className={styles.search_container}>
        <div className={styles.search_title}>
          박물 조회
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
                      <td style={{ width: '10%', textAlign: 'center' }}>국적</td>
                      <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>국적 대륙</td>
                      <td style={{ width: '30%' }}>

                        <label className={styles.normal_checkbox_lable}>
                          <input type="checkbox" onChange={(e) => onChangeCountry(e)} value={""} checked={countryCheckItems.length === countryData.length ? true : false} />
                          전체
                        </label>
                        {
                          countryData.length > 0 && countryData.map((data, index) => {
                            return (
                              <label className={styles.normal_checkbox_lable} key={index}>
                                <input type="checkbox" onChange={(e) => onChangeCountry(e)} value={data.cd} checked={countryCheckItems.includes(data.cd) ? true : false} />
                                {data.name}
                              </label>
                            )
                          })
                        }
                      </td>
                      <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>국적 나라</td>
                      <td style={{ width: '30%' }}>
                        <ComboControlLabel
                          control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryList} value={itemCountry} targetData={"itemCountry"} codeChange={(e) => setItemCountry(e.target.value)} />}
                          label=""
                          labelPlacement="start"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%', textAlign: 'center' }}>입수 연유</td>
                      <td colSpan={4} style={{ width: '90%' }}>
                        <label className={styles.normal_checkbox_lable}>
                          <input type="checkbox" onChange={(e) => onChangeBroughtReson(e)} value={""} checked={broughtReasonCheckItems.length === broughtReasonData.length ? true : false} />
                          전체
                        </label>
                        {
                          broughtReasonData.length > 0 && broughtReasonData.map((data, index) => {
                            return (
                              <label className={styles.normal_checkbox_lable} key={index}>
                                <input type="checkbox" onChange={(e) => onChangeBroughtReson(e)} value={data.cd} checked={broughtReasonCheckItems.includes(data.cd) ? true : false} />
                                {data.name}
                              </label>
                            )
                          })
                        }
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%', textAlign: 'center' }}>입수 시기</td>
                      <td colSpan={4} style={{ width: '90%' }}>
                        <CustomDatePicker startDt={broughtStartDt} endDt={broughtEndDt} setStartDt={setBroughtStartDt} setEndDt={setBroughtEndDt} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%', textAlign: 'center' }}>연관 주제</td>
                      <td colSpan={4} style={{ width: '90%' }}>
                        {
                          relatedTopicData.length > 0 && relatedTopicData.map((data, index) => {
                            return (
                              <label className={styles.normal_checkbox_lable} key={index}>
                                <input type="checkbox" onChange={(e) => onChangeRelatedTopic(e)} value={data.cd} checked={relatedTopicCheckItems.includes(data.cd) ? true : false} />
                                {data.name}
                                <label className={styles.normal_checkbox_lable}>
                                  <input type="number" min={0} />
                                  {data.cd === "3" ? "차" : "주년"}
                                </label>
                              </label>

                            )
                          })
                        }
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: '10%', textAlign: 'center' }}>기증자</td>
                      <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>국적 대륙</td>
                      <td style={{ width: '30%' }}>
                        <label className={styles.normal_checkbox_lable}>
                          <input type="checkbox" onChange={(e) => onChangeDonorCountry(e)} value={""} checked={donorCountryCheckItems.length === countryData.length ? true : false} />
                          전체
                        </label>
                        {
                          countryData.length > 0 && countryData.map((data, index) => {
                            return (
                              <label className={styles.normal_checkbox_lable} key={index}>
                                <input type="checkbox" onChange={(e) => onChangeDonorCountry(e)} value={data.cd} checked={donorCountryCheckItems.includes(data.cd) ? true : false} />
                                {data.name}
                              </label>
                            )
                          })
                        }
                      </td>
                      <td style={{ width: '10%', textAlign: 'center', backgroundColor: '#deebff' }}>국적 나라</td>
                      <td style={{ width: '30%' }}>
                        <ComboControlLabel
                          control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryList} value={donorCountry} targetData={"donorCountry"} codeChange={(e) => setDonorCountry(e.target.value)} />}
                          label=""
                          labelPlacement="start"
                        />
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
          <div className={styles.item_list_button_container}>
            <div className={styles.item_list_button_radio}>
              <input type='radio' id="itemList" name="searchType" value="itemList" checked={seachType === "itemList"} onChange={(e) => handleListType(e.target.value)} />
              <label htmlFor="itemList">결과 목록</label>
            </div>

            <div className={styles.item_list_button_radio}>
              <input type='radio' id="imgList" name="searchType" value="imgList" checked={seachType === "imgList"} onChange={(e) => handleListType(e.target.value)} />
              <label htmlFor="imgList">결과 이미지 목록</label>
            </div>
          </div>

          <div className={styles.item_list_area}>
            <div className={styles.item_list_result}>
              검색결과
              <p>(Total {itemList.length}건)</p>
            </div>
            <div className={styles.item_list_button_controller}>
              <div className={styles.float_left}>
                {seachType === "imgList" ?
                  <div className={styles.image_list_all_checkbox}>
                    <label className={styles.image_list_all_checkbox_label}>
                      <input type="checkbox" onChange={(e) => onChangeSelectImageList(e)} value={""} checked={imageListChckItems.length === imageList.length ? true : false} />
                      전체선택
                    </label>
                  </div>
                  :
                  null
                }
                <NormalButton >검색항목 추가/수정</NormalButton>
              </div>
              <div className={styles.float_right}>
                <NormalButton onClick={(e) => batchUpdate(e)}>선택 일괄수정</NormalButton>
                <NormalButton >인쇄</NormalButton>
                <NormalButton >다운로드</NormalButton>
                <select className={styles.ag_pageCnt_select} onChange={onChangePageSize} value={pageCnt}>
                  <option value="1">1</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            {seachType === "itemList" ?
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
              :
              <div className={styles.image_list_area}>
                <ul>
                  {imageList.length > 0 && imageList.map((data, index) => {
                    return (
                      <li key={index}>
                        <div className={styles.image_list_area_header}>
                          <div className={styles.image_list_area_header_checkbox}>
                            <input type="checkbox" onChange={(e) => onChangeSelectImageList(e)} value={data.seqNo} checked={imageListChckItems.includes(data.seqNo.toString()) ? true : false} />
                          </div>
                          <div className={styles.image_list_area_header_more}>
                            <div className={styles.more_icon} onClick={(e) => openMoreBtn(e, index)}>
                              {data.openMoreFlag ?
                                <ul ref={iamgeDetailBtn} className={styles.btn_more_ul} onClick={(e) => openDetailImageModal(e, index)}>
                                  <li>
                                    <a>
                                      <span>이미지 더보기</span>
                                    </a>
                                  </li>
                                </ul>
                                :
                                null
                              }
                            </div>
                          </div>
                        </div>
                        <div className={styles.image_list_area_imageContainer}>
                          <img
                            loading="lazy"
                            src={data.imageList.length > 0 ? data.imageList[0].imageSrc : '/img/empty-image.png'}
                          />
                        </div>
                        <div className={styles.image_list_area_title}>
                          {data.itemNm}
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <div className={styles.image_list_pagination}>
                  <CustomPagination
                    totalItemsCount={rowData.length}
                    pageCnt={pageCnt}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>

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

      {/* 이미지 미리보기 모달 */}
      <ImagePreviewModal
        openPreview={openPreview}
        closePreviewModal={closePreviewModal}
        singleCurrRowData={singleCurrRowData}
      />

      {/* 선택 일괄수정 모달 */}
      <BatchUpdateModal
        open={batchUpdateModal}
        onClose={closeBatchUpdateModal}
      />

      {/* 알림창 */}
      <AlertModal
        open={alertOpen}
        onClose={alertClose}
        content={content}
      />
    </div>
  );
};

export default Management;