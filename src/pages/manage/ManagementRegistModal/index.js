import { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, TextField, styled, Button, DialogContent, Grid } from "@mui/material";
import RegistModal from 'src/components/modal/RegistModal';
import { ItemGroup, PopupFormControlLabel } from 'src/components/modal/ItemGroup';
import StorageCombo from 'src/components/combobox/StorageCombo';
import CountryCombo from 'src/components/combobox/CountryCombo';

const ManagementRegistModal = ({ open, closeRegistModal }) => {
    //컬럼의 상태관리
    const [itemNm, setItemNm] = useState(""); //명칭
    const [number, setNumber] = useState(""); //번호
    const [storage, setStorage] = useState(""); //보관장소
    const [texture, setTexture] = useState(""); //재질
    const [count, setCount] = useState(1); //건
    const [piece, setPiece] = useState(1); //점
    const [comment, setComment] = useState("") //제작시대/용도기능
    const [size, setSize] = useState(""); //크기
    const [getReason, setGetReason] = useState(""); //입수연유
    const [country, setCountry] = useState("") //국가
    const [giver, setGiver] = useState(""); //증정자이름/직책
    const [characteristic, setCharacteristic] = useState(""); //특징

    //컬럼의 에러관리
    const [paramError, setParamError] = useState({
        itemNm: '',
        number: '',
        storage: '',
        texture: '',
        count: '',
        piece: '',
        comment: '',
        size: '',
        getReason: '',
        country: '',
        giver: '',
        characteristic: ''
    })

    useEffect(() => {
        if (open) {
            resetData();
        }
    }, [open])

    //데이터 리셋
    const resetData = () => {
        setItemNm("");
        setNumber("");
        setStorage("");
        setTexture("");
        setCount(1);
        setPiece(1);
        setComment("");
        setSize("");
        setGetReason("");
        setCountry("");
        setGiver("");
        setCharacteristic("");
    }

    //에러파라미터 리셋
    const resetErrorParams = () => {
        setParamError({
            ...paramError,
            itemNm: '',
            number: '',
            storage: '',
            texture: '',
            count: '',
            piece: '',
            comment: '',
            size: '',
            getReason: '',
            country: '',
            giver: '',
            characteristic: ''
        })
    }

    const insertItem = () => {
    }

    return (
        <RegistModal title="물품등록" open={open} onClose={closeRegistModal} onOk={insertItem} >
            <DialogContent dividers sx={{ flexGrow: 1, maxWidth: "1200px" }}>
                <Grid container spacing={2}>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="명칭"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={number} inputProps={{ maxLength: 20 }} onChange={(e) => setNumber(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="번호"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<StorageCombo fullWidth size="small" type="none" value={storage} codeChange={(e) => setStorage(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="보관장소"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={texture} inputProps={{ maxLength: 20 }} onChange={(e) => setTexture(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="재질"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={count} inputProps={{ maxLength: 20 }} onChange={(e) => setCount(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="건"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={piece} inputProps={{ maxLength: 20 }} onChange={(e) => setPiece(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="점"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={comment} inputProps={{ maxLength: 20 }} onChange={(e) => setComment(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="제작시대/용도기능"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={size} inputProps={{ maxLength: 20 }} onChange={(e) => setSize(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="크기(cm)"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={getReason} inputProps={{ maxLength: 20 }} onChange={(e) => setGetReason(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="입수연유"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<CountryCombo fullWidth size="small" value={country} codeChange={(e) => setCountry(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="국가명"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={giver} inputProps={{ maxLength: 20 }} onChange={(e) => setGiver(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="증정자이름/직책"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={characteristic} inputProps={{ maxLength: 20 }} onChange={(e) => setCharacteristic(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
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