import { Box, Button, List, ListItem, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import ItemSnackBar from "../../layouts/ItemSnackBar";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../api/ProductApi";
import SearchBar from "../common/SearchBar";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../resources/BasicResources";

const ProductSortComponent = ({
  dateSortOrder,
  priceSortOrder,
  sortBy,
  setSortBy,
  setDateSortOrder,
  setPriceSortOrder,
  open,
  setOpen,
  pageSize,
  setPageSize,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const host = `${API_SERVER_HOST}/api/products`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl();
  };

  const {
    data: searchData,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useQuery({
    queryKey: ["searchProducts", searchQuery], // 쿼리 키에 검색어를 추가하여 입력이 변경될 때마다 쿼리가 다시 실행되도록 함
    queryFn: () => searchProducts(searchQuery),
    enabled: !!searchQuery, // 검색어가 존재할 때만 쿼리 실행
  });

  // const {
  //   data: searchData,
  //   isFetching: searchIsFetching,
  //   isError: searchIsError,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteScroll(searchQuery);

  let filteredData = [];
  if (searchData === undefined || searchIsLoading || searchIsError) {
  } else {
    filteredData = searchData.filter((product) =>
      product.pname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleItemClick = (product) => {
    navigate(`/products/productions/${product.pno}`);
  };

  // const handleSnackBarClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "auto",
        marginBottom: "auto",
        maxHeight: "5rem",
      }}
    >
      <ItemSnackBar
        sortBy={sortBy}
        nextSortBy={"date"}
        dateSortOrder={dateSortOrder}
        priceSortOrder={priceSortOrder}
        setSortBy={setSortBy}
        setDateSortOrder={setDateSortOrder}
        setPriceSortOrder={setPriceSortOrder}
        message={dateSortOrder === "asc" ? "날짜 내림차순" : "날짜 오름차순"}
        open={open}
        setOpen={setOpen}
      />
      <ItemSnackBar
        sortBy={sortBy}
        nextSortBy={"price"}
        dateSortOrder={dateSortOrder}
        priceSortOrder={priceSortOrder}
        setSortBy={setSortBy}
        setDateSortOrder={setDateSortOrder}
        setPriceSortOrder={setPriceSortOrder}
        message={priceSortOrder === "asc" ? "가격 내림차순" : "가격 오름차순"}
        open={open}
        setOpen={setOpen}
      />

      {/* 검색 기능*/}
      <div
        style={{
          position: "relative", // 부모 요소를 relative로 설정하여 하위 요소의 위치를 상대적으로 설정합니다.
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {filteredData.length > 0 && (
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

      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        variant='contained'
        sx={{
          marginLeft: "auto",
          whiteSpace: "nowrap", // 텍스트가 화면을 넘어가지 않고 줄 바꿈되지 않도록 설정
        }}
      >
        {pageSize}개씩 보기
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setPageSize(10);
          }}
        >
          10개씩 보기
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setPageSize(20);
          }}
        >
          20개씩 보기
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setPageSize(30);
          }}
        >
          30개씩 보기
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProductSortComponent;
