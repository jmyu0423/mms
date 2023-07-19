import { Box, Modal, Dialog, DialogTitle, IconButton, DialogActions, styled, Button, DialogContent } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'red',
    color: '#fff',
    borderRadius: '4px',
    width: '80px'
}))

const RegistModal = ({ title, open, onClose, children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth='xl'>
            <DialogTitle sx={{
                color: '#14286b',
                fontFamily: 'Spoqa Han Sans Neo',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '20px',
                padding: '5px'
            }}>
                {title}
            </DialogTitle>
            <IconButton aria-label="close"
                onClick={onClose}
                sx={{ position: 'absolute', right: 8, top: 8, padding: '1px', color: (theme) => theme.palette.grey[500] }}>
                <GridCloseIcon />
            </IconButton>
            {children}
            <DialogActions
                sx={{
                    justifyContent: 'center',
                    background: '#EFEFEF',
                    '.MuiBox-root': {
                        margin: '0px'
                    }
                }}
            >
                <Box sx={{ flexGrow: 1, width: '100%' }}></Box>
                <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <StyledButton sx={{ background: '#898989' }} onClick={onClose}>닫기</StyledButton>
                    <Box sx={{ width: '8px' }} />
                    <StyledButton sx={{ background: '#1E4DBA' }}>등록</StyledButton>
                </Box>
                <Box sx={{ flexGrow: 1, width: '100%' }}></Box>
            </DialogActions>
        </Dialog>
    )
}
export default RegistModal;