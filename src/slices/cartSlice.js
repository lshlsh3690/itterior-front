import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCartItems, postChangeCart } from "../api/CartApi";

const initialCartState = [{}];
export const getCartItemAsync = createAsyncThunk("getCartItemAsync", (param) => {
  return getCartItems(param);
});

export const postChangeCartAsync = createAsyncThunk(
  "postCartItemsAsync",
  (cartItem) => {
    return postChangeCart(cartItem);
  }
);

export const addCartItemAsync = createAsyncThunk("addCartItemAsync", (cartItem) => {
  return addCartItem(cartItem);
});

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getCartItemAsync.rejected, (state, action) => {
        console.log(action.payload);
        return action.payload;
      })
      .addCase(postChangeCartAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        console.log("장바구니 추가 성공");
      });
  },
});

export default cartSlice.reducer;
