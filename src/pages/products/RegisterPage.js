import React, { useRef, useState } from "react";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { postAdd } from "../../api/ProductApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";

const initState = {
  pname: "",
  pdesc: "",
  price: "",
  categoryNum: "",
  files: [],
};

const RegisterPage = () => {
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef();
  const { loginState } = useCustomLogin();
  const navigate = useNavigate();

  const productNameRef = useRef();
  const productDescRef = useRef();
  const productPriceRef = useRef();
  const productCategoryRef = useRef();

  const handleChangeProduct = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

  const addMutation = useMutation({
    mutationFn: (product) => postAdd(product),
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("상품 등록 실패");
    },
  });

  const allRefClear = () => {
    productNameRef.current.value = "";
    productDescRef.current.value = "";
    productPriceRef.current.value = "";
    productCategoryRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const files = product.files;

    const formData = new FormData();

    if (files.length === 0) {
      alert("파일을 업로드해주세요.");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //other data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("categoryNum", product.categoryNum);

    // POST 요청 보내기

    formData.append("seller", loginState.username);
    setProduct(initState);
    allRefClear();

    addMutation.mutate(formData);
  };

  const handleFileUpload = () => {
    const files = uploadRef.current.files;

    // 여기서 파일을 업로드하는 추가적인 로직을 수행할 수 있습니다.
    setProduct((prevProduct) => ({
      ...prevProduct,
      files: files,
    }));
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography
        color='secondary'
        sx={{ fontSize: "3rem", borderBottom: "10px solid", bottom: "-20px" }}
      >
        상품등록
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* <!-- 상품명 입력 --> */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <TextField
              ref={productNameRef}
              value={product.pname}
              color='secondary'
              required
              id='pname'
              name='pname'
              label='상품명'
              onChange={handleChangeProduct}
              sx={{
                width: "10vw",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            />
          </div>
          <Select
            ref={productCategoryRef}
            value={product.categoryNum}
            onChange={handleChangeProduct}
            name='categoryNum'
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              marginTop: "2rem",
              marginBottom: "2rem",
              minWidth: "10vw",
            }}
            color='secondary'
          >
            <MenuItem value=''>
              <Typography color='#5393ff'>카테고리 선택</Typography>
            </MenuItem>
            <MenuItem value='1'>
              <Typography color='secondary'>인테리어</Typography>
            </MenuItem>
            <MenuItem value='2'>
              <Typography color='secondary'>전자기기</Typography>
            </MenuItem>
            <MenuItem value='3'>
              <Typography color='secondary'>공구</Typography>
            </MenuItem>
          </Select>
        </div>

        <TextField
          ref={productPriceRef}
          value={product.price}
          color='secondary'
          onChange={handleChangeProduct}
          required
          id='price'
          name='price'
          label='가격'
          type='number'
          sx={{
            width: "10vw",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          inputProps={{
            min: 0, // 음수 방지
          }}
        />

        <TextField
          ref={productDescRef}
          value={product.pdesc}
          color='secondary'
          onChange={handleChangeProduct}
          required
          id='pdesc'
          name='pdesc'
          label='상품 설명'
          multiline
          sx={{
            width: "55vw",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        />

        <div style={{ display: "flex" }}>
          <Button
            component='label'
            color='secondary'
            variant='outlined'
            startIcon={<FileUploadIcon style={{ fontSize: "3rem" }} />}
            sx={{
              width: "20%",
              margin: "auto",
              marginBottom: "1rem",
              marginTop: "2rem",
              "&:hover": {
                backgroundColor: "#5393ff", // 호버 시 배경색 변경
                color: "white", // 호버 시 텍스트 색상 변경
              },
            }}
          >
            <VisuallyHiddenInput
              type='file'
              ref={uploadRef}
              multiple={true}
              onChange={handleFileUpload}
            />
            <Typography sx={{ fontSize: "2rem" }}>파일 업로드</Typography>
          </Button>
          {/* <!-- 등록 버튼 --> */}
          <Button
            color='secondary'
            type='submit'
            variant='outlined'
            sx={{
              width: "20%",
              margin: "auto",
              marginBottom: "1rem",
              marginTop: "2rem",
              "&:hover": {
                backgroundColor: "#5393ff", // 호버 시 배경색 변경
                color: "white", // 호버 시 텍스트 색상 변경
              },
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>등록</Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
