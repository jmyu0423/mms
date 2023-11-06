import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import MainToolbar from "./mainTool/MainToolbar";
import MainToolUser from "./mainTool/MainToolUser";
import MainToolLogout from "./mainTool/MainToolLogout";
import SidebarToggleIcon from "./mainTool/SidebarToggleIcon";

const Topbar = ({ sidebarToggleButton, headerWidth }) => {
  return (
    <AppBar
      position="fixed"
      style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
      sx={{
        width: headerWidth,
        // width: '100%',
        height: sizeConfigs.topbar.height,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        userSelect: 'none'
      }}
    >
      <SidebarToggleIcon sidebarToggleButton={sidebarToggleButton} />
      <Box sx={{ height: '100%' }} display="flex" justifyContent="flex-end" alignItems="center" fontSize="13px">
        <MainToolbar />
        <MainToolUser />
        <MainToolLogout />
      </Box>
    </AppBar>
  );
};

export default Topbar;