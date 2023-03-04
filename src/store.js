import { configureStore } from "@reduxjs/toolkit";
import SiteReducer from "./siteslise";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];

export const store = configureStore({
  reducer: {
    site: SiteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});
