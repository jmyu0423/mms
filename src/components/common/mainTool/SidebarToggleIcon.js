import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import assets from '../../../assets';

const LogoutBox = styled(Box)`
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SidebarToggleIcon = ({ sidebarToggleButton }) => {

    return (
        <LogoutBox
            onClick={sidebarToggleButton}
            title="슬라이더"
        >
            <img
                src={assets.images.slider}
                width={24}
                height={24}
                alt="logo"
                style={{ marginRight: "5px" }}
            />
        </LogoutBox>
    )
}
export default SidebarToggleIcon;