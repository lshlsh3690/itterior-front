import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../util/cookieUtil";
import { loginPost } from "../api/UserApi";

const initState = {
  username: "",
  email: "",
  nickname: "",
  pw: "",
  roleNames: [],
  profileImage: "",
  enable: false,
  accessToken: "",
  refreshToken: "",
  isRememberMe: false,
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loadUserCookie = () => {
  //쿠키에서 로그인 정보 로딩
  const userInfo = getCookie("user");

  //닉네임 처리
  if (userInfo) {
    return userInfo;
  }
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadUserCookie() || initState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;

      return data;
    },
    logout: (state, action) => {
      alert("로그아웃 되었습니다.");
      return initState;
    },
    rememberMe: (state, action) => {
      return {
        ...state,
        isRememberMe: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");

        const payload = action.payload;
        state = { ...state, ...payload };
        return state;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");

        alert(action.error.message);
      });
  },
});

export const { login, logout, rememberMe } = loginSlice.actions;

export default loginSlice.reducer;
