import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, List, ListItem, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../resources/BasicResources";

const host = `${API_SERVER_HOST}/api/products`;

const handleItemClick = (product) => {
  Navigate(`/products/productions/${product.pno}`);
};

const SearchBar = ({ setSearchQuery, filteredData }) => (
  <div>
    <form style={{ display: "flex", flexWrap: "nowrap" }}>
      <TextField
        id='search-bar'
        className='text'
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label='Enter Product name'
        variant='outlined'
        placeholder='Search...'
        size='small'
        sx={{ width: "100%" }}
      />
      <IconButton type='submit' aria-label='search'>
        <SearchIcon style={{ fill: "#82b1ff", width: "24px" }} />
      </IconButton>
    </form>

    {filteredData && filteredData.length > 0 && (
      <List
        sx={{
          width: "50%",
          zIndex: 1001, // 다른 요소 위에 렌더링될 수 있도록 zIndex를 설정합니다.
          position: "absolute",
          marginTop: "2rem",
          bgcolor: "white",
          maxHeight: "450px", // 최대 높이 지정
          overflowY: "auto", // 세로 스크롤 활성화
        }}
      >
        {filteredData.map((product) => (
          <ListItem
            className='text'
            sx={{
              border: "2px solid #82b1ff",
              borderRadius: "10px",
            }}
            key={product.pno}
            variant='outlined'
            size='small'
            onClick={() => handleItemClick(product)}
          >
            <img
              style={{ width: "3em", height: "3em" }}
              src={`${host}/view/${product.uploadFileNames[0]}`}
              alt='fileImage'
            />
            <div style={{ marginLeft: "1em" }}>{product.pname}</div>
            <div style={{ marginLeft: "auto" }}>￦{product.price}</div>
          </ListItem>
        ))}
      </List>
    )}
  </div>
);

export default SearchBar;
