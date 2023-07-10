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
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        height: sizeConfigs.topbar.height,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.sidebar.bg,
        color: colorConfigs.sidebar.color,
      }}
    >
      <Box sx={{ height: '100%' }} display="flex" alignItems="center" justifyContent="flex-end" fontSize="14px">
        <MainToolbar />
        <MainToolUser />
        <MainToolLogout />
      </Box>
    </AppBar>
  );
};

export default Topbar;