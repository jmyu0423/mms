import {
    GridList,
    GridListTile,
    styled,
    Modal,
    Backdrop,
    Fade
} from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';


const ImagePreviewModal = ({ openPreview, closePreviewModal, singleCurrRowData }) => {
    const [preveiw, setPreveiw] = useState("");

    useEffect(() => {
        if (openPreview) {
            setPreveiw(singleCurrRowData.image)
        }
    }, [openPreview])

    return (
        <Modal
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={openPreview}
            onClose={closePreviewModal}
            closeAfterTransition

        >
            <Fade in={openPreview} timeout={500}>
                <img
                    src={preveiw}
                    style={{ width: "400px" }}
                />
            </Fade>
        </Modal>
    )
}
export default ImagePreviewModal;