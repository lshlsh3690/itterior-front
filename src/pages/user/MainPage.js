import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <BasicLayout>
      <Box>
        <Outlet />
      </Box>
    </BasicLayout>
  );
};

export default MainPage;
