import axios from "axios";

import { API_SERVER_HOST } from "../resources/BasicResources";

const host = `${API_SERVER_HOST}/api/user`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.username);
  form.append("password", loginParam.password);

  try {
    const res = await axios.post(`${host}/login`, form, header);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
};

export const registerUserData = async (userData) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${host}/register`, userData, header);

  return res.data;
};

export const sendUsernameCheckRequest = async (newUsername) => {
  try {
    const response = await axios.post(`${host}/checkUsername`, {
      username: newUsername,
    });
    return response.data.isValid;
  } catch (error) {
    console.error("Error checking username validity", error);
    return false; // 에러 발생 시 기본적으로 유효하지 않은 것으로 처리
  }
};
