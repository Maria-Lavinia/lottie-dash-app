import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials) => {
    try {
      const response = await axios.post(
        `http://localhost:3005/auth/login`,
        userCredentials
      );
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Invalid username or password";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
