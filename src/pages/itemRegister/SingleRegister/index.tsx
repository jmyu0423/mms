import styles from "../register.module.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import ManagementRegistModal from "src/pages/manage/modal/ManagementRegistModal"
import ManagementUpdateModal from "src/pages/manage/modal/ManagementUpdateModal"
import ImagePreviewModal from "src/pages/manage/modal/ImagePreviewModal";
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

  //등록모달 컨트롤 state
  const [openRegist, setOpenRegist] = useState(false);

  //수정모달 컨트롤 state
  const [openUpdate, setOpenUpdate] = useState(false);
  const [singleCurrRowData, setSingleCurrRowData] = useState({});

  //이미지 미리보기 컨트롤 state
  const [openPreview, setOpenPreview] = useState(false);

  const [today, setToday] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [startDt, setStartDt] = useState(dayjs(new Date()).subtract(1, "month"))
  const [endDt, setEndDt] = useState(dayjs(new Date()));

  const [organization1, setOrganization1] = useState(""); //기관1
  const [organization2, setOrganization2] = useState(""); //기관2
  const [mainNumber, setMainNumber] = useState(""); //주수량
  const [subNumber, setSubNumber] = useState(""); //부수량
  const [useYn, setUseYn] = useState("N");
  
  const [alertOpen, setAlertOpen] = useState(false);
	const [content, setContent] = useState("");

  const openPreviewModal = (row) => {
    setSingleCurrRowData(row);
    if(row.imageList.length > 0){
      setOpenPreview(true);
    }else{
      setContent("등록된 이미지가 없습니다.");
      setAlertOpen(true);
    }
  }

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

  const changeUseYn = (e) =>{
    setUseYn(e.target.value)
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
            <span>사진 정보</span>
          </li>
        </ul>
      </div>

      <ImagePreviewModal
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