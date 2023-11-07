import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ko } from 'date-fns/locale';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField } from "@mui/material";
import dayjs from 'dayjs';
import AlertModal from 'src/components/modal/AlertModal';
import React, { useEffect, useState } from 'react';

const WngFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	width : 'auto',
	margin : '4px 30px 4px 0px',
	flexDirection: 'column-reverse',
	alignItems: 'baseline',
	
	'& .MuiFormControlLabel-label': {
		marginBottom: '5px',
	},

	'& .MuiInputBase-input': {
		padding: '10px',
	},
	'& .MuiTextField-root': {
		width: '220px',
		background: theme.palette.background.default, //'#FcFcFc',
	},

}));

const CustomDatePicker = ({startDt, endDt, setStartDt, setEndDt}) =>{
	const [alertOpen, setAlertOpen] = useState(false);
	const [content, setContent] = useState("");
	
	const openAlert = () =>{
		setContent("종료 일자는 시작 일자 이전일 수 없습니다");
		setAlertOpen(true);
	}

	const alertClose = () =>{
		setAlertOpen(false);
	}

    return(
		<>
			<WngFormControlLabel
				control={
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
					<Box sx={{ display: 'flex' }}>
					<DatePicker
						label={'시작일'}
						value={startDt}
						format={"YYYY-MM-DD"}
						mask={'____-__-__'}
						onChange={(newValue) => {
						const setDate = dayjs(newValue);

						// 시작, 종료일 비교
						if (endDt.format('YYYY-MM-DD') < setDate.format('YYYY-MM-DD')) {
							openAlert();
							setStartDt(dayjs(new Date()));
							setEndDt(dayjs(new Date()));
						} else {
							setStartDt(setDate);
						}
						}}
						sx={{ "& .MuiInputBase-input": { height: "12px" } }}
					/>
					<Box sx={{ width: '4px' }} />
					<DatePicker
						label={'종료일'}
						value={endDt}
						format={"YYYY-MM-DD"}
						mask={'____-__-__'}
						onChange={(newValue) => {
						const setDate = dayjs(newValue);

						// 시작, 종료일 비교
						if (startDt.format('YYYY-MM-DD') > setDate.format('YYYY-MM-DD')) {
							openAlert();
							setStartDt(dayjs(new Date()));
							setEndDt(dayjs(new Date()));
						} else {
							setEndDt(setDate);
						}
						}}
						sx={{ "& .MuiInputBase-input": { height: "12px" } }}
					/>
					</Box>
				</LocalizationProvider>
				}
				labelPlacement="start"
			/>

				

			<AlertModal
				open={alertOpen}
				onClose={alertClose}
				content={content}
			/>
	  	</>
    )
}
export default CustomDatePicker;