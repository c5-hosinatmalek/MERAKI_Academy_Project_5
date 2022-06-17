import { createSlice } from "@reduxjs/toolkit";

export const catorgeSlice = createSlice({
  name: "catogre",
  initialState: {
    catorge: [],
  },
  reducers: {
    getcatogre: (state, action) => {
      state.catorge = action.payload;
    },
  },
});

export const { getcatogre } = catorgeSlice.actions;

export default catorgeSlice.reducer;
