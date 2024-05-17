import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import image from "../../resources/img/1.jpg";
import { LockOutlined } from "@mui/icons-material";

import Paper from "@mui/material/Paper";
import { theme } from "./../../styles/theme/Theme";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rememberMe } from "../../slices/loginSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const { doLogin, isLogin } = useCustomLogin();
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 요청 후 로그인 성공 시 페이지 이동
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]); // 페이지가 처음 렌더링될 때 한 번만 실행

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const shakeAnimation = {
    x: isLoginFailed ? [-10, 10, -10, 10, 0] : 0,
    transition: { duration: 0.5 },
  };

  const handleAccount = (property, event) => {
    setIsLoginFailed(false);
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);
  };

  const handleCheckboxChange = (e) => {
    dispatch(rememberMe(e.target.checked));
    setAccount((prevState) => ({
      ...prevState,
      remember: !prevState.remember, // 현재 상태의 remember 값을 반전시킴
    }));
  };
  const handleLogin = () => {
    doLogin(account);
  };

  return (
    <Grid
      container
      component='main'
      sx={{
        height: "100vh",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
      }}
    >
      <CssBaseline />
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div
          style={{
            margin: theme.spacing(2, 6),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              margin: theme.spacing(0),
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <div
            noValidate
            style={{
              width: "100%", // Fix IE 11 issue.
              marginTop: theme.spacing(1),
            }}
          >
            <motion.div animate={shakeAnimation}>
              <TextField
                onChange={(event) => handleAccount("username", event)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoFocus
                sx={{
                  "& fieldset": {
                    borderColor: isLoginFailed ? "#ff80ab" : "#82b1ff",
                  },
                  "& label": {
                    color: isLoginFailed ? "#ff80ab" : "#82b1ff",
                  },
                }}
              />
            </motion.div>
            <motion.div animate={shakeAnimation}>
              <TextField
                onChange={(event) => handleAccount("password", event)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                sx={{
                  "& fieldset": {
                    borderColor: isLoginFailed ? "#ff80ab" : "#82b1ff",
                  },
                  "& label": {
                    color: isLoginFailed ? "#ff80ab" : "#82b1ff",
                  },
                }}
              />
            </motion.div>
            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='secondary'
                  onChange={handleCheckboxChange}
                />
              }
              label='Rememberme'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              onClick={() => handleLogin()}
              sx={{
                margin: theme.spacing(3, 0, 2),
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/user/register"} variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
