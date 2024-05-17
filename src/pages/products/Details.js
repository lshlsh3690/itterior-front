import { Button, ButtonGroup, Card, Input, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_SERVER_HOST } from "../../resources/BasicResources";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { addCartItemAsync, getCartItemAsync } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import ReviewIcon from "../../resources/img/svg/ReviewIcon";
import { useNavigate } from "react-router-dom";

const host = `${API_SERVER_HOST}/api/products`;

const Details = () => {
  const { productId } = useParams();

  const [productData, setProductData] = useState(null);
  const [count, setCount] = useState(1);
  const [inputValue, setInputValue] = useState("1"); // inputValue 상태 추가
  const [selectImg, setSelectImg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginState, isLogin } = useCustomLogin();

  const handleButtonClick = (props) => {
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue)) {
      if (props === "increase") {
        setInputValue((prev) => Number(prev) + 1);
      } else if (props === "decrease") {
        setInputValue((prev) => Math.max(Number(prev) - 1, 0));
      }
    } else {
      setInputValue(1);
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue)) {
      setInputValue(newValue);
      setCount(newValue);
    } else {
      setInputValue(0);
      setCount(0);
    }
  };

  useEffect(() => {
    // 여기서 데이터를 요청하고 해당 아이템의 정보를 가져오는 비동기 작업을 수행합니다.
    // 이 예시에서는 간단히 fetchItemData 함수를 호출한다고 가정합니다.
    const fetchItemData = async () => {
      try {
        const response = await fetch(`${host}/productions/${productId}`);
        const data = await response.json();
        setProductData(data);
        // uploadFileNames에 액세스하기 전에 productData가 null이 아닌지 확인
        if (data && data.uploadFileNames && data.uploadFileNames.length > 0) {
          setSelectImg(data.uploadFileNames[0]);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [productId]); // itemId가 변경될 때마다 useEffect가 다시 실행됩니다.

  const handleAddtoCart = () => {
    if (!isLogin) {
      navigate("/login");
    }
    const cartItem = {
      username: loginState.username,
      pno: productId,
      qty: count,
    };

    setCount(0);
    dispatch(addCartItemAsync(cartItem));
    dispatch(getCartItemAsync());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {productData && (
        <div style={{ display: "flex", gap: "6rem" }}>
          <div>
            <Card
              raised
              sx={{
                maxWidth: 500,
                padding: "0.1em",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <img
                height='600'
                // image={`${host}/view/s_${productData.uploadFileNames[0]}`}
                // src={`${host}/view/${selectImg}`}
                src={`${host}/view/${selectImg}`}
                alt={productData.name}
                title={productData.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
            <Swiper
              // install Swiper modules
              style={{ maxWidth: "500px", marginTop: "2rem", marginBottom: "2rem" }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation={true} // arrow 버튼 사용 유무
              pagination={{ clickable: true }} //페이지 버튼 보이게 할지
              breakpoints={{
                // 화면 크기에 따라서 슬라이드 표시
                1378: {
                  slidesPerView: 6, //한번에 보이는 슬라이드 개수
                  slidesPerGroup: 6,
                },
                998: {
                  slidesPerView: 5, //한번에 보이는 슬라이드 개수
                  slidesPerGroup: 5,
                },
                625: {
                  slidesPerView: 4, //한번에 보이는 슬라이드 개수
                  slidesPerGroup: 4,
                },
                0: {
                  slidesPerView: 3, //한번에 보이는 슬라이드 개수
                  slidesPerGroup: 3,
                },
              }}
            >
              {productData.uploadFileNames.map((product, index) => (
                <SwiperSlide key={index}>
                  {
                    <img
                      key={index}
                      src={`${host}/view/s_${productData.uploadFileNames[index]}`}
                      alt={productData.pname}
                      style={{
                        height: "10rem",
                        borderRadius: "15px",
                        boxShadow:
                          "rgb(0 0 0/69%) 0px 26px 30px -10px, rgb(0 0 0/73%) 0px 16px 10px -10px",
                        cursor: "pointer",
                        transition:
                          "all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s",
                        border: "3px solid rgba(249, 249, 249, 0.1)",
                      }}
                      onClick={() => {
                        setSelectImg(product);
                      }}
                    />
                  }
                </SwiperSlide>
              ))}
            </Swiper>
            <CustomButton
              color='secondary'
              variant='outlined'
              sx={{ width: "100%", ":hover": "" }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  position: "relative",
                }}
                onClick={() => {
                  navigate(`/user/details/${productData.seller}`);
                }}
              >
                {productData.seller ? productData.seller : "판매자"}의 채널 바로가기
              </Typography>
            </CustomButton>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
              minWidth: "300px",
            }}
          >
            <div
              style={{
                textAlign: "left",
                position: "relative",
                letterSpacing: "5px",
                fontSize: "32px",
                color: "grey",
                fontWeight: "bold",
              }}
            >
              {productData.categoryNum === 1 && "인테리어"}
              {productData.categoryNum === 2 && "전자기기"}
              {productData.categoryNum === 3 && "공구"}
            </div>
            {/* <ProductDetailsTypo>이름</ProductDetailsTypo> */}
            <h1 style={{ textAlign: "left", fontSize: "48px" }}>
              {productData.pname}
            </h1>
            <div style={{ fontFamily: "Lexend" }}>description</div>
            <Typography sx={{ textAlign: "left" }}>{productData.pdesc}</Typography>
            {/* <ProductDetailsTypo>가격</ProductDetailsTypo> */}
            <Typography sx={{ textAlign: "left", marginTop: "3rem" }}>
              ￦ {productData.price}
            </Typography>

            <ButtonGroup
              sx={{
                alignSelf: "center",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Button
                aria-label='reduce'
                onClick={() => {
                  handleButtonClick("decrease");
                  setCount(Math.max(count - 1, 0));
                }}
                color='secondary'
              >
                <RemoveIcon fontSize='small' />
              </Button>

              <Input
                value={inputValue}
                sx={{
                  maxWidth: "50px",
                  textAlign: "center",
                }}
                onChange={handleInputChange}
                variant='outlined'
                color='secondary'
              />

              <Button
                aria-label='increase'
                onClick={() => {
                  handleButtonClick("increase");
                  setCount(count + 1);
                }}
                color='secondary'
              >
                <AddIcon fontSize='small' />
              </Button>
            </ButtonGroup>

            <Typography
              sx={{
                textAlign: "center",
                color: "#1565c0",
                marginTop: "-1rem",
                marginBottom: "1rem",
              }}
            >
              {count * productData.price}원
            </Typography>

            <CustomButton
              variant='outlined'
              color='secondary'
              onClick={() => handleAddtoCart()}
              sx={{ width: "100%" }}
            >
              장바구니 담기
            </CustomButton>

            <CustomButton
              variant='outlined'
              color='secondary'
              sx={{ width: "100%", marginTop: "3.5em" }}
            >
              <ReviewIcon width='2rem' height='2rem'></ReviewIcon>
              {productData.pname}의 리뷰 보러 가기
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

const CustomButton = styled(Button)(({ theme }) => ({
  alignSelf: "center",
  border: "1px solid",
  borderColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));
