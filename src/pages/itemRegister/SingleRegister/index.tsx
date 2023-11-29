import styles from "../register.module.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { NormalButton, BaseButton, AddButton } from 'src/components/CustomButton';
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
  relatedTopicData,
  historyData
} from 'src/jsonData';
import AlertModal from 'src/components/modal/AlertModal';
import PreviewModal from "src/pages/manage/modal/PreviewModal";
import SimpleSearchModal from "src/pages/manage/modal/SimpleSearchModal";
import CountrySimpleSearchModal from "src/pages/manage/modal/CountrySimpleSearchModal";
import PersonnelSearchModal from "src/pages/manage/modal/PersonnelSearchModal";
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

  const [today, setToday] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [organization1, setOrganization1] = useState(""); //기관1
  const [organization2, setOrganization2] = useState(""); //기관2
  const [mainNumber, setMainNumber] = useState(""); //주수량
  const [subNumber, setSubNumber] = useState(""); //부수량
  const [useYn, setUseYn] = useState("N");
  const [alertOpen, setAlertOpen] = useState(false);
	const [content, setContent] = useState("");
  const addImageInput = useRef(null); //이미지 정보 넘길 ref
  const [imageList, setImageList] = useState([]); //이미지 리스트
  const [imageListUrl, setImageListUrl] = useState([]); //미리보기 이미지 리스트
  const [iamgeCount, setImageCount] = useState(0);
  const [continent, setContinent] = useState(""); //대륙
  const [country, setCountry] = useState(""); //나라
  const addPersonImageInput = useRef(null); //인사정보 이미지 넘길 ref
  const [personImageList, setPersonImageList] = useState([]); //인사정보 이미지 리스트
  const [personImageListUrl, setPersonImageListUrl] = useState([]); //인사정보 미리보기 이미지 리스트
  
  const [columnDefs, setColumnDefs] = useState([
    { field: 'updDt', headerName: '수정일', flex: 2.5, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'updContents', headerName: '수정 내용', flex: 10, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'updNm', headerName: '수정자', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
    { field: 'regNm', headerName: '승인자', flex: 2, cellStyle: { textAlign: "center", whiteSpace: 'normal' }, autoHeight: true },
  ]);

  useEffect(()=>{
    //미리보기 이미지 갯수 최신화 하기 위함
    setImageCount(imageListUrl.length)
  },[imageListUrl])

  useEffect(()=>{
    console.log(personImageListUrl)
  },[personImageListUrl])

  const closePreviewModal = () => {
    setOpenPreview(false);
  }

  const alertClose = () =>{
		setAlertOpen(false);
	}

  const closeSimpleSearchModal = () =>{
    setSimpleSearchModal(false);
  }

  const closeCountrySimpleSearchModal = () =>{
    setCountrySimpleSearchModal(false);
  }

  const setFirstValue = (cd, targetData) => {
    if(targetData === "organization1"){
      setOrganization1(organization1List[cd].title)
    }else if(targetData === "organization2"){
      setOrganization2(organization2List[cd].title)
    }else if(targetData === "continent"){
      setContinent(countryData[cd].name);
    }else if(targetData === "country"){
      setCountry(countryList[cd].title);
    }
  }

  //딸림자료 유/무
  const changeUseYn = (e) =>{
    setUseYn(e.target.value)
  }

  //미리보기 이미지 업로드 버튼
  const addPrevImage = (e) =>{
    addImageInput.current.click();
  }

  //미리보기 이미지 업로드
  const imageUpload = (e) =>{
    let files = addImageInput.current.files;
    let tempList = [...imageList];
    let tempUrlList = [...imageListUrl];

    let imageListCnt = tempList.length; //기존 이미지 리스트 갯수
    let addImageListCnt = files.length; //추가된 이미지 리스트 갯수

    if(imageListCnt + addImageListCnt > 10){
      setContent("최대 등록 가능한 이미지 갯수를 초과 하였습니다.");
      setAlertOpen(true);
      e.target.value = ''; //값 초기화
      return false;
    }

    for(let i=0; i<files.length; i++){
      tempUrlList.push(URL.createObjectURL(addImageInput.current.files[i]));
      tempList.push(addImageInput.current.files[i])
    }
    setImageList(tempList);
    setImageListUrl(tempUrlList);

    e.target.value = ''; //값 초기화
  }

  //미리보기 이미지 클릭
  const selectPreviewImage =(e, data) =>{
    setSingleCurrRowData(data);
    setOpenPreview(true);
  }

  //미리보기 이미지 제거
  const removePreviewImage= (e, index) =>{
    e.stopPropagation();

    let tempList = [...imageList];
    let tempUrlList = [...imageListUrl];

    tempList.splice(index, 1);
    tempUrlList.splice(index, 1);
    setImageList(tempList);
    setImageListUrl(tempUrlList);
  }

  //미리보기 이미지 다운로드
  const downloadImage = (e) =>{

    if(imageListUrl.length > 0){
      for(let i=0; i<imageListUrl.length; i++){
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
    }else{
      setContent("다운로드할 이미지가 없습니다.");
      setAlertOpen(true);
    }
  }

  const simpleSearch = (e) =>{
    setSimpleSearchModal(true)
  }

  const countrySimpleSearch = (e) =>{
    setCountrySimpleSearchModal(true);
  }

  const firstIcon = (e, index) =>{
    e.stopPropagation();
  }

   //인사 이미지 업로드 버튼
   const addPrevPersonImage = (e) =>{
    addPersonImageInput.current.click();
  }

  //인사정보 사진 업로드
  const personImageUpload = (e) =>{
    let files = addPersonImageInput.current.files;
    let tempList = [...personImageList];
    let tempUrlList = [...personImageListUrl];

    let imageListCnt = tempList.length; //기존 이미지 리스트 갯수
    let addImageListCnt = files.length; //추가된 이미지 리스트 갯수

    if(imageListCnt > 0){
      setContent("이미 등록된 이미지가 있습니다.");
      setAlertOpen(true);
      e.target.value = ''; //값 초기화
      return false;
    }

    for(let i=0; i<files.length; i++){
      tempUrlList.push(URL.createObjectURL(addPersonImageInput.current.files[i]));
      tempList.push(addPersonImageInput.current.files[i])
    }
    setPersonImageList(tempList);
    setPersonImageListUrl(tempUrlList);

    e.target.value = ''; //값 초기화
  }

  //인사정보 미리보기 이미지 제거
  const removePreviewPersonImage= (e, index) =>{
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
  const closePersonnelSearchModal = () =>{
    setPersonnelSearchModal(false);
  }

  //인사검색 모달 열기
  const personnelSearch = (e) =>{
    setPersonnelSearchModal(true);
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
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            1. 박물 조회
          </div>
          <div>
            <BaseButton onClick={(e)=>simpleSearch(e)}>간단조회</BaseButton>
          </div>
        </div>
        <div className={styles.search_controller_container}>
          <div className={styles.search_controller}>
            <div className={styles.search_list}>
              <table className={styles.search_table}>
                <tbody>
                  <tr>
                    <td style={{width: '10%', textAlign: 'center'}}>등록일</td>
                    <td colSpan={4} style={{width: '90%'}}>
                      {today}
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>보관 소속</td>
                    <td colSpan={2}>
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
                    <td style={{textAlign: 'center', backgroundColor: '#deebff'}}>소장품 번호</td>
                    <td >
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>명칭</td>
                    <td colSpan={4}>
                      <Box sx={{width: '80%'}}>
                        <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>명칭(이명)</td>
                    <td colSpan={4}>
                      <Box sx={{width: '80%'}}>
                        <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>영어명칭</td>
                    <td colSpan={4}>
                      <Box sx={{width: '80%'}}>
                        <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>원어명칭</td>
                    <td colSpan={4}>
                      <Box sx={{width: '80%'}}>
                        <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td style={{width: '10%', textAlign: 'center'}}>수량</td>
                    <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>주 수량(건)</td>
                    <td style={{width: '30%'}}>
                      <ComboControlLabel
                        control={<TextField fullWidth size="small" value={mainNumber} inputProps={{ maxLength: 20, min: 0 }} onChange={(e) => setMainNumber(e.target.value)} type="number"/>}
                        label=""
                        labelPlacement="start"
                      />
                    </td>
                    <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>부 수량(점)</td>
                    <td style={{width: '30%'}}>
                      <ComboControlLabel
                        control={<TextField fullWidth size="small" value={subNumber} inputProps={{ maxLength: 20, min: 0 }} onChange={(e) => setSubNumber(e.target.value)} type="number"/>}
                        label=""
                        labelPlacement="start"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{width: '10%', textAlign: 'center'}}>딸림자료</td>
                    <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>유/무</td>
                    <td style={{width: '30%'}}>
                      <div className={styles.checkbox_container}>
                        <div className={styles.checkbox_item}>
                          <label>
                            <input 
                              type='radio' 
                              name='useYn'
                              value='N'
                              checked={useYn === "N" }   
                              onChange={(e)=>changeUseYn(e)}
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
                              checked={useYn === "Y" }   
                              onChange={(e)=>changeUseYn(e)}
                            />
                            유
                          </label>
                        </div>
                      </div>
                    </td>
                    <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>딸림수량</td>
                    <td style={{width: '30%'}}>
                    </td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>재질/크기</td>
                    <td style={{textAlign: 'center', backgroundColor: '#deebff'}}>상세번호</td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}>
                      <div style={{marginBottom: '5px', marginTop: '3px'}}>
                        <AddButton >+크기 추가</AddButton>
                      </div>
                      <div style={{marginBottom: '3px', marginTop: '3px'}}>
                        <AddButton >-크기 삭제</AddButton>
                      </div>
                    </td>
                    <td style={{textAlign: 'center', backgroundColor: '#deebff'}}>상세번호</td>
                  </tr>
                  <tr>
                    <td style={{width: '10%', textAlign: 'center'}}>추가 상세 기술</td>
                    <td colSpan={4} style={{width: '90%'}}>
                      <Box sx={{width: '100%'}}>
                        <TextField multiline rows={3} fullWidth inputProps={{style: {padding: 0, fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
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
              <span style={{marginRight: '10px'}}>사진 정보</span>
              <NormalButton onClick={(e)=>{downloadImage(e)}}>다운로드</NormalButton>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.preview_image_container}>
        <div className={styles.preview_image_list}>
          <div className={styles.preview_image_add} onClick={(e)=>addPrevImage(e)}>
            <div style={{textAlign: 'center'}}>
              <div className={styles.camera_image}></div>
              <span style={{fontSize: '20px'}}>{iamgeCount}/10</span>
              <input onChange={imageUpload} ref={addImageInput} type="file" multiple hidden accept="image/*"/>
            </div>
          </div>
          {imageListUrl.length > 0 && imageListUrl.map((data, index)=>{
              return(
                index === 0 ?
                <div className={styles.preview_image_add} onClick={(e)=>selectPreviewImage(e, data)}>
                  <div className={styles.preview_first_icon} onClick={(e)=>firstIcon(e, index)}>대표</div>
                  <div className={styles.preview_image_remove} onClick={(e)=>removePreviewImage(e, index)}></div>
                  <img
                    style={{width:'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%'}}
                    src={data}
                    alt="img"
                  />
                </div>
                :
                <div className={styles.preview_image_add} onClick={(e)=>selectPreviewImage(e, data)}>
                  <div className={styles.preview_image_remove} onClick={(e)=>removePreviewImage(e, index)}></div>
                  <img
                    style={{width:'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%'}}
                    src={data}
                    alt="img"
                  />
                </div>
              )
            })}
        </div>
      </div>
      <div className={styles.register_step_title}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
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
                  <td style={{width: '10%', textAlign: 'center'}}>박물국적</td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryList} value={country} targetData={"country"} codeChange={(e) => setCountry(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                    <AddButton onClick={(e)=>countrySimpleSearch(e)}>간편 조회</AddButton>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>제작 시기</td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>년도 유형</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>제작시기</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: 'center'}}>제작사</td>
                  <td colSpan={4}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>입수 연유</td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>입수 연유</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>입수 년도</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign: 'center'}}>행사명</td>
                  <td colSpan={2}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                  <td style={{textAlign: 'center', backgroundColor: '#deebff'}}>차수</td>
                  <td>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>장소/수상자</td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>입수 장소</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>수상자</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='text'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={4} style={{width: '10%', textAlign: 'center'}}>기증자 or 구입자
                    <AddButton onClick={(e)=>personnelSearch(e)}>인사 검색</AddButton>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>기증자명</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='한글로 기재'/>
                    </Box>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>소속/직책</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='한글로 기재'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>기증자명</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='영어로 기재'/>
                    </Box>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>소속/직책</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='영어로 기재'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>중요등급</td>
                  <td style={{width: '30%'}}>
                    <Box sx={{width: '80%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='영어로 기재'/>
                    </Box>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}></td>
                  <td style={{width: '30%'}}>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>사진</td>
                  <td style={{width: '30%'}}>
                    <div style={{display: 'flex'}}>
                      <div className={styles.preview_person_image_add} onClick={(e)=>addPrevPersonImage(e)}>
                        <div style={{textAlign: 'center'}}>
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '5px'}}>
                            <div className={styles.camera_person_image}></div>
                          </div>
                          <span style={{fontSize: '14px'}}>사진 등록</span>
                          <input onChange={personImageUpload} ref={addPersonImageInput} type="file" hidden accept="image/*"/>
                        </div>
                      </div>
                      {personImageListUrl.length > 0 && personImageListUrl.map((data, index)=>{
                        return(
                          <div className={styles.preview_person_image_add} onClick={(e)=>selectPreviewImage(e, data)}>
                            <div className={styles.preview_image_remove} onClick={(e)=>removePreviewPersonImage(e, index)}></div>
                            <img
                              style={{width:'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%'}}
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
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          3. 설명 정보
        </div>
      </div>
      <div className={styles.search_controller_container}>
        <div className={styles.search_controller}>
          <div className={styles.search_list}>
            <table className={styles.search_table}>
              <tbody>
                <tr>
                  <td style={{width: '11%', textAlign: 'center'}}>
                    <div>
                      소장품 설명
                    </div>
                    <div>
                      (용도, 의미 등)
                    </div>
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <Box sx={{width: '100%'}}>
                      <TextField multiline rows={3} fullWidth inputProps={{style: {padding: 0, fontSize: 14, backgroundColor: 'white'}}} placeholder='text area'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>
                    소장품 가치 등급
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <Box sx={{width: '20%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='선택'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>
                    딸림자료 정보
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <Box sx={{width: '100%'}}>
                      <TextField multiline rows={3} fullWidth inputProps={{style: {padding: 0, fontSize: 14, backgroundColor: 'white'}}} placeholder='text area'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>
                    셋트 소장품 여부
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <AddButton >간편 조회</AddButton>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>
                    기타
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <Box sx={{width: '100%'}}>
                      <TextField rows={1} fullWidth inputProps={{style: {fontSize: 14, backgroundColor: 'white'}}} placeholder='text area'/>
                    </Box>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.register_step_title}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
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
                  <td style={{width: '10%', textAlign: 'center'}}>보관구분</td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>보관처</td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>보관처1</td>
                  <td style={{width: '10%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>보관처2</td>
                  <td style={{width: '10%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>보관처3</td>
                  <td style={{width: '10%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>보관처4</td>
                  <td style={{width: '10%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>
                    <div>
                      보존상태
                    </div>
                    <div>
                      / 보존상태
                    </div>
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <AddButton>추가 생성</AddButton>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>
                    상태
                  </td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <ComboControlLabel
                      control={<CustomCombo size="small" type="none" setData={setFirstValue} dataList={countryData} value={continent} targetData={"continent"} codeChange={(e) => setContinent(e.target.value)} />}
                      label=""
                      labelPlacement="start"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.register_step_title}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          5. 등록자 정보
        </div>
      </div>
      <div className={styles.search_controller_container}>
        <div className={styles.search_controller}>
          <div className={styles.search_list}>
            <table className={styles.search_table}>
              <tbody>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>등록자</td>
                  <td colSpan={4} style={{width: '90%'}}>
                    <Box sx={{width: '20%'}}>
                      <TextField fullWidth inputProps={{style: {height: '0px', fontSize: 14, backgroundColor: 'white'}}} placeholder='등록자'/>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td style={{width: '10%', textAlign: 'center'}}>소속/직책</td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>소속</td>
                  <td style={{width: '30%'}}>
                  </td>
                  <td style={{width: '10%', textAlign: 'center', backgroundColor: '#deebff'}}>직책</td>
                  <td style={{width: '30%'}}>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.register_step_title}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
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
      </div>
      <div className={styles.register_step_title}>
          <NormalButton sx={{backgroundColor: 'gray', width: '100px'}}>수정</NormalButton>
          <BaseButton sx={{width: '100px'}}>등록</BaseButton>
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