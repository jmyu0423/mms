import { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Box, TextField, styled, Button, DialogContent, Grid, Typography, formControlClasses } from "@mui/material";
import RegistModal from 'src/components/modal/RegistModal';
import { ItemGroup, PopupFormControlLabel } from 'src/components/modal/ItemGroup';
import StorageCombo from 'src/components/combobox/StorageCombo';
import CountryCombo from 'src/components/combobox/CountryCombo';
import { indigo } from '@mui/material/colors';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FileDownloadButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    width: 90,
    height: 37,
    fontSize: 12,
    '&:hover': {
        backgroundColor: indigo[600],
    },
}));

const CustomDatePicker = styled(DatePicker)`
    width: 200px;
    height: 35px;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid darkgray;
    font-size: 15px;
`;

const ManagementUpdateModal = ({ openUpdate, closeUpdateModal, setSingleCurrRowData, singleCurrRowData, updateRow }) => {
    //파일 기본적인 정보
    const fileObj = {
        fileName: '파일명',
        fileInfo: ''
    };
    const fileListRef = useRef([fileObj]);
    const WIDTH_SIZE = '600px';

    //컬럼의 상태관리
    const [title, setTitle] = useState("") //제목
    const [itemNm, setItemNm] = useState(""); //명칭
    const [storage, setStorage] = useState(""); //보관장소
    const [texture, setTexture] = useState(""); //재질
    const [count, setCount] = useState(1); //건
    const [piece, setPiece] = useState(1); //점
    const [comment, setComment] = useState("") //제작시대/용도기능
    const [sizeA, setSizeA] = useState(""); //크기A
    const [sizeB, setSizeB] = useState(""); //크기B
    const [sizeC, setSizeC] = useState(""); //크기C
    const [getReason, setGetReason] = useState(""); //입수연유
    const [presdate, setPresdate] = useState(new Date()); //수여(증정)날짜
    const [presplace, setPresplace] = useState("") //수여(증정)장소
    const [eventname, setEventname] = useState("") //행사명
    const [conferrer, setConferrer] = useState("") //수여자
    const [country, setCountry] = useState("") //국가
    const [giver, setGiver] = useState(""); //증정자이름/직책
    const [characteristic, setCharacteristic] = useState(""); //특징
    const [fileList, setFileList] = useState({}); // 파일
    const [image, setImage] = useState("");

    //컬럼의 에러관리
    const [paramError, setParamError] = useState({
        title: '',
        itemNm: '',
        storage: '',
        texture: '',
        count: '',
        piece: '',
        comment: '',
        sizeA: '',
        sizeB: '',
        sizeC: '',
        getReason: '',
        presdate: '',
        presplace: '',
        eventname: '',
        conferrer: '',
        country: '',
        giver: '',
        characteristic: '',
    })

    useEffect(() => {
        if (openUpdate) {
            setTitle(singleCurrRowData.title)
            setItemNm(singleCurrRowData.itemNm);
            setStorage(singleCurrRowData.storage);
            setTexture(singleCurrRowData.texture);
            setCount(singleCurrRowData.count);
            setPiece(singleCurrRowData.piece);
            setComment(singleCurrRowData.comment);
            setSizeA(singleCurrRowData.sizeA);
            setSizeB(singleCurrRowData.sizeB);
            setSizeC(singleCurrRowData.sizeC);
            setGetReason(singleCurrRowData.getReason);
            setPresdate(singleCurrRowData.presdate);
            setPresplace(singleCurrRowData.presplace);
            setEventname(singleCurrRowData.eventname);
            setConferrer(singleCurrRowData.conferrer);
            setCountry(singleCurrRowData.country);
            setGiver(singleCurrRowData.giver);
            setCharacteristic(singleCurrRowData.characteristic);
            setFileList(singleCurrRowData.fileList && Object.keys(singleCurrRowData.fileList).length === 0 ? fileListRef.current[0] : singleCurrRowData.fileList);
            setImage(singleCurrRowData.image);
            resetErrorParams();
        }
    }, [openUpdate, singleCurrRowData])

    //에러파라미터 리셋
    const resetErrorParams = () => {
        setParamError({
            ...paramError,
            title: '',
            itemNm: '',
            storage: '',
            texture: '',
            count: '',
            piece: '',
            comment: '',
            sizeA: '',
            sizeB: '',
            sizeC: '',
            getReason: '',
            presdate: '',
            presplace: '',
            eventname: '',
            conferrer: '',
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
            title: title,
            itemNm: itemNm,
            storage: storage,
            texture: texture,
            count: count,
            piece: piece,
            comment: comment,
            sizeA: sizeA,
            sizeB: sizeB,
            sizeC: sizeC,
            getReason: getReason,
            presdate: presdate,
            presplace: presplace,
            eventname: eventname,
            conferrer: conferrer,
            country: country,
            giver: giver,
            characteristic: characteristic,
            fileList: fileList,
            image: image
        };

        setSingleCurrRowData(tempList);
        updateRow(tempList)

        closeUpdateModal();
    }

    return (
        <RegistModal title="물품수정" open={openUpdate} onClose={closeUpdateModal} onOk={updateItem} >
            <DialogContent dividers sx={{ flexGrow: 1, maxWidth: "1200px" }}>
                <Grid container spacing={2}>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={title} inputProps={{ maxLength: 20 }} onChange={(e) => setTitle(e.target.value)} error={paramError.title === '' ? false : true} helperText={paramError.title} />}
                            label="제목"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={itemNm} inputProps={{ maxLength: 20 }} onChange={(e) => setItemNm(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="명칭"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<StorageCombo fullWidth size="small" type="none" value={storage} codeChange={(e) => setStorage(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="보관장소"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={texture} inputProps={{ maxLength: 20 }} onChange={(e) => setTexture(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="재질"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={count} inputProps={{ maxLength: 20 }} onChange={(e) => setCount(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="건"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={piece} inputProps={{ maxLength: 20 }} onChange={(e) => setPiece(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="점"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={sizeA} inputProps={{ maxLength: 20 }} onChange={(e) => setSizeA(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="가로(지름)mm"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={sizeB} inputProps={{ maxLength: 20 }} onChange={(e) => setSizeB(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="세로mm"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={sizeC} inputProps={{ maxLength: 20 }} onChange={(e) => setSizeC(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="높이(두께)mm"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<CustomDatePicker dateFormat="yyyy/MM/dd" selected={presdate} onChange={(date) => setPresdate(date)} />}
                            label="수여(증정)날짜"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={presplace} inputProps={{ maxLength: 20 }} onChange={(e) => setPresplace(e.target.value)} error={paramError.presplace === '' ? false : true} helperText={paramError.presplace} />}
                            label="수여(증정)장소"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={eventname} inputProps={{ maxLength: 20 }} onChange={(e) => setEventname(e.target.value)} error={paramError.eventname === '' ? false : true} helperText={paramError.eventname} />}
                            label="행사명"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={conferrer} inputProps={{ maxLength: 20 }} onChange={(e) => setConferrer(e.target.value)} error={paramError.conferrer === '' ? false : true} helperText={paramError.conferrer} />}
                            label="수여자"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={comment} inputProps={{ maxLength: 20 }} onChange={(e) => setComment(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="제작시대/용도기능"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={getReason} inputProps={{ maxLength: 20 }} onChange={(e) => setGetReason(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="입수연유"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<CountryCombo fullWidth size="small" type="none" value={country} codeChange={(e) => setCountry(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="증정자국적(코드)"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={giver} inputProps={{ maxLength: 20 }} onChange={(e) => setGiver(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="증정자이름/직책"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'right'}>
                        <PopupFormControlLabel
                            control={<TextField fullWidth size="small" value={characteristic} inputProps={{ maxLength: 20 }} onChange={(e) => setCharacteristic(e.target.value)} error={paramError.itemNm === '' ? false : true} helperText={paramError.itemNm} />}
                            label="특징"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item={true} xs={8} display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={"80px"}>
                        <Box display={"flex"} alignItems={"flex-end"}>
                            <Box
                                style={{ width: WIDTH_SIZE, marginRight: "4px" }}
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
                            {image ?
                                <FileDownloadButton
                                    style={{ padding: 0, border: "1px solid", fontWeight: "bold" }}
                                >
                                    <a
                                        href={image}
                                        download={fileList.fileName}
                                        style={{ color: "white", textDecoration: "none" }}
                                    >
                                        파일다운로드
                                    </a>
                                </FileDownloadButton>
                                :
                                null
                            }
                        </Box>
                    </Grid>
                    <Grid item={true} xs={4} display={'flex'} justifyContent={'center'} marginTop={"80px"}>
                        <img
                            width="80%"
                            src={image}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </RegistModal>
    )
}
export default ManagementUpdateModal;