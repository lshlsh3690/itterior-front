import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useQuery } from "@tanstack/react-query";
import { get10PopularProducts, searchProducts } from "../api/ProductApi";

// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { API_SERVER_HOST } from "../resources/BasicResources";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useRef } from "react";
import SearchBar from "../components/common/SearchBar";

const host = `${API_SERVER_HOST}/api/products`;

const MainPage = () => {
  const swiperRef = useRef();
  const [init, setInit] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["top10PopularProducts"],
    queryFn: () => get10PopularProducts(),
    staleTime: 1000 * 60 * 10, // 10분 동안 캐시된 데이터를 사용
  });

  const {
    data: searchData,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useQuery({
    queryKey: ["searchProducts", searchQuery], // 쿼리 키에 검색어를 추가하여 입력이 변경될 때마다 쿼리가 다시 실행되도록 함
    queryFn: () => searchProducts(searchQuery),
    enabled: !!searchQuery, // 검색어가 존재할 때만 쿼리 실행
  });

  const handleItemClick = (product) => {
    navigate(`/products/productions/${product.pno}`);
  };

  let filteredData = [];

  if (searchData && searchData.length > 0 && !searchIsLoading && !searchIsError) {
    filteredData = searchData.filter((product) =>
      product.pname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <>
      <BasicLayout />
      <div
        style={{
          position: "relative", // 부모 요소를 relative로 설정하여 하위 요소의 위치를 상대적으로 설정합니다.
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredData={filteredData}
        />
      </div>
      {!isError &&
        !isLoading &&
        data !== null &&
        data !== undefined &&
        data.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <IconButton
              onClick={() => {
                swiperRef.current?.slidePrev(); // swiper의 slidePrev 실행
                setNextDisabled(false); // 슬라이드 변경 시 비활성화 상태 해제
              }}
              sx={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
              className={init || prevDisabled ? "disabled" : ""} // 처음 진입이거나, 첫번째 슬라이드이면 네비게이션 비활성화
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Swiper
              onBeforeInit={(swiper) => (swiperRef.current = swiper)} // ref에 swiper 저장
              onSlideChange={() => setInit(false)} // 슬라이드 변경 시 실행
              onReachBeginning={(e) => setPrevDisabled(true)} // slide가 처음에 닿으면 실행
              onReachEnd={(e) => setNextDisabled(true)} // slide가 마지막에 닿으면 실행
              modules={[Pagination, Navigation]}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              className='mySwiper'
              style={{
                minHeight: "50px",
                width: "50%",
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "0",
                marginRight: "0",
              }}
            >
              {data.map((product) => (
                <SwiperSlide
                  key={product.pno}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "10px",
                      border: "2px solid",
                    }}
                    src={`${host}/view/${product.uploadFileNames[0]}`}
                    alt=''
                    onClick={() => handleItemClick(product)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <IconButton
              type='button'
              onClick={() => {
                swiperRef.current?.slideNext(); // swiper의 slideNext 실행
                setPrevDisabled(false); // 슬라이드 변경 시 비활성화 상태 해제
              }}
              className={nextDisabled ? "disabled" : ""} // 마지막 슬라이드이면 네비게이션 비활성화
              sx={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        )}
    </>
  );
};

export default MainPage;
