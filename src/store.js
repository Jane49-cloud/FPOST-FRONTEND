import { configureStore } from "@reduxjs/toolkit";
import SiteReducer from "./siteslise";

export const store = configureStore({
  reducer: {
    site: SiteReducer,
  },
});
