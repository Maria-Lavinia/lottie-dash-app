import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnimations = createAsyncThunk("get/animations", async () => {
  try {
    const response = await axios.get(
      `https://lottie-dash-server.azurewebsites.net/animations`
    );
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
        `https://lottie-dash-server.azurewebsites.net/animations/uploadlottie`,
        lottieCredentials
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getUserAnimations = createAsyncThunk(
  "get/userAnimations",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://lottie-dash-server.azurewebsites.net/animations/userAnimations/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteAnimation = createAsyncThunk(
  "del/Animation",
  async (animationId) => {
    try {
      const response = await axios.delete(
        `https://lottie-dash-server.azurewebsites.net/${animationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchAnimations = createAsyncThunk(
  "search/animations",
  async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://lottie-dash-server.azurewebsites.net/animations/search/fileName?fileName=${searchQuery}`
      );
      if (response.data.length === 0) {
        alert("No results found");
      }
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
      .addCase(getUserAnimations.fulfilled, (state, action) => {
        state.animations = action.payload;
      })
      .addCase(deleteAnimation.fulfilled, (state, action) => {
        state.animations = action.payload;
      })
      .addCase(searchAnimations.fulfilled, (state, action) => {
        state.animations = action.payload;
      })
      .addCase(getAnimations.rejected, (state) => {
        state.animations = null;
      })
      .addCase(postAnimation.rejected, (state) => {
        state.animations = null;
      })
      .addCase(getUserAnimations.rejected, (state) => {
        state.animations = null;
      })
      .addCase(deleteAnimation.rejected, (state) => {
        state.animations = null;
      })
      .addCase(searchAnimations.rejected, (state) => {
        state.animations = null;
      })
      .addCase(getAnimations.pending, (state) => {
        state.animations = null;
      })
      .addCase(postAnimation.pending, (state) => {
        state.animations = null;
      })
      .addCase(getUserAnimations.pending, (state) => {
        state.animations = null;
      })
      .addCase(deleteAnimation.pending, (state) => {
        state.animations = null;
      })
      .addCase(searchAnimations.pending, (state) => {
        state.animations = null;
      });
  },
});

export default animationSlice.reducer;
