import { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, TextField, styled, Button, DialogContent, Grid, Typography, formControlClasses } from "@mui/material";
import RegistModal from 'src/components/modal/RegistModal';
import { ItemGroup, PopupFormControlLabel } from 'src/components/modal/ItemGroup';
import StorageCombo from 'src/components/combobox/StorageCombo';
import CountryCombo from 'src/components/combobox/CountryCombo';

const ManagementUpdateModal = ({ openUpdate, closeUpdateModal, setSingleCurrRowData, singleCurrRowData, updateRow }) => {
    //파일 기본적인 정보
    const fileObj = {
        fileName: '파일명',
        fileInfo: ''
    };
    const fileListRef = useRef([fileObj]);
    const WIDTH_SIZE = '500px';

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
    const [fileList, setFileList] = useState({}); // 파일
    const [image, setImage] = useState("");

    //컬럼의 에러관리
    const [paramError, setParamError] = useState({
        itemNm: '',
        number: '',
        storage: '',
        texture: '',
        count: 1,
        piece: 1,
        comment: '',
        size: '',
        getReason: '',
        country: '',
        giver: '',
        characteristic: ''
    })

    useEffect(() => {
        if (openUpdate) {
            console.log(singleCurrRowData)
            setItemNm(singleCurrRowData.itemNm);
            setNumber(singleCurrRowData.number);
            setStorage(singleCurrRowData.storage);
            setTexture(singleCurrRowData.texture);
            setCount(singleCurrRowData.count);
            setPiece(singleCurrRowData.piece);
            setComment(singleCurrRowData.comment);
            setSize(singleCurrRowData.size);
            setGetReason(singleCurrRowData.getReason);
            setCountry(singleCurrRowData.country);
            setGiver(singleCurrRowData.giver);
            setCharacteristic(singleCurrRowData.characteristic);
            setFileList(singleCurrRowData.fileList === {} ? fileListRef.current[0] : singleCurrRowData.fileList);
            setImage(singleCurrRowData.image);
            resetErrorParams();
        }
    }, [openUpdate, singleCurrRowData])

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

    //파일업로드
    const uploadFile = (e) => {
        let data = { ...fileList };
        data.fileName = e.target.files[0].name;
        data.fileInfo = e.target.files[0];
        setFileList(data);

        //이미지 생성
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImage(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
            e.target.value = ''; //이벤트 값 초기화
        });
    };

    //파일제거
    const deleteFile = (e) => {
        setFileList(fileListRef.current[0]);
        setImage(""); //이미지 초기화
    };

    //물품수정
    const updateItem = () => {
        let tempList = {
            ...singleCurrRowData,
            itemNm: itemNm,
            number: number,
            storage: storage,
            texture: texture,
            count: count,
            piece: piece,
            comment: comment,
            size: size,
            getReason: getReason,
            country: country,
            giver: giver,
            characteristic: characteristic,
            fileList: fileList,
            image: image
        };
        console.log(tempList)

        setSingleCurrRowData(tempList);
        updateRow(tempList)

        closeUpdateModal();
    }

    return (
        <RegistModal title="물품등록" open={openUpdate} onClose={closeUpdateModal} onOk={updateItem} >
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
                    <Grid xs={6} display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={"50px"}>
                        <Box
                            style={{ width: WIDTH_SIZE }}
                            display={'flex'}
                            mt={1}
                            sx={{
                                background: '#F8F8F8',
                                padding: '5px 20px',
                                borderRadius: '6px',
                                border: '1px solid #C7C7C7',
                                boxSizing: 'border-box',
                                width: '100%',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography children={fileList.fileName} flexGrow={1} fontWeight={'bold'} />
                            <Box>
                                <Typography
                                    component="label"
                                    onChange={uploadFile}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    style={{ color: 'black', fontWeight: 'bold', fontSize: "14px" }}
                                >
                                    파일 업로드
                                    <input hidden accept="image/*" type="file" />
                                </Typography>
                            </Box>
                            &nbsp;
                            <Box
                                sx={{
                                    cursor: 'pointer',
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}
                            >
                                <Typography
                                    onClick={(e) => deleteFile(e)}
                                    children="삭제"
                                    color="red"
                                    fontWeight={'bold'}
                                    fontSize={"14px"}

                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={6} display={'flex'} justifyContent={'center'} marginTop={"50px"}>
                        <img
                            width="50%"
                            src={image}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </RegistModal>
    )
}
export default ManagementUpdateModal;