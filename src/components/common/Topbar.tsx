import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import MainToolbar from "./MainToolbar";

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
        // flexDirection: 'column-reverse',
        // justifyContent: 'center'
      }}
    >
      <MainToolbar />
    </AppBar>
  );
};

export default Topbar;