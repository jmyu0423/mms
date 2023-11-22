import {
    Modal,
    Fade,
} from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';

const PreviewModal = ({ openPreview, closePreviewModal, singleCurrRowData }) => {
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (openPreview) {
            setPreview(singleCurrRowData);
        }
    }, [openPreview]);

    return (
        <Modal
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '600px', height: '600px', margin: 'auto'}}
            open={openPreview}
            onClose={closePreviewModal}
            closeAfterTransition
        >
            <Fade in={openPreview} timeout={100}>
                <img
                    src={preview}
                    style={{width: 'auto', maxWidth: '100%'}}
                />
            </Fade>
        </Modal>
    )
}
export default PreviewModal;