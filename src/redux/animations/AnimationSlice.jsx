import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnimations = createAsyncThunk("get/animations", async () => {
  try {
    const response = await axios.get(`http://localhost:3005/animations`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const postAnimation = createAsyncThunk(
  "post/animation",
  async (lottieCredentials) => {
    try {
      const response = await axios.post(
        `http://localhost:3005/animations/uploadlottie`,
        lottieCredentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const animationSlice = createSlice({
  name: "animations",
  initialState: {
    animations: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimations.fulfilled, (state, action) => {
        state.animations = action.payload;
      })
      .addCase(postAnimation.fulfilled, (state, action) => {
        state.animations = action.payload;
      })
      .addCase(getAnimations.rejected, (state) => {
        state.animations = null;
      })
      .addCase(postAnimation.rejected, (state) => {
        state.animations = null;
      })
      .addCase(getAnimations.pending, (state) => {
        state.animations = null;
      })
      .addCase(postAnimation.pending, (state) => {
        state.animations = null;
      });
  },
});

export default animationSlice.reducer;
