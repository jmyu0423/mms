import { Avatar, Drawer, List, Stack, Toolbar, Button, IconButton } from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { useNavigate } from "react-router-dom";
import MuseumIcon from '@mui/icons-material/Museum';

const Sidebar = () => {
  const navigate = useNavigate();

  //홈버튼
  const directHome = () => {
    navigate("/");
    window.location.reload(); //임시 강제 새로고침
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width, //사이드 바 넓이
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "10px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <IconButton onClick={(e) => directHome()}>
              <MuseumIcon sx={{ fontSize: 70, color: "antiquewhite" }} />
              {/* <Avatar src={assets.images.logo} /> */}
            </IconButton>
          </Stack>
          {/* <Button 
            sx={{
            }}
            variant="outlined" 
            startIcon={<KeyboardDoubleArrowLeftOutlinedIcon />}>
          </Button> */}
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;