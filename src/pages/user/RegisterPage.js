import { Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { registerUserData, sendUsernameCheckRequest } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";

const initState = {
  username: "",
  password: "",
  nickname: "",
  email: "",
  file: {},
};

const RegisterPage = () => {
  const [userData, setUserData] = useState({ ...initState });
  const uploadRef = useRef();
  const navigate = useNavigate();
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isUsernameResponseTrue, setIsUsernameResponseTrue] = useState(false);
  const debounceTimeout = useRef(null);

  const userNameRef = useRef();
  const pwRef = useRef();
  const nickNameRef = useRef();
  const emailRef = useRef();

  const handleChangeuserData = (e) => {
    userData[e.target.name] = e.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const allRefClear = () => {
    userNameRef.current.value = "";
    pwRef.current.value = "";
    nickNameRef.current.value = "";
    emailRef.current.value = "";
    uploadRef.current.value = "";
  };

  const addMutation = useMutation({
    mutationFn: (userData) => registerUserData(userData),
    onSuccess: () => {
      alert("회원가입 성공");
      navigate("/"); // 성공 시 "/success" 페이지로 리다이렉트
    },
    onError: (err) => {
      console.log(err);
      alert(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.username ||
      !userData.password ||
      !userData.nickname ||
      !userData.email
    ) {
      alert("사용자 정보를 입력해주세요");
      return;
    }
    const file = userData.file;

    const formData = new FormData();

    formData.append("file", file);

    //other data
    formData.append("username", userData.username);
    formData.append("pw", userData.password);
    formData.append("nickname", userData.nickname);
    formData.append("roleNames", "User");
    formData.append("social", false);
    formData.append("email", userData.email);

    // POST 요청 보내기

    setUserData(initState);
    allRefClear();
    addMutation.mutate(formData);
  };

  const handleImageRefChange = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      file: uploadRef.current.files[0], // 선택된 파일을 files 배열에 추가
    }));
  };

  const handleChangeUsername = (e) => {
    handleChangeuserData(e);

    // 1초 이후에 검사
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      const newUsername = userData.username; // 사용자가 입력한 ID
      checkUsernameValidity(newUsername);
    }, 700); //0.7초 뒤에 검사
    setIsUsernameTouched(true);
  };

  const checkUsernameValidity = async (newUsername) => {
    try {
      const response = await sendUsernameCheckRequest(newUsername);
      setIsUsernameResponseTrue(response);
    } catch (error) {
      console.error("Error checking username validity", error);
    }
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

  const isErrorUsername = !isUsernameResponseTrue && isUsernameTouched;

  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography
        color='secondary'
        sx={{ fontSize: "3rem", borderBottom: "10px solid", bottom: "-20px" }}
      >
        회원가입
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/*username */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <TextField
              ref={userNameRef}
              value={userData.username}
              required
              id='username'
              name='username'
              label='id'
              onChange={handleChangeUsername}
              sx={{
                width: "10vw",
                marginTop: "2rem",
                marginBottom: "2rem",
                "& fieldset": {
                  borderColor: isErrorUsername ? "#ff80ab" : "#82b1ff",
                },
                "& label": {
                  color: isErrorUsername ? "#ff80ab" : "#82b1ff",
                },
              }}
            />
            {isErrorUsername && (
              <Typography
                sx={{ marginTop: "-1rem", marginBottom: "-1rem" }}
                color='error'
              >
                유효한 id가 아닙니다
              </Typography>
            )}
          </div>
        </div>

        <TextField
          ref={pwRef}
          value={userData.password}
          color='secondary'
          onChange={handleChangeuserData}
          required
          id='password'
          name='password'
          label='password'
          type='password'
          sx={{
            width: "10vw",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        />

        <TextField
          ref={nickNameRef}
          value={userData.nickname}
          color='secondary'
          onChange={handleChangeuserData}
          required
          id='nickname'
          name='nickname'
          label='nickname'
          multiline
          sx={{
            width: "55vw",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        />

        <TextField
          ref={emailRef}
          color='secondary'
          value={userData.email}
          onChange={handleChangeuserData}
          name='email'
          required
          label='email'
          type='email'
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
              multiple={false}
              onChange={handleImageRefChange}
            />
            <Typography sx={{ fontSize: "2rem" }}>사진 업로드</Typography>
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
          {userData.files && <div>{userData.files.name}</div>}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
