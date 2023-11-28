import styles from "../register.module.css";
import "../registerGlobal.css";
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';
import { styled } from '@mui/material/styles';
import AgGrid from "src/components/AgGrid";
import ManagementRegistModal from "src/pages/manage/modal/ManagementRegistModal"
import ManagementUpdateModal from "src/pages/manage/modal/ManagementUpdateModal"
import ImagePreviewModal from "src/pages/manage/modal/ImagePreviewModal";
import { NormalButton, BaseButton, AddButton, HelpButton } from 'src/components/CustomButton';
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

const MultiRegister = ({ }) => {
  const [rowData, setRowData] = useState(itemList); // Set rowData to Array of Objects, one Object per Row

  const [alertOpen, setAlertOpen] = useState(false);
	const [content, setContent] = useState("");

  const [isActive, setActive] = useState(false); //엑셀양식 업로드 여부
  const [uploadedInfo, setUploadedInfo] = useState(null); //엑셀양식 업로드 정보

  const [isActiveImg, setActiveImg] = useState(false); //사진 대량 업로드 여부
  const [uploadedImgInfo, setUploadedImgInfo] = useState(null); //사진 대량 업로드 정보

  const excelUploadRef = useRef(null);
  const imgUploadRef = useRef(null);

  useEffect(()=>{
  },[uploadedInfo, isActive])


  // ----------------------------------------------------------------------------------------
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
  };

  const handleUpload = ({ target }) => {
    let file = {};
    if(target.files.length > 0){
      file = target.files[0];
      setFileInfo(file);
    }
  };

  // ----------------------------------------------------------------------------------------
  
  // ----------------------------------------------------------------------------------------
  const ImghandleDragStart = () => setActiveImg(true);
  const ImghandleDragEnd = () => setActiveImg(false);
  const ImghandleDragOver = (event) => event.preventDefault();
  const ImghandleDrop = (event) => {
    event.preventDefault();
    setActiveImg(false);

    const file = event.dataTransfer.files;
    setImgFileInfo(file);
  };

  const setImgFileInfo = (files) => {
    let tempFileList = [];
    let byteSize = '';
    for(let i=0; i<files.length; i++){
      byteSize = (files[i].size / (1024 * 1024)).toFixed(2) + 'mb';

      tempFileList.push({name: files[i].name, size: byteSize, type: files[i].type})
    }
    setUploadedImgInfo(tempFileList); // name, size, type 정보를 uploadedInfo에 저장
  };

  const ImghandleUpload = ({ target }) => {
    let files = [];
    if(target.files.length > 0){
      files = target.files;
      setImgFileInfo(files);
    }
  };
  // ----------------------------------------------------------------------------------------

  const alertClose = () =>{
		setAlertOpen(false);
	}

  const FileInfo = ({ uploadedInfo }) => (
    <ul className="multi_excel_upload_info">
      {Object.entries(uploadedInfo).map(([key, value]) => {
        return(
          <li className='info_items' key={key}>
            <span className="info_key">{key}</span>
            <span className="info_value">{value as string}</span>
          </li>
        )
      })}
    </ul>
  );

  const ImgFileInfo = ({ uploadedInfo }) => (
    <div style={{height: '100%'}}>
      <ul className="multi_img_upload_info">
        {uploadedInfo.length > 0 && uploadedInfo.map((data, index)=>{
          return(
            <div key={index} style={{display: 'flex'}}>
              <div style={{marginRight: '5px'}}>{index + 1 + "."}</div>
              <div className='info_container'>
              {Object.entries(data).map(([key, value])=>{
                return(
                  <li className='info_items' key={key}>
                    <span className="info_key">{key as string}</span>
                    <span className="info_value">{value as string}</span>
                  </li>
                )
              })}
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  );

  return (
    <div className={styles.search_main}>
      <div className={styles.page_state} style={{ marginBottom: '5px' }}>
        <div>
          {"박물등록 > 대량등록"}
        </div>
        <div>
          <HelpButton title={'대량 업로드 방법'}/>
        </div>
      </div>
      <div className={styles.register_container}>
        <div className={styles.step_table_container}>
          <table className={styles.step_table}>
            <tbody>
              <tr>
                <td colSpan={2} style={{width: '5.2%', height: '85px', textAlign: 'center'}}>
                  <div style={{
                    borderRadius: '50%', 
                    backgroundColor: '#1976d2', 
                    width: '100%', 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    01
                  </div>
                </td>
                <td style={{padding: '5px'}}>
                  <div style={{padding: '5px', fontWeight: 'bold'}}>업로드 엑셀양식 다운로드</div>
                  <div style={{padding: '5px'}}>
                    <BaseButton>양식 다운로드</BaseButton>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{height: '80px', borderRight: '2px dashed lightgray'}}>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{width: '5.2%', height: '85px', textAlign: 'center', verticalAlign: 'top'}}>
                  <div style={{
                    borderRadius: '50%', 
                    backgroundColor: '#1976d2', 
                    width: '80px', 
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    02
                  </div>
                </td>
                <td rowSpan={2} style={{padding: '5px', verticalAlign: 'top'}}>
                  <div style={{display: 'flex'}}>
                    <div style={{
                      padding: '5px', 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      엑셀양식 업로드하기
                    </div>
                    <div style={{padding: '5px'}}>
                      <NormalButton onClick={()=>excelUploadRef.current.click()}>파일 업로드</NormalButton>
                    </div>
                  </div>
                  <label
                    className={'multi_excel_upload' + `${isActive ? ' active' : ''}`}
                    onDragEnter={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragEnd}
                    onDrop={handleDrop}
                  >
                    <input type="file" className="file" ref={excelUploadRef} onChange={handleUpload} />
                    {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
                    {!uploadedInfo && (
                      <>
                        <p className="multi_excel_upload_msg">파일을 이쪽으로 드래그하여 업로드 하세요.</p>
                      </>
                    )}
                  </label>
                </td>
              </tr>
              <tr>
                <td style={{height: '180px', borderRight: '2px dashed lightgray'}}>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{width: '5.2%', height: '85px', textAlign: 'center', verticalAlign: 'top'}}>
                  <div style={{
                    borderRadius: '50%', 
                    backgroundColor: '#1976d2', 
                    width: '80px', 
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    03
                  </div>
                </td>
                <td rowSpan={2} style={{padding: '5px', verticalAlign: 'top'}}>
                  <div style={{display: 'flex'}}>
                    <div style={{
                      padding: '5px', 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      사진 대량 업로드하기
                    </div>
                    <div style={{padding: '5px'}}>
                      <NormalButton onClick={()=>imgUploadRef.current.click()}>파일 업로드</NormalButton>
                    </div>
                  </div>
                  <label
                    className={'multi_img_upload' + `${isActiveImg ? ' active' : ''}`}
                    onDragEnter={ImghandleDragStart}
                    onDragOver={ImghandleDragOver}
                    onDragLeave={ImghandleDragEnd}
                    onDrop={ImghandleDrop}
                  >
                    <input type="file" className="file" style={{display: 'none'}} ref={imgUploadRef} multiple onChange={ImghandleUpload} />
                    {uploadedImgInfo && <ImgFileInfo uploadedInfo={uploadedImgInfo} />}
                    {!uploadedImgInfo && (
                      <>
                        <p className="multi_excel_upload_msg">파일을 이쪽으로 드래그하여 업로드 하세요.</p>
                      </>
                    )}
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 알림창 */}
      <AlertModal
				open={alertOpen}
				onClose={alertClose}
				content={content}
			/>
    </div>
  );
};

export default MultiRegister;