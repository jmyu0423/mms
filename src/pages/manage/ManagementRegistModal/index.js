import { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, TextField, styled, Button, DialogContent, Grid } from "@mui/material";
import RegistModal from 'src/components/modal/RegistModal';
import { ItemGroup, PopupFormControlLabel } from 'src/components/modal/ItemGroup';

const ManagementRegistModal = ({ open, closeRegistModal }) => {
    //컬럼의 상태관리
    const [itemNm, setItemNm] = useState("");

    //컬럼의 에러관리
    const [paramError, setParamError] = useState({
        itemNm: '',
    })

    const insertItem = () => {
    }

    return (
        <RegistModal title="물품등록" open={open} onClose={closeRegistModal} onOk={insertItem} >
            <DialogContent dividers sx={{ flexGrow: 1, maxWidth: "1500px" }}>
                <Grid container spacing={2}>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="명칭"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="번호"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="보관장소"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="재질"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="건"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="점"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="제작시대/용도기능"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="크기(cm)"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="입수연유"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="국가명"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="증정자이름/직책"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={3} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="특징"
                            labelPlacement="start"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </RegistModal>
    )
}
export default ManagementRegistModal;