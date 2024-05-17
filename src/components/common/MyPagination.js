import React from "react";
import Pagination from "@mui/material/Pagination";

const MyPagination = ({ serverData, page, movePage }) => {
  const handleChange = (event, value) => {
    movePage({ page: value });
  };

  return (
    <Pagination count={serverData.totalPage} page={page} onChange={handleChange} />
  );
};

export default MyPagination;
