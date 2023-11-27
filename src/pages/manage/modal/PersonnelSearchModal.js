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
  import { BaseButton } from 'src/components/CustomButton';

const PersonnelSearchModal = ({open, onClose}) =>{
    const [material1, setMaterial1] = useState("") //재질
    const [rowData, setRowData] = useState(itemList);

    const setFirstValue = (cd, targetData) => {
        if(targetData === "material1"){
          setMaterial1(materialList[cd].title)
        }
    }

    return(
        <TemplateModal title="인사검색" open={open} onClose={onClose}>
            <div className="personnel-search-modal">
                <div className='personnel-search-container'>
                    <div style={{padding: '5px'}}>
                        <TextField
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <div className='searchGlass-container'>
                                        <div className='searchGlass_icon'></div>
                                    </div>
                                </InputAdornment>
                                ),
                                style: {height: '40px', fontSize: 14, backgroundColor: 'white'}
                            }}
                            placeholder="검색어를 입력하세요."
                        />
                    </div>
                </div>
                <div className='personnel-search-list'>
                    <ul className="preview-image-title">
                        <li><span>검색 결과</span></li>
                    </ul>
                    <div className='person-search-items'>
                    
                    </div>
                </div>
                <div className='preview-image-modal-button'>
                    <BaseButton sx={{width: "150px", height: "30px"}} onClick={(e)=>onClose()}>선택</BaseButton>
                </div>
            </div>
        </TemplateModal>
    )
}
export default PersonnelSearchModal;