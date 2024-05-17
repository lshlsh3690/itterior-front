import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slices/loginSlice";
import cartSlice from "../slices/cartSlice";
import storage from "redux-persist/lib/storage/session";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root", //어떤 리듀서부터 저장할지
  storage,
  whiteList: ["login"], //저장할 리듀서
  blackList: ["cart"], //저장하지 않을 리듀서
};

const rootReducer = combineReducers({
  cart: cartSlice, //cartSlice
  login: loginSlice, //loginSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistStor = persistStore(store);

export default store;
