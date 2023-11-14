import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/UserSlice";
import animationsReducer from "./animations/AnimationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    animations: animationsReducer,
  },
});

export default store;
