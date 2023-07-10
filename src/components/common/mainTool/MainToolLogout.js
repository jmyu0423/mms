import {
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import assets from '../../../assets';

const LogoutBox = styled(Box)`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #d9d9d9;
  cursor: pointer;
`;

const MainToolLogout = () => {
    const navigate = useNavigate();
    // const auth = useAuth();
    // const principal = auth.getPrincipal();

    const logout = () => {
        console.log(1234)
        // axios.get("/logoutProc").then((response) => {
        //     let axiosCommonHeaders = axios.defaults.headers.common;
        //     delete axiosCommonHeaders['Authorization'];
        //     auth.logout();
        //     navigate("/", { replace: true });
        // }).catch((e) => {
        //     console.log(e);
        // })
    }

    return (
        <LogoutBox
            onClick={logout}
            title="로그아웃"
        >
            <img
                src={assets.images.logout}
                width={24}
                height={24}
                alt="logo"
                style={{ marginRight: "5px" }}
            />
            Logout
        </LogoutBox>
    );
}
export default MainToolLogout;