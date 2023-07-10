import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  ({ theme }) => `
    margin-top: ${sizeConfigs.topbar.height};
    flex: 1 1 auto;
    overflow: auto;
`
);

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
        <Sidebar />
      </Box>
      <MainContent>
        <Outlet />
      </MainContent>
    </Box>
  );
};

export default MainLayout;