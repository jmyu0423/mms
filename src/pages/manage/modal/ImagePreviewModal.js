import {
    GridList,
    GridListTile,
    styled,
    Modal,
    Backdrop,
    Fade,
    Box
} from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import './modal.css';
import TemplateModal from 'src/components/modal/TemplateModal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BaseButton, DangerButton, NormalButton} from 'src/components/CustomButton';

const SlickItems = styled(Box)`
    height: 300px;
    display: flex !important;
    flex-direction: row;
    justify-content: center;

    img {
        max-width: 100%;
        height: 100%;
    }
`;

const ThumbItems = styled(Box)`
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    border: 1px solid black;

    img {
        max-width: 100%;
        height: 100%;
    }
`;

const ImagePreviewModal = ({ openPreview, closePreviewModal, singleCurrRowData }) => {
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [previewList, setPreviewList] = useState([]);

    useEffect(() => {
        if (openPreview) {
            setPreviewList(singleCurrRowData.imageList);
        }
    }, [openPreview]);

    return (
        <TemplateModal title="이미지 더보기" open={openPreview} onClose={closePreviewModal}>
            <div className="preview-image-modal">
                <ul className="preview-image-title">
                    <li><span>소장품 번호 : {singleCurrRowData.number}</span></li>
                </ul>
                <div className="main-container">
                    <div className="slider-container">
                        <Slider
                            asNavFor={slider2.current}
                            ref={slider1}
                            arrows={false}
                        >
                        {previewList.length > 0 && previewList.map((data, index)=>{
                            return(
                                <SlickItems key={index}>
                                    <img src={data.imageSrc}/>
                                </SlickItems>
                            )
                        })}
                        </Slider>
                    </div>
                </div>
                <div className="thumb-container">
                    <div className="slider-container">
                        <Slider
                            asNavFor={slider1.current}
                            ref={slider2}
                            slidesToShow={previewList.length < 4 ? previewList.length : 3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                        >
                        {previewList.length > 0 && previewList.map((data, index)=>{
                            return(
                                <div className="thumb-item">
                                    <ThumbItems key={index}>
                                        <img src={data.imageSrc}/>
                                    </ThumbItems>
                                </div>
                            )
                        })}
                        </Slider>
                    </div>
                </div>
                <div className="preview-image-modal-button">
                    <BaseButton sx={{width: "150px", height: "30px"}} onClick={(e)=>closePreviewModal()}>확인</BaseButton>
                </div>
            </div>
        </TemplateModal>
    )
}
export default ImagePreviewModal;