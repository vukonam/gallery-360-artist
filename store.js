// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import loginDetailsReducer from "./features/loginDetails";
const store = configureStore({
  reducer: {
    user: userReducer,
    loginDetails: loginDetailsReducer,
  },
});

export default store;
