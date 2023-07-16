import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import MainToolbar from "./mainTool/MainToolbar";
import MainToolUser from "./mainTool/MainToolUser";
import MainToolLogout from "./mainTool/MainToolLogout";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        // width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        width: '100%',
        height: sizeConfigs.topbar.height,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Box sx={{ height: '100%' }} display="flex" alignItems="center" justifyContent="flex-end" fontSize="13px">
        <MainToolbar />
        <MainToolUser />
        <MainToolLogout />
      </Box>
    </AppBar>
  );
};

export default Topbar;