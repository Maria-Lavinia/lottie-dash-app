import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const userId = localStorage.getItem("userId");

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials) => {
    try {
      const response = await axios.post(
        `http://localhost:3005/auth/login/`,
        userCredentials
      );
      const { access_token, id, role } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", id);
      localStorage.setItem("role", role);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getOneUser = createAsyncThunk("user/id", async () => {
  const token = localStorage.getItem("token");
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`http://localhost:3005/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "update/user",
  async (userUpdates) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `http://localhost:3005/users/${userId}/`,
        userUpdates
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.id;
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
      .addCase(getOneUser.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(getOneUser.pending, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.user = null;
      });
  },
});

export default userSlice.reducer;
