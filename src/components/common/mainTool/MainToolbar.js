import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const MainToolbar = () => {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let today = "";

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;

        today = date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        console.log(today)
        setCurrentDate(today)
    }, [])

    return (
        <Box sx={{ mr: 1 }}>
            최근접속 | {currentDate}
        </Box>
    )
}
export default MainToolbar