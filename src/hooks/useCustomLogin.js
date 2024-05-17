import { createSearchParams, useNavigate } from "react-router-dom";
// import { useRecoilState, useResetRecoilState } from "recoil";
// import signinState from "../atoms/signinState";
// import { removeCookie, setCookie } from "../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";
import { loginPostAsync, logout, rememberMe } from "../slices/loginSlice";
import { removeCookie, setCookie } from "../util/cookieUtil";
import { getCartItemAsync } from "../slices/cartSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);

  const isLogin = loginState.username ? true : false; //----------로그인 여부
  const isRememberMe = loginState.isRememberMe;

  const doLogin = async (loginParam) => {
    console.log(loginParam);
    if (loginParam.rememberMe) {
      dispatch(rememberMe(true));
    }
    dispatch(loginPostAsync(loginParam))
      .unwrap() //createasyncThunk에서 반환한 promise의 결과를 반환
      .then((data) => {
        if (loginState.isRememberMe) {
          saveAsCookie(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(getCartItemAsync());
  };

  const saveAsCookie = (data) => {
    console.log("before saveAsCookie");
    const saveCookieData = {
      username: data.username,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    setCookie("user", JSON.stringify(saveCookieData), 1); //1일
  };

  const doLogout = () => {
    removeCookie("user");
    dispatch(logout());
  };

  const exceptionHandle = (ex) => {
    console.log("Exception------------------------");

    console.log(ex);

    const errorMsg = ex.response.data.error;

    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.");
      navigate({ pathname: "/user/login", search: errorStr });

      return;
    }

    if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: "/user/login", search: errorStr });
      return;
    }
  };
  return {
    loginState,
    isLogin,
    isRememberMe,
    doLogin,
    doLogout,
    exceptionHandle,
    saveAsCookie,
  };
};

export default useCustomLogin;
