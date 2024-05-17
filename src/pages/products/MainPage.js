import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import BasicLayout from "../../layouts/BasicLayout";

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
