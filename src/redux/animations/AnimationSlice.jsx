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

const animationSlice = createSlice({
  name: "animations",
  initialState: {
    animations: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimations.fulfilled, (state, action) => {
        state.animations = action.payload;
      })
      .addCase(getAnimations.rejected, (state, action) => {
        state.animations = null;
      })
      .addCase(getAnimations.pending, (state) => {
        state.animations = null;
      });
  },
});

export default animationSlice.reducer;
