import { API_SERVER_HOST } from "../resources/BasicResources";
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/products`;

export const getList = async (pageParam) => {
  const { page, pageSize, category, sortBy, dateSortOrder, priceSortOrder } =
    pageParam;

  let order = "";
  if (sortBy === "date") {
    order = dateSortOrder;
  } else if (sortBy === "price") {
    order = priceSortOrder;
  }
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: pageSize, category: category, sortBy, order },
  });

  return res.data;
};

export const getListWithUsername = async (pageParam) => {
  const { page, size, username } = pageParam;

  //   const res = await jwtAxios.get(`${host}/list`, {
  //     params: { page: page, size: size },
  //   });

  const res = await axios.get(`${host}/list/:username`, {
    params: { page: page, size: size, username: username },
  });

  return res.data;
};

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/register`, product, header);

  return res.data;
};

export const get10PopularProducts = async () => {
  const res = await axios.get(`${host}/popular`);

  return res.data;
};

export const searchProducts = async (searchQuery) => {
  try {
    const response = await axios.get(`${host}/search?query=${searchQuery}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
