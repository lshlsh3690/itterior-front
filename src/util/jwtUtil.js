import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "./../resources/BasicResources";
import { getSessionItem, setSessionItem } from "./SessionUtil";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;

  const header = { headers: { Authorization: `Bearer ${accessToken}` } };

  const res = await axios.get(
    `${host}/api/user/refresh?refreshToken=${refreshToken}`,
    header
  );
  return res.data;
};

//before request
const beforeReq = (config) => {
  console.log("before request............");
  const userInfo =
    getCookie("user") ||
    JSON.parse(JSON.parse(getSessionItem("persist:root")).login);

  if (!userInfo) {
    console.log("User NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }

  const accessToken = userInfo.accessToken;

  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

//fail request
const requestFail = (err) => {
  console.log("request error............");

  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log("before return response...........");

  //'ERROR_ACCESS_TOKEN'
  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    let isCookie = undefined;

    let userCookieValue = getCookie("user");
    if (!userCookieValue || userCookieValue === undefined) {
      userCookieValue = JSON.parse(getSessionItem("persist:root")).login;
      if (!userCookieValue || userCookieValue === undefined) {
      } else {
        isCookie = false;
      }
    } else {
      isCookie = true;
    }

    const accessToken =
      userCookieValue.accessToken || JSON.parse(userCookieValue).accessToken;
    const refreshToken =
      userCookieValue.refreshToken || JSON.parse(userCookieValue).refreshToken;
    const result = await refreshJWT(accessToken, refreshToken);

    userCookieValue.accessToken = result.accessToken;
    userCookieValue.refreshToken = result.refreshToken;

    if (isCookie) {
      setCookie("user", JSON.stringify(userCookieValue), 1);
    } else {
      setSessionItem("persist:root", JSON.stringify({ login: userCookieValue }));
    }

    //원래의 호출
    const originalRequest = res.config;

    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    return await axios(originalRequest);
  }

  return res;
};

//fail response
const responseFail = (err) => {
  console.log("response fail error.............");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
