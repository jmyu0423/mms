import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';


const MainContent = styled(Box)(
  ({ theme }) => `
    margin-top: ${sizeConfigs.topbar.height};
    flex: 1 1 auto;
    overflow: auto;
`
);

const MainLayout = () => {
  const [sliderDisplay, setSliderDisplay] = useState("block");
  const [headerWidth, setHeaderWidth] = useState(`calc(100% - ${sizeConfigs.sidebar.width})`);

  //사이드 슬라이더 토글 버튼
  const sidebarToggleButton = () => {
    if (sliderDisplay === "block") {
      setSliderDisplay("none");
      setHeaderWidth("100%");
    } else {
      setSliderDisplay("block");
      setHeaderWidth(`calc(100% - ${sizeConfigs.sidebar.width})`)
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar sidebarToggleButton={sidebarToggleButton} headerWidth={headerWidth} />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
          display: sliderDisplay
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