import styles from "../register.module.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import ManagementRegistModal from "src/pages/manage/modal/ManagementRegistModal"
import ManagementUpdateModal from "src/pages/manage/modal/ManagementUpdateModal"
import PreviewModal from "src/pages/manage/modal/PreviewModal";
import { NormalButton, BaseButton, AddButton } from 'src/components/CustomButton';
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
  const [rowData, setRowData] = useState(itemList); // Set rowData to Array of Objects, one Object per Row

  const [singleCurrRowData, setSingleCurrRowData] = useState(""); //최근 선택한 이미지 url

  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false);
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

  useEffect(()=>{
    //미리보기 이미지 갯수 최신화 하기 위함
    setImageCount(imageListUrl.length)
  },[imageListUrl])

  const closePreviewModal = () => {
    setOpenPreview(false);
  }

  const alertClose = () =>{
		setAlertOpen(false);
	}

  const setFirstValue = (cd, targetData) => {
    if(targetData === "organization1"){
      setOrganization1(organization1List[cd].title)
    }else if(targetData === "organization2"){
      setOrganization2(organization2List[cd].title)
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
            <BaseButton>간단조회</BaseButton>
          </div>
        </div>
        <div className={styles.search_controller_container}>
          <div className={styles.search_controller}>
            <div className={styles.search_list}>
              <table className={styles.search_table}>
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
    </div>
  );
};

export default SingleRegister;