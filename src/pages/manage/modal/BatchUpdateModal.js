import React, { useEffect, useRef, useState } from 'react';
import TemplateModal from 'src/components/modal/TemplateModal';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography, InputAdornment } from "@mui/material";
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
  import { BaseButton, NormalButton } from 'src/components/CustomButton';

const BatchUpdateModal = ({open, onClose}) =>{
    const [material1, setMaterial1] = useState("") //재질
    const [rowData, setRowData] = useState(itemList);
    const [startNumber, setStartNumber] = useState(""); //시작번호
    const [changeOption, setChangeOption] = useState("N") //변경 옵션

    const setFirstValue = (cd, targetData) => {
        if(targetData === "material1"){
          setMaterial1(materialList[cd].title)
        }
    }

    const changeOptionYn = (e) =>{
        setChangeOption(e.target.value)
    }

    return(
        <TemplateModal title="소지품 정보 일괄 변경" open={open} onClose={onClose}>
            <div className="preview-image-modal" style={{userSelect: 'none'}}>
                <div className='batch-container'>
                    <ul className="preview-image-title">
                        <li><span>대상 소장품 번호</span></li>
                    </ul>
                    <div className='batch-contents'>
                        <div className='batch-item'>
                            <div className='batch-title'>
                                연속 번호
                            </div>
                            <div className='batch-item'>
                                <input className='batch-item-Number' style={{width: '105px', marginLeft: '30px', marginRight: '10px'}} type="number" min={0} placeholder='시작번호 입력'/>
                                ~
                                <input className='batch-item-Number' style={{width: '105px', marginLeft: '10px', marginRight: '10px'}} type="number" min={0} placeholder='끝 번호 입력'/>
                            </div>
                            <NormalButton sx={{width: "20px", height: "21px", borderRadius: '10px', backgroundColor: 'gray'}}>추가</NormalButton>
                        </div>

                        <div className='batch-item'>
                            <div className='batch-title'>
                                개별 번호
                            </div>
                            <div className='batch-item'>
                                <input className='batch-item-Number' style={{width: '105px', marginLeft: '30px', marginRight: '10px'}} type="number" min={0} placeholder='번호 입력'/>
                            </div>
                            <NormalButton sx={{width: "20px", height: "21px", borderRadius: '10px', backgroundColor: 'gray'}}>추가</NormalButton>
                        </div>

                        <div className='batch-item' style={{marginTop: '5px'}}>
                            <NormalButton sx={{fontSize: '12px', borderRadius: '20px', padding: '15px'}}>고01-5 ~ 고01-15</NormalButton>
                        </div>
                    </div>
                    
                    <ul className="preview-image-title" style={{marginBottom: '8px'}}>
                        <li><span>변경 옵션</span></li>
                        
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: '5px'}}>
                                <label>
                                <input 
                                    style={{position: 'relative', top: '1px'}}
                                    type='radio' 
                                    name='useYn'
                                    value='N'
                                    checked={changeOption === "N" }   
                                    onChange={(e)=>changeOptionYn(e)}
                                />
                                조건변경
                                </label>
                            </div>
                            <div style={{marginRight: '5px'}}>
                                <label>
                                <input 
                                    style={{position: 'relative', top: '1px'}}
                                    type='radio' 
                                    name='useYn'
                                    value='Y'
                                    checked={changeOption === "Y" }   
                                    onChange={(e)=>changeOptionYn(e)}
                                />
                                모두변경
                                </label>
                            </div>
                        </div>
                    </ul>

                    <ul className="preview-image-title" style={{marginBottom: '8px'}}>
                        <li><span>변경 항목</span></li>
                        <div style={{display: 'flex'}}>
                            <ComboControlLabel
                                control={<CustomCombo size="small" type="none" dataList={organization1List} targetData={"organization1"} />}
                                label=""
                                labelPlacement="start"
                            />
                            <ComboControlLabel
                                control={<CustomCombo size="small" type="none" dataList={organization2List} targetData={"organization2"} />}
                                label=""
                                labelPlacement="start"
                            />
                        </div>
                    </ul>

                    <ul className="preview-image-title" style={{marginBottom: '8px'}}>
                        <li><span>변경 내용</span></li>
                        <div style={{display: 'flex'}}>
                            <ComboControlLabel
                                control={<CustomCombo size="small" type="none" dataList={organization1List} targetData={"organization1"} />}
                                label=""
                                labelPlacement="start"
                            />
                            <ComboControlLabel
                                control={<CustomCombo size="small" type="none" dataList={organization2List} targetData={"organization2"} />}
                                label=""
                                labelPlacement="start"
                            />
                        </div>
                    </ul>

                    <ul className="preview-image-title">
                        <li><span>변경 사유</span></li>
                        <textarea style={{
                            padding: '5px',
                            minWidth: '95%',
                            maxWidth: '95%',
                            minHeight: '100px',
                            maxHeight: '100px',
                            
                        }}
                        placeholder= '변경사유 입력'
                        ></textarea>
                    </ul>
                    
                </div>
                <div className='preview-image-modal-button'>
                    <NormalButton sx={{width: "50%", height: "50px"}} onClick={(e)=>onClose()}>임시저장</NormalButton>
                    <BaseButton sx={{width: "50%", height: "50px"}} onClick={(e)=>onClose()}>승인요청</BaseButton>
                </div>
            </div>
        </TemplateModal>
    )
}
export default BatchUpdateModal;