import { createSlice } from "@reduxjs/toolkit";
export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    subCatgoryPagination: [],
    pagination: [],
  },
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    subCatgorypagination: (state, action) => {
      state.subCatgoryPagination = action.payload;
    },
  },
});

export const { setPagination, subCatgorypagination} =
paginationSlice.actions;

export default paginationSlice.reducer;
