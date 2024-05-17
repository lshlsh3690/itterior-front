import React from "react";
import BasicMenu from "./BasicMenu";
import { Box, Card, CardMedia } from "@mui/material";
import image from "../resources/img/wood.png";
import { Link } from "react-router-dom";

const BasicLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          component={Link}
          to='/'
          sx={{ maxHeight: "70px", border: "2px solid", borderRadius: "10px" }}
        >
          <CardMedia
            component='img'
            src={image}
            title='ㅠㅠ'
            sx={{ maxWidth: "150px" }}
          />
        </Card>
        <Box sx={{ flexDirection: "column", marginLeft: "2em" }}>
          <BasicMenu></BasicMenu>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "1rem",
          justifyContent: "center",
          width: "calc(75vw + 150px + 2em)",
        }}
      >
        <div>{children}</div>
      </Box>
    </div>
  );
};

export default BasicLayout;
