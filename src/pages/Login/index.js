import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthenticationContext';
import axios from 'axios';

const Login = () => {
    const defaultTheme = createTheme();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const [errorParams, setErrorParams] = useState("");

    const handleSubmit = async () => {
        // 아이디 패스워드 체크
        if (!userId) {
            setErrorParams("아이디를 입력해 주세요")
            return false;
        } else if (!password) {
            setErrorParams("비밀번호를 입력해 주세요")
            return false;
        }

        //raw data
        const object = {
            "action": "login",
            "username": userId,
            "password": password
        }

        const config = {
            responseType: "text",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        };

        let tempResult = {
            realname: userId,
            result: "ok",
            sesskey: ""
        }
        auth.login(tempResult);

        // "http://smus.scjmatthias.net/api/do.php"
        // await axios
        //     .post("/api/do.php", object, config)
        //     .then(function (response) {
        //         if (response.data.result === "ok") {
        //             auth.login(response.data);
        //             console.log("성공");
        //         } else {
        //             setErrorParams("아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.")
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log("실패", error);
        //     })

        // if (userId === "test" && password === "1234") {
        //     auth.login(userId);
        // } else {
        //     setErrorParams("아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.")
        // }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', height: '1050px', userSelect: 'none' }}>
                <Box sx={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontSize: '30px'
                }}>
                    HANS LOGO
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '50%',
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar> */}
                    <Typography component="h1" variant="h5">
                        HAMS
                    </Typography>
                    <Typography component="h1" variant="h6">
                        하늘문화세계평화광복 박물관리 시스템
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="아이디"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" style={{ padding: "1px" }} />}
                            label={<Box component="div" fontSize={14} color="#6b6767">
                                로그인 상태 유지
                            </Box>}
                            style={{ marginLeft: "0px" }}
                        />
                        {errorParams ?
                            <Box style={{ marginTop: "10px", fontSize: 13, color: "red", whiteSpace: "pre-line" }}>{errorParams}</Box>
                            :
                            null
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    비밀번호 초기화
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

        </ThemeProvider>
    )
}

export default Login
