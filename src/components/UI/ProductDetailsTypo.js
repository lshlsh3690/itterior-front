import { Divider, Typography } from "@mui/material";
import React from "react";

const MyDivider = ({ children }) => {
  return (
    <Divider
      sx={{
        width: "50%",
        marginTop: "1rem",
        marginBottom: "1rem",
        marginLeft: "auto",
        marginRight: "auto",
        "&::before, &::after": {
          borderColor: "#bbdefb",
          borderWidth: "5px",
        },
      }}
    >
      {children}
    </Divider>
  );
};

const ProductDetailsTypo = ({ children }) => {
  return (
    <MyDivider>
      <Typography sx={{ marginLeft: "2rem", marginRight: "2rem" }}>
        {children}
      </Typography>
    </MyDivider>
  );
};

export default ProductDetailsTypo;
