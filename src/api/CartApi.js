import { API_SERVER_HOST } from "../resources/BasicResources";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async (param) => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

export const postChangeCart = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/change`, cartItem);

  return res.data;
};

export const addCartItem = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/add`, cartItem);

  return res.data;
};
