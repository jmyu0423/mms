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

const SimpleSearchModal = ({open, onClose}) =>{
    const [material1, setMaterial1] = useState("") //재질
    const [rowData, setRowData] = useState(itemList);

    const setFirstValue = (cd, targetData) => {
        if(targetData === "material1"){
          setMaterial1(materialList[cd].title)
        }
    }

    return(
        <TemplateModal title="간단 조회" open={open} onClose={onClose}>
            <div className="preview-image-modal">
                <div className='simple-search-info'>
                    <ul className="preview-image-title">
                        <li><span>키워드 검색</span></li>
                    </ul>
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

                    <ul className="preview-image-title">
                        <li><span>재질 코드 검색</span></li>
                    </ul>
                    <div style={{display: 'flex', padding: '5px'}}>
                        <ComboControlLabel
                            control={<CustomCombo height="40px" size="small" type="none" setData={setFirstValue} dataList={materialList} value={material1} targetData={"material1"} codeChange={(e) => setMaterial1(e.target.value)} />}
                            label=""
                            labelPlacement="start"
                        />
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
                <div className='simple-search-list'>
                    <ul className="preview-image-title">
                        <li><span>검색 결과</span></li>
                    </ul>
                    <div className='simple-search-items'>
                    {rowData.length > 0 && rowData.map((data, index)=>{
                        return(
                            <div className='simple-search-itemContainer' key={index}>
                                <div className='simple-search-imageContainer'>
                                    <img
                                        style={{width: '100%', height: '100%'}}
                                        loading="lazy"
                                        src={data.imageList.length > 0 ? data.imageList[0].imageSrc : '/img/empty-image.png'}
                                    />
                                </div>
                                <div className='simple-search-itemTitle'>
                                    {data.itemNm}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className='preview-image-modal-button'>
                    <BaseButton sx={{width: "150px", height: "30px"}} onClick={(e)=>onClose()}>확인</BaseButton>
                </div>
            </div>
        </TemplateModal>
    )
}
export default SimpleSearchModal;