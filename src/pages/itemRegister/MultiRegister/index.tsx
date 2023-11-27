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

  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState(null);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => {
    setActive(false);
  }
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const handleUpload = ({ target }) => {
    const file = target.files[0];
    setFileInfo(file);
  };

  const alertClose = () =>{
		setAlertOpen(false);
	}

  const FileInfo = ({ uploadedInfo }) => (
    <ul className="preview_info">
      {Object.entries(uploadedInfo).map(([key, value]) => (
        <li key={key}>
          <span className="info_key">{key}</span>
        </li>
      ))}
    </ul>
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
                      <NormalButton>파일 업로드</NormalButton>
                    </div>
                  </div>
                  <label
                    className={'multi_excel_upload' + `${isActive ? ' active' : ''}`}
                    onDragEnter={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragEnd}
                    onDrop={handleDrop}
                  >
                    <input type="file" className="file" onChange={handleUpload} />
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
                      <NormalButton>파일 업로드</NormalButton>
                    </div>
                  </div>
                  <div style={{
                    padding: '5px', 
                    width: '500px',
                    height: '150px',
                    border: '2px dashed lightgray',
                  }}>
                    파일을 이쪽으로 드래그하여 업로드 하세요.
                  </div>
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